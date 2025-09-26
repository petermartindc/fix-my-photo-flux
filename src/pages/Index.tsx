import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import UploadWidget from "@/components/UploadWidget";
import PhotoFeed from "@/components/PhotoFeed";

interface PhotoResult {
  id: string;
  originalUrl: string;
  fixedUrl: string;
  videoUrl?: string;
  instructions?: string;
  timestamp: string;
  dimensions: string;
  fileSize: string;
  model: string;
}

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoResult | null>(null);
  const [currentView, setCurrentView] = useState<'original' | 'fixed' | 'video'>('fixed');
  const [processingPhoto, setProcessingPhoto] = useState<PhotoResult | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileSelect = (file: File, instructions?: string) => {
    // Create a processing photo object
    const newPhoto: PhotoResult = {
      id: Date.now().toString(),
      originalUrl: URL.createObjectURL(file),
      fixedUrl: URL.createObjectURL(file), // Placeholder
      instructions,
      timestamp: "Processing...",
      dimensions: "Processing...",
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      model: "Kontext Pro"
    };

    setProcessingPhoto(newPhoto);
    setProcessingProgress(0);

    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Processing complete
          setTimeout(() => {
            const completedPhoto: PhotoResult = {
              ...newPhoto,
              timestamp: "Just now",
              dimensions: "800x600"
            };
            setSelectedPhoto(completedPhoto);
            setProcessingPhoto(null);
            setProcessingProgress(0);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const handlePhotoSelect = (photo: PhotoResult) => {
    setSelectedPhoto(photo);
    setCurrentView('fixed');
  };

  const handleFixAgain = async (photo: PhotoResult) => {
    try {
      // Convert the enhanced image URL to a File object
      const response = await fetch(photo.fixedUrl);
      const blob = await response.blob();
      const file = new File([blob], `enhanced-photo-${photo.id}.jpg`, { type: 'image/jpeg' });
      
      // Trigger the file selection with the enhanced image
      handleFileSelect(file, photo.instructions);
    } catch (error) {
      console.error('Failed to load enhanced photo for fixing again:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <div className="max-w-[1280px] mx-auto px-6 py-6 relative">
        {/* Left Column - Upload Widget */}
        <div className="hidden sm:block left-column-bg rounded-xl p-6 fixed top-[4.5rem] bottom-6 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] overflow-y-auto z-40" 
             style={{left: 'max(24px, calc(50vw - 640px + 24px))'}}>
          <UploadWidget 
            onFileSelect={handleFileSelect}
            isProcessing={!!processingPhoto}
          />
        </div>

        {/* Main Content */}
        <div className="ml-0 sm:ml-[316px] md:ml-[336px] lg:ml-[356px] xl:ml-[376px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Fixes <span className="text-sm font-normal text-muted-foreground">(183 Total Fixes)</span></h2>
              </div>
            </div>
            
            <div className="text-left">
              <PhotoFeed
                onPhotoSelect={handlePhotoSelect}
                onFixAgain={handleFixAgain}
                processingPhoto={processingPhoto}
                processingProgress={processingProgress}
              />
            </div>
          </div>
        </div>

        {/* Mobile Upload Widget - Show on small screens */}
        <div className="sm:hidden mb-6">
          <div className="left-column-bg rounded-xl p-6">
            <UploadWidget 
              onFileSelect={handleFileSelect}
              isProcessing={!!processingPhoto}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;