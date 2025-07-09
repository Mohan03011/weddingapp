import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import contentService from '../../../utils/contentService';

const FileUpload = ({ onUploadComplete, acceptedTypes = ['image/*', 'video/*'], maxSize = 10 * 1024 * 1024 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files) => {
    if (!files.length) return;

    setUploadError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!acceptedTypes.some(type => file.type.startsWith(type.replace('/*', '')))) {
          throw new Error(`File type ${file.type} not supported`);
        }

        // Validate file size
        if (file.size > maxSize) {
          throw new Error(`File size exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB limit`);
        }

        // Upload file
        const result = await contentService.uploadFile(file, 'content', 'uploads');
        
        if (!result.success) {
          throw new Error(result.error);
        }

        uploadedFiles.push({
          file,
          uploadResult: result.data
        });

        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      // Call completion callback
      if (onUploadComplete) {
        onUploadComplete(uploadedFiles);
      }

    } catch (error) {
      setUploadError(error.message);
      console.log('Upload error:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragging
            ? 'border-primary bg-primary/5' :'border-border-light bg-surface hover:border-border'
        } ${uploading ? 'pointer-events-none' : ''}`}
      >
        {uploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">Uploading...</p>
              <div className="w-full bg-border-light rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary">{Math.round(uploadProgress)}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} className="text-accent" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-text-secondary">
                Supports images and videos up to {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
      </div>

      {/* Browse Button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          iconName="FolderOpen"
          iconPosition="left"
          onClick={() => document.querySelector('input[type="file"]').click()}
          disabled={uploading}
        >
          Browse Files
        </Button>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="mt-4 bg-error/10 border border-error/20 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-error mb-1">Upload Failed</p>
            <p className="text-sm text-error/80">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="mt-4 text-xs text-text-secondary space-y-1">
        <p>• Supported formats: JPEG, PNG, GIF, MP4, MOV, AVI</p>
        <p>• Maximum file size: {formatFileSize(maxSize)}</p>
        <p>• Multiple files can be uploaded at once</p>
        <p>• Files are automatically optimized for web viewing</p>
      </div>
    </div>
  );
};

export default FileUpload;