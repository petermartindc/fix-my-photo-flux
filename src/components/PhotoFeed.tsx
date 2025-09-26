import React, { useState } from "react";
import { Download, Share2, RotateCcw, Play, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import sample photos
import samplePhoto1 from "@/assets/sample-photo-1.jpg";
import samplePhoto2 from "@/assets/sample-photo-2.jpg";
import samplePhoto3 from "@/assets/sample-photo-3.jpg";
import samplePhoto4 from "@/assets/sample-photo-4.jpg";
import samplePhoto5 from "@/assets/sample-photo-5.jpg";
import samplePhoto6 from "@/assets/sample-photo-6.jpg";
import samplePhoto7 from "@/assets/sample-photo-7.jpg";
import samplePhoto8 from "@/assets/sample-photo-8.jpg";

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

interface PhotoFeedProps {
  onPhotoSelect: (photo: PhotoResult) => void;
  onFixAgain?: (photo: PhotoResult) => void;
  processingPhoto?: PhotoResult | null;
  processingProgress?: number;
  completedPhotos?: PhotoResult[];
}

const samplePhotos: PhotoResult[] = [
  {
    id: "1",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    timestamp: "2 minutes ago",
    dimensions: "800x600",
    fileSize: "2.1 MB",
    model: "Kontext Pro"
  },
  {
    id: "2",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    videoUrl: samplePhoto2,
    timestamp: "15 minutes ago",
    dimensions: "600x900",
    fileSize: "1.8 MB",
    model: "Kontext Pro"
  },
  {
    id: "3",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    timestamp: "1 hour ago",
    dimensions: "800x600",
    fileSize: "2.3 MB",
    model: "Kontext Pro"
  },
  {
    id: "4",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    timestamp: "2 hours ago",
    dimensions: "700x1000",
    fileSize: "1.9 MB",
    model: "Kontext Pro"
  },
  {
    id: "5",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    videoUrl: samplePhoto5,
    timestamp: "3 hours ago",
    dimensions: "800x600",
    fileSize: "2.0 MB",
    model: "Kontext Pro"
  },
  {
    id: "6",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    timestamp: "1 day ago",
    dimensions: "600x850",
    fileSize: "1.7 MB",
    model: "Kontext Pro"
  },
  {
    id: "7",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    timestamp: "2 days ago",
    dimensions: "800x600",
    fileSize: "2.4 MB",
    model: "Kontext Pro"
  },
  {
    id: "8",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    videoUrl: samplePhoto8,
    timestamp: "3 days ago",
    dimensions: "750x1100",
    fileSize: "2.2 MB",
    model: "Kontext Pro"
  },
  {
    id: "9",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    videoUrl: samplePhoto1,
    timestamp: "4 days ago",
    dimensions: "900x650",
    fileSize: "2.8 MB",
    model: "Kontext Pro"
  },
  {
    id: "10",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    timestamp: "5 days ago",
    dimensions: "650x950",
    fileSize: "1.5 MB",
    model: "Kontext Pro"
  },
  {
    id: "11",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    timestamp: "1 week ago",
    dimensions: "800x600",
    fileSize: "2.6 MB",
    model: "Kontext Pro"
  },
  {
    id: "12",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    videoUrl: samplePhoto4,
    timestamp: "1 week ago",
    dimensions: "720x980",
    fileSize: "2.1 MB",
    model: "Kontext Pro"
  },
  {
    id: "13",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    timestamp: "1 week ago",
    dimensions: "800x600",
    fileSize: "1.9 MB",
    model: "Kontext Pro"
  },
  {
    id: "14",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    timestamp: "2 weeks ago",
    dimensions: "580x820",
    fileSize: "1.6 MB",
    model: "Kontext Pro"
  },
  {
    id: "15",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    videoUrl: samplePhoto7,
    timestamp: "2 weeks ago",
    dimensions: "800x600",
    fileSize: "2.3 MB",
    model: "Kontext Pro"
  },
  {
    id: "16",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    timestamp: "3 weeks ago",
    dimensions: "740x1050",
    fileSize: "2.7 MB",
    model: "Kontext Pro"
  },
  {
    id: "17",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    timestamp: "3 weeks ago",
    dimensions: "800x600",
    fileSize: "2.0 MB",
    model: "Kontext Pro"
  },
  {
    id: "18",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    videoUrl: samplePhoto2,
    timestamp: "1 month ago",
    dimensions: "620x880",
    fileSize: "1.8 MB",
    model: "Kontext Pro"
  }
];

const PhotoFeed = ({ onPhotoSelect, onFixAgain, processingPhoto, processingProgress, completedPhotos = [] }: PhotoFeedProps) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [currentViews, setCurrentViews] = useState<Record<string, 'original' | 'fixed' | 'video'>>({});
  const [fullscreenPhoto, setFullscreenPhoto] = useState<PhotoResult | null>(null);
  
  const getCurrentView = (photoId: string) => {
    return currentViews[photoId] || 'fixed';
  };
  
  const setCurrentView = (photoId: string, view: 'original' | 'fixed' | 'video') => {
    setCurrentViews(prev => ({ ...prev, [photoId]: view }));
  };
  
  const getCurrentImageUrl = (photo: PhotoResult) => {
    const view = getCurrentView(photo.id);
    switch (view) {
      case 'original':
        return photo.originalUrl;
      case 'video':
        return photo.videoUrl || photo.fixedUrl;
      default:
        return photo.fixedUrl;
    }
  };

  const handlePhotoClick = (photo: PhotoResult) => {
    onPhotoSelect(photo);
  };

  const handleDownload = (photo: PhotoResult) => {
    const link = document.createElement('a');
    link.href = getCurrentImageUrl(photo);
    link.download = `fixed-photo-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (photo: PhotoResult) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fixed Photo',
          text: 'Check out this restored photo!',
          url: getCurrentImageUrl(photo)
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(getCurrentImageUrl(photo));
        alert('Image URL copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy URL');
      }
    }
  };

  const handleFixAgain = (photo: PhotoResult) => {
    if (onFixAgain) {
      onFixAgain(photo);
    }
  };

  return (
    <div className="space-y-6">
      {/* Processing card */}
      {processingPhoto && (
        <div className="photo-card processing-bg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Fixing your photo...</h3>
              <span className="text-sm text-muted-foreground">
                {processingProgress}%
              </span>
            </div>
            <div className="w-full bg-progress-bg rounded-full h-3">
              <div
                className="bg-progress-fill h-3 rounded-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {processingPhoto.originalUrl ? (
                <img
                  src={processingPhoto.originalUrl}
                  alt="Processing photo"
                  className="w-full h-full object-cover opacity-80 blur-sm"
                />
              ) : (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Processing image...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stacked photo results with integrated controls */}
      <div className="space-y-8">
        {/* Show completed photos first, then sample photos */}
        {[...completedPhotos, ...samplePhotos].map((photo) => (
          <div key={photo.id} className="photo-card rounded-xl overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
              {/* Left side - Image */}
              <div className="lg:col-span-8">
                <div 
                  className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                  onClick={() => setFullscreenPhoto(photo)}
                >
                  <img
                    src={getCurrentImageUrl(photo)}
                    alt="Restored photo"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
                </div>
              </div>
              
              {/* Right side - Controls and info */}
              <div className="lg:col-span-4 p-6 bg-background-secondary flex flex-col justify-between">
                {/* Photo info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{photo.timestamp}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {photo.model}
                    </span>
                  </div>
                  
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{photo.dimensions}</p>
                    <p>{photo.fileSize}</p>
                  </div>
                </div>
                
                {/* View toggles */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setCurrentView(photo.id, 'original')}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        getCurrentView(photo.id) === 'original' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden">
                        <img src={photo.originalUrl} alt="Original" className="w-full h-full object-cover" />
                      </div>
                      Original
                    </button>
                    
                    <button 
                      onClick={() => setCurrentView(photo.id, 'fixed')}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        getCurrentView(photo.id) === 'fixed' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden">
                        <img src={photo.fixedUrl} alt="Fixed" className="w-full h-full object-cover" />
                      </div>
                      Fixed
                    </button>
                    
                    {photo.videoUrl ? (
                      <button 
                        onClick={() => setCurrentView(photo.id, 'video')}
                        className={`p-2 rounded-lg text-xs transition-all ${
                          getCurrentView(photo.id) === 'video' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                        }`}
                      >
                        <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden relative">
                          <img src={photo.fixedUrl} alt="Video" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        Video
                      </button>
                    ) : (
                      <div className="relative">
                        <button 
                          className="w-full p-2 rounded-lg text-xs bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all font-medium group"
                        >
                          <div className="aspect-[4/3] bg-white/20 rounded mb-1 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold text-lg">▶</span>
                          </div>
                          Animate!
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-40 text-center leading-relaxed">
                            Create a 5-second animated video
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full btn-primary"
                      onClick={() => handleDownload(photo)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="btn-secondary"
                        onClick={() => handleShare(photo)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="btn-secondary"
                        onClick={() => handleFixAgain(photo)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Fix Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-[30px]" onClick={() => setFullscreenPhoto(null)}>
          <div className="relative w-full h-full bg-background-secondary/95 backdrop-blur-sm rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 p-8 flex items-center justify-center">
              <img
                src={getCurrentImageUrl(fullscreenPhoto)}
                alt="Fullscreen photo"
                className="max-w-full max-h-full object-contain cursor-pointer rounded-lg shadow-lg"
                onClick={() => setFullscreenPhoto(null)}
              />
            </div>
            <button
              onClick={() => setFullscreenPhoto(null)}
              className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all backdrop-blur-sm border border-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Load more placeholder */}
      <div className="text-center py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-32 mx-auto" />
          <div className="h-4 bg-muted rounded w-24 mx-auto" />
        </div>
        <p className="text-muted-foreground mt-4">Loading more results...</p>
      </div>
    </div>
  );
};

export default PhotoFeed;