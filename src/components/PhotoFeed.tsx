import { useState } from "react";
import { Download, Share, RotateCcw, Play, Video, X, ArrowLeft, Upload, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoResult, PhotoFeedProps, DEFAULT_MODEL } from "@/types";

// Import sample photos
import samplePhoto1 from "@/assets/sample-photo-1.jpg";
import samplePhoto2 from "@/assets/sample-photo-2.jpg";
import samplePhoto3 from "@/assets/sample-photo-3.jpg";
import samplePhoto4 from "@/assets/sample-photo-4.jpg";
import samplePhoto5 from "@/assets/sample-photo-5.jpg";
import samplePhoto6 from "@/assets/sample-photo-6.jpg";
import samplePhoto7 from "@/assets/sample-photo-7.jpg";
import samplePhoto8 from "@/assets/sample-photo-8.jpg";

const samplePhotos: PhotoResult[] = [
  {
    id: "1",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    instructions: "Give her blue eyes and sandy blonde hair",
    timestamp: "2 minutes ago",
    dimensions: "800x600",
    fileSize: "2.1 MB",
    model: DEFAULT_MODEL,
    favorited: true
  },
  {
    id: "2",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    videoUrl: samplePhoto2,
    instructions: "Remove the fire hydrant in the background",
    timestamp: "15 minutes ago",
    dimensions: "600x900",
    fileSize: "1.8 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "3",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    instructions: "Change the setting to an outdoor garden",
    timestamp: "1 hour ago",
    dimensions: "800x600",
    fileSize: "2.3 MB",
    model: DEFAULT_MODEL,
    favorited: true
  },
  {
    id: "4",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    instructions: "Change the decoration and style of the interior to a modern and stylish boho-chic aesthetic",
    timestamp: "2 hours ago",
    dimensions: "700x1000",
    fileSize: "1.9 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "5",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    videoUrl: samplePhoto5,
    instructions: "Add warm golden hour lighting and remove shadows",
    timestamp: "3 hours ago",
    dimensions: "800x600",
    fileSize: "2.0 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "6",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    instructions: "Replace the grey sky with a beautiful sunset",
    timestamp: "1 day ago",
    dimensions: "600x850",
    fileSize: "1.7 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "7",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    instructions: "Change her outfit to a flowing white dress",
    timestamp: "2 days ago",
    dimensions: "800x600",
    fileSize: "2.4 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "8",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    videoUrl: samplePhoto8,
    instructions: "Remove all people from the background and add cherry blossoms",
    timestamp: "3 days ago",
    dimensions: "750x1100",
    fileSize: "2.2 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "9",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    videoUrl: samplePhoto1,
    instructions: "Make the background a cozy coffee shop with warm lighting",
    timestamp: "4 days ago",
    dimensions: "900x650",
    fileSize: "2.8 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "10",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    instructions: "Add natural makeup with rosy cheeks and glossy lips",
    timestamp: "5 days ago",
    dimensions: "650x950",
    fileSize: "1.5 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "11",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    instructions: "Change shirt color to deep navy",
    timestamp: "1 week ago",
    dimensions: "800x600",
    fileSize: "2.6 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "12",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    videoUrl: samplePhoto4,
    instructions: "Remove power lines from background",
    timestamp: "1 week ago",
    dimensions: "720x980",
    fileSize: "2.1 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "13",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    instructions: "Fix red eye and brighten smile",
    timestamp: "1 week ago",
    dimensions: "800x600",
    fileSize: "1.9 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "14",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    instructions: "She had icy blue eyes and a peach dress",
    timestamp: "2 weeks ago",
    dimensions: "580x820",
    fileSize: "1.6 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "15",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    videoUrl: samplePhoto7,
    instructions: "Smooth skin and whiten teeth naturally",
    timestamp: "2 weeks ago",
    dimensions: "800x600",
    fileSize: "2.3 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "16",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    instructions: "Change background to mountain landscape",
    timestamp: "3 weeks ago",
    dimensions: "740x1050",
    fileSize: "2.7 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "17",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    instructions: "Remove shadow under chin",
    timestamp: "3 weeks ago",
    dimensions: "800x600",
    fileSize: "2.0 MB",
    model: DEFAULT_MODEL
  },
  {
    id: "18",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    videoUrl: samplePhoto2,
    instructions: "Add professional studio lighting effect",
    timestamp: "1 month ago",
    dimensions: "620x880",
    fileSize: "1.8 MB",
    model: DEFAULT_MODEL
  }
];

