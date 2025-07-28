import React, { useState, useRef } from 'react';
import { Upload, Camera, X, AlertCircle, User } from 'lucide-react';

const PhotoUpload = ({ onPhotoSelect, error, disabled = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoMetadata, setPhotoMetadata] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validatePhoto = (file) => {
    // Check file size
    if (file.size > MAX_SIZE) {
      return `Image trop volumineuse. Maximum : 10MB (actuel: ${(file.size / (1024 * 1024)).toFixed(1)}MB)`;
    }

    // Check file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return `Format non supporté. Formats acceptés : JPG, PNG, WEBP`;
    }

    return null;
  };

  const handleFile = async (file) => {
    if (!file) return;

    setValidationError(null);
    
    // Basic validation
    const basicError = validatePhoto(file);
    if (basicError) {
      setValidationError(basicError);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    // Create image element to get dimensions
    const img = new Image();
    img.onload = () => {
      const metadata = {
        name: file.name,
        size: file.size,
        width: img.width,
        height: img.height,
        type: file.type
      };

      setSelectedPhoto(file);
      setPhotoMetadata(metadata);
      onPhotoSelect(file, metadata);
    };
    img.src = previewUrl;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    if (disabled) return;
    
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const openFileSelector = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setSelectedPhoto(null);
    setPhotoPreview(null);
    setPhotoMetadata(null);
    setValidationError(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    onPhotoSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(0) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const displayError = validationError || error;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        📸 Photo portrait du joueur
      </label>
      
      {!selectedPhoto ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${dragActive 
              ? 'border-blue-400 bg-blue-50/10' 
              : 'border-gray-600 hover:border-gray-500'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${displayError ? 'border-red-500' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleChange}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-600 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-200 mb-2">
                Glissez une photo ici ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-400">
                Portrait recommandé • 10MB max • Formats: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <div className="flex items-start gap-4">
            {/* Photo Preview with Circular Crop */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-900 border-2 border-gray-600">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Photo Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate">
                {photoMetadata?.name}
              </h4>
              <div className="mt-1 flex items-center gap-4 text-xs text-gray-400">
                <span>📏 {formatFileSize(photoMetadata?.size)}</span>
                <span>📐 {photoMetadata?.width}×{photoMetadata?.height}px</span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Prêt pour la carte
                </span>
              </div>
              <div className="mt-2 bg-green-500/20 border border-green-500/30 rounded px-2 py-1 text-xs text-green-400">
                ✅ Photo validée - Sera utilisée pour la carte
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {displayError && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Help Text */}
      <p className="mt-2 text-xs text-gray-500">
        💡 Conseil : Utilisez une photo portrait avec le visage bien visible pour un meilleur rendu
      </p>
    </div>
  );
};

export default PhotoUpload;
