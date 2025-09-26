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

  const handleViewChange = (view: 'original' | 'fixed' | 'video') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-screen">
          {/* Left Column - Upload Widget */}
          <div className="lg:col-span-3 left-column-bg rounded-xl p-6 fixed top-[4.5rem] bottom-6 left-6 w-[calc(25%-1.5rem)] overflow-y-auto">
            <UploadWidget 
              onFileSelect={handleFileSelect}
              isProcessing={!!processingPhoto}
            />
          </div>

          {/* Center and Right Columns - Tethered Container */}
          <div className="lg:col-span-9 lg:col-start-4 pl-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Recent Fixes <span className="text-sm font-normal text-muted-foreground">(183 Total Fixes)</span></h2>
                </div>
              </div>
              
              <PhotoFeed
                onPhotoSelect={handlePhotoSelect}
                processingPhoto={processingPhoto}
                processingProgress={processingProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;