const PhotoFeed = ({ onPhotoSelect, onFixAgain, processingPhoto, processingProgress, completedPhotos = [], newlyCompletedId, onToggleFavorite }: PhotoFeedProps) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [currentViews, setCurrentViews] = useState<Record<string, 'original' | 'fixed' | 'video'>>({});
  const [fullscreenPhoto, setFullscreenPhoto] = useState<PhotoResult | null>(null);
  const [animateMode, setAnimateMode] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [samplePhotosState, setSamplePhotosState] = useState<PhotoResult[]>(samplePhotos);
  
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

  const handleAnimateClick = (photo: PhotoResult) => {
    setAnimateMode(photo.id);
  };

  const handleBackFromAnimate = () => {
    setAnimateMode(null);
  };

  const handleToggleFavorite = (photoId: string) => {
    // Handle completed photos
    onToggleFavorite?.(photoId);
    
    // Handle sample photos
    setSamplePhotosState(prev => 
      prev.map(photo => 
        photo.id === photoId 
          ? { ...photo, favorited: !photo.favorited }
          : photo
      )
    );
  };

  // Filter photos based on favorites toggle
  const allPhotos = [...completedPhotos, ...samplePhotosState];
  const filteredPhotos = showFavoritesOnly 
    ? allPhotos.filter(photo => photo.favorited)
    : allPhotos;

  return (
    <div className="space-y-6">
      {/* Processing card */}
      {processingPhoto && (
        <div className="photo-card rounded-xl overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
            {/* Left side - Processing Image */}
            <div className="lg:col-span-8">
              <div className="h-[400px] bg-muted overflow-hidden relative flex items-center justify-center processing-bg">
                {processingPhoto.originalUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={processingPhoto.originalUrl}
                      alt="Processing photo"
                      className="w-full h-full object-contain opacity-70 blur-sm"
                    />
                    {/* Undulating highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 2s ease-in-out infinite'
                         }} />
                    
                    {/* Centered progress overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center space-y-3">
                        <div className="w-64 bg-white/20 rounded-full h-4">
                          <div
                            className="bg-primary h-4 rounded-full transition-all duration-300"
                            style={{ width: `${processingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Processing image...</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side - Processing info */}
            <div className="lg:col-span-4 p-6 bg-background-secondary flex flex-col justify-center">
              <div className="space-y-4 text-center">
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-foreground">Fixing your photo</h4>
                  <p className="text-sm text-muted-foreground">AI is working its magic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stacked photo results with integrated controls */}
      <div className="space-y-8">
        {/* Show completed photos first, then sample photos */}
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className={`photo-card rounded-xl overflow-hidden group ${newlyCompletedId === photo.id ? 'animate-magical-reveal' : ''}`}>
            {animateMode === photo.id ? (
              // Landing Page Style Animate Modal
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4"
                onClick={handleBackFromAnimate}
              >
                <div 
                  className="w-full max-w-3xl bg-background rounded-3xl shadow-2xl relative animate-scale-in"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={handleBackFromAnimate}
                    className="absolute top-6 right-6 z-10 bg-muted hover:bg-muted/80 text-foreground rounded-full p-2 transition-all hover:scale-[1.02] duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Centered Content */}
                  <div className="px-8 py-16 sm:px-12 sm:py-20 text-center space-y-8">
                    {/* Hero Title */}
                    <div className="space-y-4 max-w-4xl mx-auto">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Create a Sharable Video!
                      </h1>
                      <p className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
                        Magically transform your photo into a realistic 5-second video
                      </p>
                    </div>

                    {/* Large Thumbnail */}
                    <div className="flex justify-center">
                      <div className="w-72 h-56 sm:w-96 sm:h-72 bg-muted rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/20 relative">
                        <img
                          src={photo.fixedUrl}
                          alt="Your photo"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Massive CTA */}
                    <div className="pt-4 space-y-3">
                      <Button 
                        size="lg"
                        className="text-xl sm:text-2xl font-bold py-6 px-10 sm:py-7 sm:px-12 bg-orange-500 hover:bg-orange-600 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 rounded-2xl inline-flex items-center gap-2"
                      >
                        Create Video ✨
                      </Button>
                      <p className="text-xs text-muted-foreground/60 text-center font-light">5 credits</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Normal View
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
                {/* Left side - Image */}
                <div className="lg:col-span-8">
                  <div 
                    className="h-[400px] bg-muted overflow-hidden cursor-pointer relative flex items-center justify-center"
                    onClick={() => setFullscreenPhoto(photo)}
                  >
                    <img
                      src={getCurrentImageUrl(photo)}
                      alt="Restored photo"
                      className="w-full h-full object-contain transition-all duration-300"
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
                    {photo.instructions && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                          "{photo.instructions}"
                        </p>
                        <button
                          onClick={() => handleToggleFavorite(photo.id)}
                          className="group relative p-1 -ml-1 hover:scale-[1.02] transition-all duration-200"
                          title={photo.favorited ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Star 
                            className={`h-6 w-6 ${
                              photo.favorited 
                                ? 'fill-yellow-500 text-yellow-500' 
                                : 'text-muted-foreground hover:text-yellow-500 hover:fill-yellow-500/20'
                            } transition-all duration-200 group-hover:scale-110 cursor-pointer`}
                          />
                        </button>
                      </div>
                    )}
                    
                  </div>
                  
                  {/* View toggles */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => setCurrentView(photo.id, 'original')}
                        className={`p-2 rounded-lg text-xs transition-all hover:scale-[1.02] duration-200 ${
                          getCurrentView(photo.id) === 'original' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                        }`}
                      >
                         <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden flex items-center justify-center">
                           <img src={photo.originalUrl} alt="Original" className="w-full h-full object-contain" />
                         </div>
                        Original
                      </button>
                      
                      <button 
                        onClick={() => setCurrentView(photo.id, 'fixed')}
                        className={`p-2 rounded-lg text-xs transition-all hover:scale-[1.02] duration-200 ${
                          getCurrentView(photo.id) === 'fixed' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                        }`}
                      >
                         <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden flex items-center justify-center">
                           <img src={photo.fixedUrl} alt="Fixed" className="w-full h-full object-contain" />
                         </div>
                        Fixed
                      </button>
                      
                      {photo.videoUrl ? (
                        <button 
                          onClick={() => setCurrentView(photo.id, 'video')}
                          className={`p-2 rounded-lg text-xs transition-all hover:scale-[1.02] duration-200 ${
                            getCurrentView(photo.id) === 'video' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                          }`}
                        >
                           <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden relative flex items-center justify-center">
                             <img src={photo.fixedUrl} alt="Video" className="w-full h-full object-contain" />
                             <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          Video
                        </button>
                      ) : (
                        <div className="relative">
                           <button 
                             onClick={() => handleAnimateClick(photo)}
                             className="w-full p-2 rounded-lg text-xs bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] transition-all duration-200 font-medium peer"
                           >
                             <div className="aspect-[4/3] rounded mb-1 flex items-center justify-center">
                               <span className="text-white font-bold text-2xl">▶</span>
                             </div>
                             Animate!
                           </button>
                          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 peer-hover:opacity-100 transition-opacity pointer-events-none z-10 w-40 text-center leading-relaxed">
                            Create a 5-second animated video
                          </div>
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
                          <Share className="h-4 w-4 mr-1" />
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
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setFullscreenPhoto(null)}>
          <div 
            className="relative max-w-6xl max-h-[90vh] bg-background border border-border/20 rounded-3xl overflow-hidden flex items-center justify-center animate-scale-in"
            style={{
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 flex items-center justify-center min-w-[600px] min-h-[400px]">
              <img
                src={getCurrentImageUrl(fullscreenPhoto)}
                alt="Fullscreen photo"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <button
              onClick={() => setFullscreenPhoto(null)}
              className="absolute top-6 right-6 bg-muted hover:bg-muted/80 text-foreground rounded-full p-2 transition-all hover:scale-[1.02] duration-200"
            >
              <X className="h-5 w-5" />
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