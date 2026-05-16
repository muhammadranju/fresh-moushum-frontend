"use client";

import React, { useState, useRef } from 'react';
import { uploadImage } from '@/lib/api';
import { FiUploadCloud, FiTrash2, FiLoader, FiCheckCircle } from 'react-icons/fi';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  folder: string;
  currentImage?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, folder, currentImage, label }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    if (currentImage) {
      formData.append('oldUrl', currentImage);
    }

    try {
      const res = await uploadImage(formData);
      const url = res.data.url;
      setPreview(url);
      onUploadSuccess(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      
      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] 
          ${preview ? 'border-transparent' : 'border-gray-300 dark:border-gray-700 hover:border-emerald-500 hover:bg-emerald-50/5 dark:hover:bg-emerald-900/10'}
          ${uploading ? 'pointer-events-none opacity-80' : ''}
        `}
      >
        {preview ? (
          <div className="relative w-full h-full min-h-[160px]">
            <img src={preview} alt="Preview" className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                title="Remove image"
              >
                <FiTrash2 size={20} />
              </button>
              <button 
                type="button"
                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
                title="Change image"
              >
                <FiUploadCloud size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiUploadCloud size={24} />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload image</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP (Max 5MB)</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <FiLoader className="animate-spin text-emerald-500 mb-2" size={32} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Uploading...</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>!</span> {error}</p>}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;
