import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Download, Share } from "lucide-react";

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

interface DetailPanelProps {
  selectedPhoto: PhotoResult | null;
  onViewChange: (view: 'original' | 'fixed' | 'video') => void;
  currentView: 'original' | 'fixed' | 'video';
}

const DetailPanel = ({ selectedPhoto, onViewChange, currentView }: DetailPanelProps) => {
  const [isCreatingVideo, setIsCreatingVideo] = useState(false);

  const handleCreateVideo = () => {
    setIsCreatingVideo(true);
    // Simulate video creation
    setTimeout(() => {
      setIsCreatingVideo(false);
      // In a real app, you'd update the selectedPhoto with a videoUrl
    }, 3000);
  };

  if (!selectedPhoto) {
    return (
      <div className="sticky top-20 bg-card rounded-xl p-6 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-xl mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">F</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Select a photo</h3>
            <p className="text-sm text-muted-foreground">
              Click on any photo in the feed to view details and actions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-20 space-y-4">
      {/* View toggles */}
      <div className="bg-card rounded-xl p-4">
        <h3 className="font-medium mb-4">Views</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Original thumbnail */}
          <button
            onClick={() => onViewChange('original')}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentView === 'original' 
                ? 'border-primary shadow-lg' 
                : 'border-border hover:border-border-hover'
            }`}
          >
            <img
              src={selectedPhoto.originalUrl}
              alt="Original"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <span className="text-white text-[10px] font-medium p-2">Original</span>
            </div>
          </button>

          {/* Fixed thumbnail */}
          <button
            onClick={() => onViewChange('fixed')}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentView === 'fixed' 
                ? 'border-primary shadow-lg' 
                : 'border-border hover:border-border-hover'
            }`}
          >
            <img
              src={selectedPhoto.fixedUrl}
              alt="Fixed"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <span className="text-white text-[10px] font-medium p-2">Fixed</span>
            </div>
          </button>

          {/* Video thumbnail (if exists) */}
          {selectedPhoto.videoUrl && (
            <button
              onClick={() => onViewChange('video')}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentView === 'video' 
                  ? 'border-primary shadow-lg' 
                  : 'border-border hover:border-border-hover'
              }`}
            >
              <img
                src={selectedPhoto.fixedUrl}
                alt="Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <span className="text-white text-[10px] font-medium p-2">Video</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card rounded-xl p-4">
        <h3 className="font-medium mb-4">Actions</h3>
        <div className="space-y-3">
          {!selectedPhoto.videoUrl && (
            <Button
              onClick={handleCreateVideo}
              disabled={isCreatingVideo}
              className="w-full btn-primary"
            >
              {isCreatingVideo ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Creating Video...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Make a Video
                </>
              )}
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="btn-secondary">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="secondary" className="btn-secondary">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Photo details */}
      <div className="bg-card rounded-xl p-4">
        <h3 className="font-medium mb-4">Details</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Processed:</span>
            <p className="font-medium">{selectedPhoto.timestamp}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Dimensions:</span>
            <p className="font-medium">{selectedPhoto.dimensions}</p>
          </div>
          <div>
            <span className="text-muted-foreground">File Size:</span>
            <p className="font-medium">{selectedPhoto.fileSize}</p>
          </div>
          {selectedPhoto.instructions && (
            <div>
              <span className="text-muted-foreground">Instructions:</span>
              <p className="font-medium mt-1">{selectedPhoto.instructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;