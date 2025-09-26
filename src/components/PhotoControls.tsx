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

const PhotoControls = () => {
  const [currentView, setCurrentView] = useState<'original' | 'fixed' | 'video'>('fixed');

  return (
    <div className="space-y-8">
      {samplePhotos.map((photo) => (
        <div key={photo.id} className="photo-card p-4 flex flex-col justify-between" style={{ minHeight: 'calc(75vh / 8)' }}>
          {/* Photo info */}
          <div className="space-y-3">
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
              <button
                onClick={() => setCurrentView('original')}
                className={`flex-1 p-2 rounded-lg text-xs transition-all ${
                  currentView === 'original' 
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
                onClick={() => setCurrentView('fixed')}
                className={`flex-1 p-2 rounded-lg text-xs transition-all ${
                  currentView === 'fixed' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                }`}
              >
                <div className="aspect-[4/3] bg-muted rounded mb-1 overflow-hidden">
                  <img src={photo.fixedUrl} alt="Fixed" className="w-full h-full object-cover" />
                </div>
                Enhanced
              </button>
              
              {photo.videoUrl ? (
                <button
                  onClick={() => setCurrentView('video')}
                  className={`flex-1 p-2 rounded-lg text-xs transition-all ${
                    currentView === 'video' 
                      ? 'bg-primary text-primary-foreground' 
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
      ))}
    </div>
  );
};

export default PhotoControls;