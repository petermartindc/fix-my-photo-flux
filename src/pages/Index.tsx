import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import UploadWidget from "@/components/UploadWidget";
import PhotoFeed from "@/components/PhotoFeed";
import DetailPanel from "@/components/DetailPanel";

interface PhotoResult {
  id: string;
  originalUrl: string;
  fixedUrl: string;
  videoUrl?: string;
  instructions?: string;
  timestamp: string;
  dimensions: string;
  fileSize: string;
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
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Upload Widget */}
          <div className="lg:col-span-3 left-column-bg rounded-xl p-6">
            <UploadWidget 
              onFileSelect={handleFileSelect}
              isProcessing={!!processingPhoto}
            />
          </div>

          {/* Center Column - Photo Feed */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Recent Fixes</h2>
                <p className="text-muted-foreground">
                  Browse your photo restoration history
                </p>
              </div>
              
              <PhotoFeed
                onPhotoSelect={handlePhotoSelect}
                processingPhoto={processingPhoto}
                processingProgress={processingProgress}
              />
            </div>
          </div>

          {/* Right Column - Detail Panel */}
          <div className="lg:col-span-3">
            <DetailPanel
              selectedPhoto={selectedPhoto}
              onViewChange={handleViewChange}
              currentView={currentView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;