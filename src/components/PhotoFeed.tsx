import React, { useState } from "react";
import { Download, Share2, RotateCcw, Play, Video } from "lucide-react";
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
  processingPhoto?: PhotoResult | null;
  processingProgress?: number;
}

const samplePhotos: PhotoResult[] = [
  {
    id: "1",
    originalUrl: samplePhoto1,
    fixedUrl: samplePhoto1,
    instructions: "Restore Family Photo Portrait from 1940s",
    timestamp: "2 minutes ago",
    dimensions: "800x600",
    fileSize: "2.1 MB",
    model: "Context Pro"
  },
  {
    id: "2",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    videoUrl: samplePhoto2,
    instructions: "Colorize and Repair Wedding Photo",
    timestamp: "15 minutes ago",
    dimensions: "800x600",
    fileSize: "1.8 MB",
    model: "Context Pro"
  },
  {
    id: "3",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    instructions: "Remove Spots and Enhance Clarity",
    timestamp: "1 hour ago",
    dimensions: "800x600",
    fileSize: "2.3 MB",
    model: "Context Pro"
  },
  {
    id: "4",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    instructions: "Restore Children's School Photo",
    timestamp: "2 hours ago",
    dimensions: "800x600",
    fileSize: "1.9 MB",
    model: "Context Pro"
  },
  {
    id: "5",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    videoUrl: samplePhoto5,
    instructions: "Enhance Military Portrait",
    timestamp: "3 hours ago",
    dimensions: "800x600",
    fileSize: "2.0 MB",
    model: "Context Pro"
  },
  {
    id: "6",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    instructions: "Restore Graduation Photo",
    timestamp: "1 day ago",
    dimensions: "800x600",
    fileSize: "1.7 MB",
    model: "Context Pro"
  },
  {
    id: "7",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    instructions: "Fix Family Reunion Photo",
    timestamp: "2 days ago",
    dimensions: "800x600",
    fileSize: "2.4 MB",
    model: "Context Pro"
  },
  {
    id: "8",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    videoUrl: samplePhoto8,
    instructions: "Colorize Vintage Couple Portrait",
    timestamp: "3 days ago",
    dimensions: "800x600",
    fileSize: "2.2 MB",
    model: "Context Pro"
  }
];

const PhotoFeed = ({ onPhotoSelect, processingPhoto, processingProgress }: PhotoFeedProps) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  const handlePhotoClick = (photo: PhotoResult) => {
    onPhotoSelect(photo);
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
            <div className="w-full bg-progress-bg rounded-full h-2">
              <div
                className="bg-progress-fill h-2 rounded-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Processing image...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stacked photo results with integrated controls */}
      <div className="space-y-8">
        {samplePhotos.map((photo) => (
          <div key={photo.id} className="photo-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left side - Image */}
              <div className="lg:col-span-8">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.fixedUrl}
                    alt="Restored photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Right side - Controls and info */}
              <div className="lg:col-span-4 p-6 bg-card flex flex-col justify-between">
                {/* Photo info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{photo.timestamp}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {photo.model}
                    </span>
                  </div>
                  
                  {photo.instructions && (
                    <p className="text-sm font-medium">{photo.instructions}</p>
                  )}
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{photo.dimensions}</p>
                    <p>{photo.fileSize}</p>
                  </div>
                </div>
                
                {/* View toggles */}
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <button className="flex-1 p-2 rounded-lg text-xs bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-all">
                      <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden">
                        <img src={photo.originalUrl} alt="Original" className="w-full h-full object-cover" />
                      </div>
                      Original
                    </button>
                    
                    <button className="flex-1 p-2 rounded-lg text-xs bg-primary text-primary-foreground transition-all">
                      <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden">
                        <img src={photo.fixedUrl} alt="Enhanced" className="w-full h-full object-cover" />
                      </div>
                      Enhanced
                    </button>
                    
                    {photo.videoUrl ? (
                      <button className="flex-1 p-2 rounded-lg text-xs bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-all">
                        <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden relative">
                          <img src={photo.fixedUrl} alt="Video" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        Video
                      </button>
                    ) : (
                      <button className="flex-1 p-2 rounded-lg text-xs bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-all">
                        <div className="aspect-[4/3] bg-muted rounded mb-1 flex items-center justify-center">
                          <Video className="h-4 w-4 text-muted-foreground" />
                        </div>
                        Make Video
                      </button>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="space-y-2">
                    <Button size="sm" className="w-full btn-primary">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="secondary" className="btn-secondary">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="secondary" className="btn-secondary">
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