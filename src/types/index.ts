export interface PhotoResult {
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

export interface PhotoFeedProps {
  onPhotoSelect: (photo: PhotoResult) => void;
  onFixAgain?: (photo: PhotoResult) => void;
  processingPhoto?: PhotoResult | null;
  processingProgress?: number;
  completedPhotos?: PhotoResult[];
}

// Constants
export const PROCESSING_DURATION = 10000; // 10 seconds
export const PROGRESS_UPDATE_INTERVAL = 100; // 100ms
export const DEFAULT_MODEL = "Kontext Pro";