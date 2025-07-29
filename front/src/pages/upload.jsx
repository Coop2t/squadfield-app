import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { generateCardData, calculateCardValue } from '../utils/generateCard';
import { generateCardImage } from '../lib/generateCardImage';
import CardPreview from '../components/CardPreview';

export default function Upload() {
  const router = useRouter();
  const { currentUser, userProfile, incrementCardsCreated, loading } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Upload, 2: Details, 3: Preview, 4: Complete
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    playerName: '',
    sport: 'football',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const [savedCard, setSavedCard] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ file: 'File size must be less than 5MB' });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors({ file: 'Please select an image file' });
        return;
      }

      setSelectedFile(file);
      setErrors({});
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileSelect(fakeEvent);
    }
  };

  // Proceed to details step
  const proceedToDetails = () => {
    if (!selectedFile) {
      setErrors({ file: 'Please select an image' });
      return;
    }
    setStep(2);
  };

  // Handle card details form
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Generate card preview
  const generatePreview = () => {
    const detailErrors = {};
    
    if (!cardDetails.playerName.trim()) {
      detailErrors.playerName = 'Player name is required';
    }
    
    if (!cardDetails.sport) {
      detailErrors.sport = 'Sport is required';
    }

    if (Object.keys(detailErrors).length > 0) {
      setErrors(detailErrors);
      return;
    }

    // Generate card data
    const generatedCard = generateCardData(
      cardDetails.playerName.trim(),
      cardDetails.sport,
      filePreview
    );

    // Override position if provided
    if (cardDetails.position) {
      generatedCard.position = cardDetails.position;
    }

    setCardData(generatedCard);
    setStep(3);
  };

  // Save card to Firebase
  const saveCard = async () => {
    if (!currentUser || !cardData || !selectedFile) return;

    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `cards/${currentUser.uid}/${Date.now()}_${selectedFile.name}`);
      const uploadResult = await uploadBytes(imageRef, selectedFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      // Generate full card image
      const cardImageDataUrl = await generateCardImage(cardData, imageUrl);
      
      // Convert data URL to blob
      const response = await fetch(cardImageDataUrl);
      const blob = await response.blob();
      
      // Upload card image
      const cardImageRef = ref(storage, `generated-cards/${currentUser.uid}/${cardData.id}.png`);
      const cardUploadResult = await uploadBytes(cardImageRef, blob);
      const cardImageUrl = await getDownloadURL(cardUploadResult.ref);

      // Calculate card value
      const cardValue = calculateCardValue(cardData);

      // Save card data to Firestore
      const cardDoc = {
        ...cardData,
        userId: currentUser.uid,
        userName: userProfile?.displayName || currentUser.email,
        originalImageUrl: imageUrl,
        cardImageUrl: cardImageUrl,
        cardValue: cardValue,
        createdAt: new Date().toISOString(),
        isPublic: true
      };

      const docRef = await addDoc(collection(db, 'cards'), cardDoc);
      
      // Update user stats
      await incrementCardsCreated();

      setSavedCard({ ...cardDoc, id: docRef.id });
      setStep(4);
    } catch (error) {
      console.error('Error saving card:', error);
      setErrors({ save: 'Failed to save card. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  // Reset form
  const startOver = () => {
    setStep(1);
    setSelectedFile(null);
    setFilePreview(null);
    setCardData(null);
    setCardDetails({
      playerName: '',
      sport: 'football',
      position: ''
    });
    setErrors({});
    setSavedCard(null);
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Create Card - SQUADFIELD</title>
        <meta name="description" content="Upload your photo and create amazing sports cards with AI-powered stats." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-heading font-bold text-gradient">
                  SQUADFIELD
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="btn-secondary">
                  Dashboard
                </Link>
                <Link href="/galerie" className="btn-secondary">
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-secondary-200 text-secondary-600'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNum < step ? 'bg-primary-600' : 'bg-secondary-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-center text-sm text-secondary-600 mb-8">
            <div className="grid grid-cols-4 gap-16 text-center">
              <span className={step >= 1 ? 'text-primary-600 font-medium' : ''}>Upload Photo</span>
              <span className={step >= 2 ? 'text-primary-600 font-medium' : ''}>Add Details</span>
              <span className={step >= 3 ? 'text-primary-600 font-medium' : ''}>Preview Card</span>
              <span className={step >= 4 ? 'text-primary-600 font-medium' : ''}>Complete</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Upload Photo */}
            {step === 1 && (
              <div className="card p-8">
                <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4 text-center">
                  Upload Your Photo
                </h2>
                <p className="text-secondary-600 text-center mb-8">
                  Choose a high-quality sports photo to create your amazing trading card.
                </p>

                <div
                  className={`border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer ${
                    errors.file ? 'border-red-400' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {filePreview ? (
                    <div className="space-y-4">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-secondary-600">
                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <svg className="w-12 h-12 text-secondary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div>
                        <p className="text-lg font-medium text-secondary-900">
                          Drag and drop your photo here
                        </p>
                        <p className="text-secondary-600">or click to browse</p>
                      </div>
                      <p className="text-sm text-secondary-500">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {errors.file && (
                  <p className="mt-2 text-sm text-red-600 text-center">{errors.file}</p>
                )}

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={proceedToDetails}
                    disabled={!selectedFile}
                    className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add Details */}
            {step === 2 && (
              <div className="card p-8">
                <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4 text-center">
                  Add Player Details
                </h2>
                <p className="text-secondary-600 text-center mb-8">
                  Provide information about the player to generate accurate stats.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Player Name *
                    </label>
                    <input
                      type="text"
                      name="playerName"
                      value={cardDetails.playerName}
                      onChange={handleDetailsChange}
                      className={`input-field ${errors.playerName ? 'border-red-500' : ''}`}
                      placeholder="Enter player name"
                    />
                    {errors.playerName && (
                      <p className="mt-1 text-sm text-red-600">{errors.playerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Sport *
                    </label>
                    <select
                      name="sport"
                      value={cardDetails.sport}
                      onChange={handleDetailsChange}
                      className="input-field"
                    >
                      <option value="football">Football</option>
                      <option value="basketball">Basketball</option>
                      <option value="soccer">Soccer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Position (Optional)
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={cardDetails.position}
                      onChange={handleDetailsChange}
                      className="input-field"
                      placeholder="e.g., QB, PG, ST (leave empty for auto-generate)"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary px-6 py-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={generatePreview}
                    className="btn-primary px-8 py-3"
                  >
                    Generate Preview
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preview Card */}
            {step === 3 && cardData && (
              <div className="space-y-6">
                <div className="card p-8 text-center">
                  <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">
                    Your Card Preview
                  </h2>
                  <p className="text-secondary-600 mb-8">
                    Here's how your sports card will look. You can regenerate it if needed.
                  </p>

                  <div className="flex justify-center mb-8">
                    <CardPreview
                      cardData={cardData}
                      playerImage={filePreview}
                      showStats={true}
                      showAnalysis={true}
                    />
                  </div>

                  {errors.save && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.save}</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-secondary px-6 py-3"
                      disabled={uploading}
                    >
                      Back
                    </button>
                    <div className="space-x-4">
                      <button
                        onClick={generatePreview}
                        className="btn-secondary px-6 py-3"
                        disabled={uploading}
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={saveCard}
                        disabled={uploading}
                        className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                            Saving...
                          </>
                        ) : (
                          'Save Card'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {step === 4 && savedCard && (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">
                  Card Created Successfully! 🎉
                </h2>
                <p className="text-secondary-600 mb-8">
                  Your amazing sports card has been created and saved to your collection.
                </p>

                <div className="bg-secondary-50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-secondary-700">Card Value:</span>
                      <span className="ml-2 text-secondary-900">{savedCard.cardValue} points</span>
                    </div>
                    <div>
                      <span className="font-medium text-secondary-700">Rarity:</span>
                      <span className="ml-2 text-secondary-900">{savedCard.rarity.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-secondary-700">Overall Rating:</span>
                      <span className="ml-2 text-secondary-900">{savedCard.stats.overall}</span>
                    </div>
                    <div>
                      <span className="font-medium text-secondary-700">Card #:</span>
                      <span className="ml-2 text-secondary-900">{savedCard.cardNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Link href="/dashboard" className="btn-primary px-6 py-3">
                      View Dashboard
                    </Link>
                    <Link href="/galerie" className="btn-secondary px-6 py-3">
                      Browse Gallery
                    </Link>
                  </div>
                  <button
                    onClick={startOver}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Create Another Card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
