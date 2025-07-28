import React, { useState, useRef } from 'react';

const VideoUpload = ({ onVideoSelect, error, disabled = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const MAX_SIZE = 25 * 1024 * 1024; // 25MB
  const MAX_DURATION = 15; // 15 seconds
  const SUPPORTED_FORMATS = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];

  const validateVideo = (file) => {
    // Check file size
    if (file.size > MAX_SIZE) {
      return `Fichier trop volumineux. Maximum : 25MB (actuel: ${(file.size / (1024 * 1024)).toFixed(1)}MB)`;
    }

    // Check file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return `Format non supporté. Formats acceptés : MP4, MOV, AVI`;
    }

    return null;
  };

  const validateVideoDuration = (video) => {
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        if (video.duration > MAX_DURATION) {
          resolve(`Vidéo trop longue. Maximum : ${MAX_DURATION}s (actuel: ${video.duration.toFixed(1)}s)`);
        } else {
          resolve(null);
        }
      };
    });
  };

  const handleFile = async (file) => {
    if (!file) return;

    setValidationError(null);
    
    // Basic validation
    const basicError = validateVideo(file);
    if (basicError) {
      setValidationError(basicError);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);

    // Create video element for duration validation
    const video = document.createElement('video');
    video.src = previewUrl;

    // Validate duration
    const durationError = await validateVideoDuration(video);
    if (durationError) {
      setValidationError(durationError);
      URL.revokeObjectURL(previewUrl);
      setVideoPreview(null);
      return;
    }

    // Set metadata
    const metadata = {
      name: file.name,
      size: file.size,
      duration: video.duration,
      type: file.type
    };

    setSelectedVideo(file);
    setVideoMetadata(metadata);
    onVideoSelect(file, metadata);
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

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    setVideoMetadata(null);
    setValidationError(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    onVideoSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds) => {
    return seconds.toFixed(1) + 's';
  };

  const displayError = validationError || error;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        📹 Vidéo du joueur en action
      </label>
      
      {!selectedVideo ? (
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
            accept="video/mp4,video/mov,video/avi,video/quicktime"
            onChange={handleChange}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">📤</span>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-200 mb-2">
                Glissez votre vidéo ici ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-400">
                Maximum 15 secondes • 25MB max • Formats: MP4, MOV, AVI
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <div className="flex items-start gap-4">
            {/* Video Preview */}
            <div className="relative flex-shrink-0">
              <video
                ref={videoRef}
                src={videoPreview}
                className="w-32 h-24 object-cover rounded-lg bg-gray-900"
                controls
                muted
              />
              <button
                onClick={removeVideo}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={disabled}
              >
                <span className="text-white text-sm">×</span>
              </button>
            </div>
            
            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate">
                {videoMetadata?.name}
              </h4>
              <div className="mt-1 flex items-center gap-4 text-xs text-gray-400">
                <span>📏 {formatFileSize(videoMetadata?.size)}</span>
                <span>⏱️ {formatDuration(videoMetadata?.duration)}</span>
                <span className="flex items-center gap-1">
                  <span>▶️</span>
                  Prêt à analyser
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {displayError && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
          <span className="text-red-400">⚠️</span>
          <span>{displayError}</span>
        </div>
      )}

      {/* Help Text */}
      <p className="mt-2 text-xs text-gray-500">
        💡 Conseil : Filmez le joueur en mouvement avec le ballon pour une meilleure analyse
      </p>
    </div>
  );
};

export default VideoUpload;
