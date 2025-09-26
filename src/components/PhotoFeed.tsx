import React, { useState } from "react";
import { Download, Share2, RotateCcw, Play } from "lucide-react";
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
    instructions: "Restore family portrait from 1940s",
    timestamp: "2 minutes ago",
    dimensions: "800x600",
    fileSize: "2.1 MB"
  },
  {
    id: "2",
    originalUrl: samplePhoto2,
    fixedUrl: samplePhoto2,
    instructions: "Colorize and repair wedding photo",
    timestamp: "15 minutes ago",
    dimensions: "800x600",
    fileSize: "1.8 MB"
  },
  {
    id: "3",
    originalUrl: samplePhoto3,
    fixedUrl: samplePhoto3,
    instructions: "Remove spots and enhance clarity",
    timestamp: "1 hour ago",
    dimensions: "800x600",
    fileSize: "2.3 MB"
  },
  {
    id: "4",
    originalUrl: samplePhoto4,
    fixedUrl: samplePhoto4,
    instructions: "Restore children's school photo",
    timestamp: "2 hours ago",
    dimensions: "800x600",
    fileSize: "1.9 MB"
  },
  {
    id: "5",
    originalUrl: samplePhoto5,
    fixedUrl: samplePhoto5,
    instructions: "Enhance military portrait",
    timestamp: "3 hours ago",
    dimensions: "800x600",
    fileSize: "2.0 MB"
  },
  {
    id: "6",
    originalUrl: samplePhoto6,
    fixedUrl: samplePhoto6,
    instructions: "Restore graduation photo",
    timestamp: "1 day ago",
    dimensions: "800x600",
    fileSize: "1.7 MB"
  },
  {
    id: "7",
    originalUrl: samplePhoto7,
    fixedUrl: samplePhoto7,
    instructions: "Fix family reunion photo",
    timestamp: "2 days ago",
    dimensions: "800x600",
    fileSize: "2.4 MB"
  },
  {
    id: "8",
    originalUrl: samplePhoto8,
    fixedUrl: samplePhoto8,
    instructions: "Colorize vintage couple portrait",
    timestamp: "3 days ago",
    dimensions: "800x600",
    fileSize: "2.2 MB"
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

      {/* Stacked photo results */}
      <div className="space-y-8">
        {samplePhotos.map((photo) => (
          <div key={photo.id} className="space-y-6">
            {/* Middle column content - Media only */}
            <div className="w-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg photo-card">
                <img
                  src={photo.fixedUrl}
                  alt="Restored photo"
                  className="w-full h-full object-cover"
                />
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