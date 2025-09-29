# Flux Technical Specifications

Complete technical reference for the FixMyPhoto design system with exact values, full component code, and implementation details.

---

## 1. Complete Color System Export

### HSL Color Values (Dark Theme)

```css
/* Background Colors */
--background: 220 13% 10%;              /* Main app background */
--background-secondary: 220 13% 12%;    /* Secondary surfaces */
--background-tertiary: 220 13% 8%;      /* Deepest backgrounds */
--foreground: 210 40% 95%;              /* Text on backgrounds */

/* Card Surfaces */
--card: 220 13% 12%;                    /* Card background */
--card-hover: 220 13% 14%;              /* Card hover state */
--card-foreground: 210 40% 95%;         /* Text on cards */

/* Popover Surfaces */
--popover: 220 13% 12%;
--popover-foreground: 210 40% 95%;

/* Primary Blue (Actions & CTAs) */
--primary: 217 91% 60%;                 /* Main blue accent */
--primary-hover: 217 91% 55%;           /* Hover state */
--primary-foreground: 210 40% 98%;      /* Text on primary */

/* Secondary Surfaces */
--secondary: 220 13% 16%;               /* Secondary backgrounds */
--secondary-hover: 220 13% 18%;         /* Secondary hover */
--secondary-foreground: 210 40% 90%;    /* Text on secondary */

/* Muted Elements */
--muted: 220 13% 16%;
--muted-foreground: 215 20% 65%;        /* Subdued text */

/* Accent Surfaces */
--accent: 220 13% 16%;
--accent-foreground: 210 40% 90%;

/* Status Colors */
--success: 142 76% 36%;                 /* Green for success */
--success-foreground: 210 40% 98%;

--destructive: 0 84% 60%;               /* Red for errors */
--destructive-foreground: 210 40% 98%;

/* Interactive Elements */
--border: 220 13% 20%;                  /* Default borders */
--border-hover: 220 13% 25%;            /* Border hover state */
--input: 220 13% 16%;                   /* Input backgrounds */
--ring: 217 91% 60%;                    /* Focus rings */

/* Upload Widget Specific */
--upload-border: 217 91% 60%;           /* Upload border accent */
--upload-bg: 220 13% 12%;
--upload-hover: 220 13% 14%;

/* Left Column Background */
--left-column-bg: 220 13% 9%;           /* Fixed sidebar bg */

/* Progress & Loading */
--progress-bg: 220 13% 16%;
--progress-fill: 217 91% 60%;
```

### Gradient Definitions

```css
/* Primary Gradient - For CTAs and important buttons */
--gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 55%));

/* Card Gradient - Subtle elevation effect */
--gradient-card: linear-gradient(145deg, hsl(220 13% 12%), hsl(220 13% 14%));

/* Upload Widget Gradient */
--gradient-upload: linear-gradient(145deg, hsl(220 13% 12%), hsl(220 13% 14%));

/* Holographic Upload Background (animated) */
background: linear-gradient(45deg, 
  hsl(280 100% 70% / 0.05),    /* Purple */
  hsl(320 100% 70% / 0.05),    /* Pink */
  hsl(200 100% 70% / 0.05),    /* Cyan */
  hsl(280 100% 70% / 0.05),    /* Purple */
  hsl(320 100% 70% / 0.05));   /* Pink */
background-size: 300% 300%;

/* Processing Background Gradient */
background: linear-gradient(45deg, 
  hsl(220 13% 10%),            /* background */
  hsl(220 13% 12%),            /* background-secondary */
  hsl(220 13% 12%),            /* card */
  hsl(220 13% 12%));           /* background-secondary */
background-size: 600% 600%;
```

### Shadow System

```css
/* Card shadows */
--shadow-card: 0 4px 20px -4px hsl(220 13% 5% / 0.3);
--shadow-hover: 0 8px 30px -6px hsl(220 13% 5% / 0.4);

/* Upload widget shadow */
--shadow-upload: 0 0 0 2px hsl(217 91% 60% / 0.2);  /* Blue glow */

/* Button shadows (in component classes) */
/* Primary button: 0 4px 15px -4px hsl(217 91% 60% / 0.4) */
/* Primary hover: 0 6px 20px -4px hsl(217 91% 60% / 0.5), 0 0 20px hsl(217 91% 60% / 0.2) */
/* Secondary hover: 0 4px 15px -4px hsl(220 13% 16% / 0.4), 0 0 15px hsl(217 91% 60% / 0.1) */
/* Photo card hover: 0 0 40px hsl(217 91% 60% / 0.2) */
```

### Transition Definitions

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Border Radius

```css
--radius: 0.75rem;  /* 12px - Base radius for consistent rounding */
```

---

## 2. Typography System

### Font Family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale & Font Weights

```typescript
// Headings
"text-4xl"    // 36px - Main hero text (animate modal title)
"text-3xl"    // 30px - Large headings
"text-2xl"    // 24px - Section headings
"text-xl"     // 20px - Card titles (h4)
"text-lg"     // 18px - Subheadings

// Body Text
"text-base"   // 16px - Default body text
"text-sm"     // 14px - Secondary text, labels
"text-xs"     // 12px - Small labels, badges

// Font Weights
"font-bold"     // 700 - Headings, emphasis
"font-semibold" // 600 - Subheadings
"font-medium"   // 500 - Buttons, labels
"font-normal"   // 400 - Body text
"font-light"    // 300 - Subtle text
```

### Text Color Mappings

```typescript
// On Background Surfaces
"text-foreground"           // hsl(210 40% 95%) - Primary text
"text-muted-foreground"     // hsl(215 20% 65%) - Secondary text
"text-muted-foreground/70"  // 70% opacity - Subtle/italic text
"text-muted-foreground/60"  // 60% opacity - Very subtle text

// On Primary/Accent Surfaces
"text-primary-foreground"   // hsl(210 40% 98%) - Text on blue
"text-secondary-foreground" // hsl(210 40% 90%) - Text on secondary

// Status Colors
"text-primary"              // hsl(217 91% 60%) - Blue accent text
"text-destructive"          // hsl(0 84% 60%) - Error text
"text-success"              // hsl(142 76% 36%) - Success text
"text-white"                // White - For dark overlays
```

### Line Heights

```typescript
"leading-tight"    // 1.25 - Tight spacing for headings
"leading-relaxed"  // 1.625 - Comfortable reading for body text
"leading-loose"    // 2 - Extra spacing for emphasis
```

---

## 3. Layout Architecture

### Page Structure

```tsx
// Main container structure from Index.tsx
<div className="min-h-screen bg-background pt-16">
  <Header />  {/* Fixed header, h-16 */}
  
  <div className="relative">
    {/* Left Column - Fixed Upload Widget */}
    <div className="hidden sm:block left-column-bg rounded-xl p-6 
                    fixed top-[4.5rem] bottom-6 
                    w-[275px] sm:w-[295px] md:w-[315px] lg:w-[335px] xl:w-[355px] 
                    overflow-y-auto z-40"
         style={{ left: 'max(-51px, calc((100vw - 1280px) / 2 - 51px))' }}>
      <UploadWidget5 />
    </div>

    {/* Mobile Upload Widget */}
    <div className="sm:hidden mb-6 px-6 pt-6">
      <div className="left-column-bg rounded-xl p-6">
        <UploadWidget5 />
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-6 py-6">
      <div className="ml-0 sm:ml-[311px] md:ml-[331px] lg:ml-[351px] xl:ml-[371px]">
        <PhotoFeed />
      </div>
    </div>
  </div>
</div>
```

### Responsive Breakpoints

```typescript
// Tailwind default breakpoints
"sm"   // 640px  - Tablet
"md"   // 768px  - Tablet landscape
"lg"   // 1024px - Desktop
"xl"   // 1280px - Large desktop
"2xl"  // 1536px - Extra large desktop
```

### Spacing System

```typescript
// Container Spacing
"px-6"        // 1.5rem (24px) - Horizontal padding
"py-6"        // 1.5rem (24px) - Vertical padding
"pt-16"       // 4rem (64px) - Top padding (header height)

// Component Spacing
"space-y-6"   // 1.5rem gap between stacked elements
"space-y-4"   // 1rem gap for tighter stacking
"space-y-2"   // 0.5rem gap for related elements
"space-y-8"   // 2rem gap for major sections

"gap-2"       // 0.5rem - Grid/flex gap (small)
"gap-4"       // 1rem - Grid/flex gap (medium)
"gap-6"       // 1.5rem - Grid/flex gap (large)

// Margin System
"mb-6"        // 1.5rem bottom margin
"mt-4"        // 1rem top margin
"ml-0 sm:ml-[311px]" // Responsive left margin for content offset
```

### Grid System

```typescript
// Photo Card Layout
"grid grid-cols-1 lg:grid-cols-12 gap-0"

// Left side (image): lg:col-span-8    (8/12 = 66.67%)
// Right side (controls): lg:col-span-4 (4/12 = 33.33%)

// View Toggle Grid
"grid grid-cols-3 gap-2"  // 3 equal columns for Original/Fixed/Video

// Action Button Grid
"grid grid-cols-2 gap-2"  // 2 equal columns for Share/Fix Again
```

### Fixed Upload Widget Positioning

```typescript
// Desktop - Fixed position with responsive width
position: fixed;
top: 4.5rem;        // 72px (below header)
bottom: 1.5rem;     // 24px from bottom
z-index: 40;        // Above content, below modals

// Width by breakpoint
width: 275px;       // Base
sm: 295px;          // 640px+
md: 315px;          // 768px+
lg: 335px;          // 1024px+
xl: 355px;          // 1280px+

// Dynamic left positioning (centered until max-width, then offset)
left: max(-51px, calc((100vw - 1280px) / 2 - 51px));

// Content offset to account for fixed sidebar
ml-0 sm:ml-[311px] md:ml-[331px] lg:ml-[351px] xl:ml-[371px]
```

---

## 4. Animation System

### Keyframe Definitions

```css
/* Holographic Background Shift */
@keyframes holographic-shift {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 25%; }
  50%  { background-position: 0% 75%; }
  75%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Processing Pulse Animation */
@keyframes processing-pulse {
  0%   { background-position: 0% 50%; backdrop-filter: blur(0.5px); }
  17%  { background-position: 30% 20%; backdrop-filter: blur(1px); }
  33%  { background-position: 70% 30%; backdrop-filter: blur(1.5px); }
  50%  { background-position: 100% 50%; backdrop-filter: blur(1px); }
  67%  { background-position: 70% 70%; backdrop-filter: blur(0.8px); }
  83%  { background-position: 30% 80%; backdrop-filter: blur(1.2px); }
  100% { background-position: 0% 50%; backdrop-filter: blur(0.5px); }
}

/* Shimmer Effect */
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Magical Reveal (for newly completed photos) */
@keyframes magical-reveal {
  0%   { opacity: 0; transform: scale(0.95) translateY(20px); }
  50%  { opacity: 0.7; transform: scale(1.02) translateY(-5px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* Scale In (for modals) */
@keyframes scale-in {
  0%   { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

### Animation Classes

```css
/* Apply to upload widget */
.upload-widget-holographic {
  animation: holographic-shift 12s ease-in-out infinite;
}

.upload-widget-holographic:hover {
  animation-duration: 8s;  /* Speed up on hover */
}

.upload-widget-holographic.drag-over {
  animation-duration: 6s;  /* Speed up more when dragging */
}

/* Apply to processing card background */
.processing-bg {
  animation: processing-pulse 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

/* Apply to shimmer overlay during processing */
style={{ animation: 'shimmer 2s ease-in-out infinite' }}

/* Apply to newly completed photos */
.animate-magical-reveal {
  animation: magical-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Apply to modal */
.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
```

### Transition Patterns

```typescript
// Smooth transitions (most common)
"transition-all duration-300"
"transition-all duration-300 ease-in-out"

// Hover scale effects
"hover:scale-[1.02]"  // Subtle lift
"hover:scale-105"     // More pronounced
"hover:scale-110"     // Icon emphasis

// Transform transitions
"hover:-translate-y-1"  // Lift up on hover

// Combined transitions
"transition-all duration-200 hover:scale-[1.02]"
```

---

## 5. Component Code Exports

### Header Component (Full Code)

```tsx
import { ChevronDown, Coins, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/fixmyphoto-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <img 
          src={logo} 
          alt="FixMyPhoto" 
          className="w-auto"
          style={{ height: '50px' }}
        />

        {/* User info */}
        <div className="flex items-center space-x-4">
          {/* Credits badge */}
          <div className="flex items-center space-x-2 bg-secondary px-3 py-1.5 rounded-full">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">183 Credits</span>
          </div>

          {/* Get more credits button */}
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">Peter Martin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### Upload Widget Component Structure

```tsx
// Key props interface
interface UploadWidgetProps {
  onFileSelect: (file: File, instructions?: string) => void;
  isProcessing: boolean;
}

// Key state variables
const [isDragOver, setIsDragOver] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);
const [instructions, setInstructions] = useState("");

// Main container structure
<div className="upload-widget-holographic" + (isDragOver ? " drag-over" : "")>
  {!selectedFile ? (
    // Drop zone with icon and text
  ) : (
    // Preview with clear button
  )}
  
  {/* Custom instructions textarea */}
  <Textarea placeholder="Add custom instructions..." />
  
  {/* Submit button */}
  <Button disabled={!selectedFile || isProcessing}>
    Fix My Photo
  </Button>
</div>
```

### Photo Feed Card Structure

```tsx
// Processing Card
<div className="photo-card">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
    {/* Left: Processing image with blur and shimmer */}
    <div className="lg:col-span-8">
      <div className="h-[400px] processing-bg">
        <img className="opacity-70 blur-sm" />
        {/* Shimmer overlay */}
        {/* Progress bar overlay */}
      </div>
    </div>
    
    {/* Right: Processing status */}
    <div className="lg:col-span-4 p-6 bg-background-secondary">
      <h4>Fixing your photo</h4>
      <p>AI is working its magic</p>
    </div>
  </div>
</div>

// Result Card
<div className="photo-card">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
    {/* Left: Image preview */}
    <div className="lg:col-span-8">
      <div className="h-[400px]" onClick={() => setFullscreenPhoto(photo)}>
        <img src={getCurrentImageUrl(photo)} />
      </div>
    </div>
    
    {/* Right: Controls */}
    <div className="lg:col-span-4 p-6 bg-background-secondary">
      {/* Timestamp and model badge */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{photo.timestamp}</p>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {photo.model}
        </span>
      </div>
      
      {/* Instructions and favorite */}
      {photo.instructions && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground/70 italic">
            "{photo.instructions}"
          </p>
          <button onClick={() => handleToggleFavorite(photo.id)}>
            <Star className={photo.favorited ? 'fill-yellow-500' : ''} />
          </button>
        </div>
      )}
      
      {/* View toggles: 3-column grid */}
      <div className="grid grid-cols-3 gap-2">
        <button>Original</button>
        <button>Fixed</button>
        <button>Animate ></button>
      </div>
      
      {/* Action buttons */}
      <Button className="w-full btn-primary">
        <Download /> Download
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button className="btn-secondary">Share</Button>
        <Button className="btn-secondary">Fix Again</Button>
      </div>
    </div>
  </div>
</div>
```

### Animate Modal Structure

```tsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
  <div className="w-full max-w-3xl bg-background rounded-3xl animate-scale-in"
       style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' }}>
    
    {/* Close button */}
    <button className="absolute top-6 right-6">
      <X className="h-5 w-5" />
    </button>

    {/* Centered content */}
    <div className="px-8 py-16 sm:px-12 sm:py-20 text-center space-y-8">
      {/* Hero title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        Create a Sharable Video!
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground/70">
        Magically transform your photo into a realistic 5-second video
      </p>

      {/* Large thumbnail with play button */}
      <div className="w-72 h-56 sm:w-96 sm:h-72 bg-muted rounded-2xl">
        <img src={photo.fixedUrl} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Massive CTA */}
      <Button className="text-xl sm:text-2xl font-bold py-6 px-10 
                         bg-orange-500 hover:bg-orange-600 
                         shadow-2xl hover:shadow-orange-500/25 
                         transform hover:scale-105 rounded-2xl">
        Create Video ✨
      </Button>
      <p className="text-xs text-muted-foreground/60">5 credits</p>
    </div>
  </div>
</div>
```

---

## 6. Interactive States

### Button States

```typescript
// Primary Button (.btn-primary)
default: {
  background: linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 55%));
  boxShadow: "0 4px 15px -4px hsl(217 91% 60% / 0.4)";
}

hover: {
  boxShadow: "0 6px 20px -4px hsl(217 91% 60% / 0.5), 0 0 20px hsl(217 91% 60% / 0.2)";
}

disabled: {
  opacity: 0.5;
  cursor: "not-allowed";
}

// Secondary Button (.btn-secondary)
default: {
  background: hsl(220 13% 16%);
  color: hsl(210 40% 90%);
}

hover: {
  background: hsl(220 13% 18%);
  boxShadow: "0 4px 15px -4px hsl(220 13% 16% / 0.4), 0 0 15px hsl(217 91% 60% / 0.1)";
}

// Outline Button (variant="outline")
default: {
  border: "1px solid hsl(220 13% 20%)";
  background: "transparent";
}

hover: {
  background: hsl(220 13% 16%);
  border: "1px solid hsl(220 13% 25%)";
}

// Ghost Button (variant="ghost")
default: {
  background: "transparent";
}

hover: {
  background: hsl(220 13% 16%);
}
```

### Card Hover States

```typescript
// Photo Card
default: {
  boxShadow: "0 4px 20px -4px hsl(220 13% 5% / 0.3)";
}

hover: {
  boxShadow: "0 8px 30px -6px hsl(220 13% 5% / 0.4), 0 0 40px hsl(217 91% 60% / 0.2)";
}

// View Toggle Buttons (Original/Fixed/Video)
default: {
  background: hsl(220 13% 16%);
  color: hsl(210 40% 90%);
}

active: {
  background: hsl(217 91% 60%);  // Blue primary
  color: hsl(210 40% 98%);
}

hover: {
  background: hsl(220 13% 18%);
  transform: "scale(1.02)";
}

// Animate Button (special orange gradient)
default: {
  background: "linear-gradient(to-br, #fbbf24, #f97316, #dc2626)";
  color: "white";
}

hover: {
  boxShadow: "0 4px 20px -4px rgba(249, 115, 22, 0.25)";
  transform: "scale(1.02)";
}
```

### Upload Widget States

```typescript
// Holographic Upload Widget
default: {
  animation: "holographic-shift 12s ease-in-out infinite";
  borderColor: "hsl(217 91% 60% / 0.3)";
}

hover: {
  animation: "holographic-shift 8s ease-in-out infinite";
  borderColor: "hsl(217 91% 60% / 0.6)";
  transform: "scale(1.02)";
}

dragOver: {
  animation: "holographic-shift 6s ease-in-out infinite";
  borderColor: "hsl(217 91% 60%)";
  transform: "scale(1.03)";
}
```

### Icon States

```typescript
// Favorite Star
unfavorited: {
  color: hsl(215 20% 65%);          // muted-foreground
  fill: "none";
}

unfavorited_hover: {
  color: "rgb(234 179 8)";          // yellow-500
  fill: "rgb(234 179 8 / 0.2)";     // yellow-500/20
  transform: "scale(1.1)";
}

favorited: {
  color: "rgb(234 179 8)";          // yellow-500
  fill: "rgb(234 179 8)";           // yellow-500
}

favorited_hover: {
  transform: "scale(1.1)";
}
```

---

## 7. Integration Patterns

### Data Flow & Interfaces

```typescript
// Photo Result Interface
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
  favorited?: boolean;
}

// PhotoFeed Props
interface PhotoFeedProps {
  onPhotoSelect: (photo: PhotoResult) => void;
  onFixAgain?: (photo: PhotoResult) => void;
  processingPhoto?: PhotoResult | null;
  processingProgress?: number;
  completedPhotos?: PhotoResult[];
  newlyCompletedId?: string | null;
  onToggleFavorite?: (photoId: string) => void;
}

// UploadWidget Props
interface UploadWidgetProps {
  onFileSelect: (file: File, instructions?: string) => void;
  isProcessing: boolean;
}
```

### State Management Pattern

```typescript
// Main page state (Index.tsx)
const [selectedPhoto, setSelectedPhoto] = useState<PhotoResult | null>(null);
const [currentView, setCurrentView] = useState<'original' | 'fixed' | 'video'>('fixed');
const [processingPhoto, setProcessingPhoto] = useState<PhotoResult | null>(null);
const [processingProgress, setProcessingProgress] = useState(0);
const [completedPhotos, setCompletedPhotos] = useState<PhotoResult[]>([]);
const [newlyCompletedId, setNewlyCompletedId] = useState<string | null>(null);

// Processing constants
export const PROCESSING_DURATION = 10000;         // 10 seconds
export const PROGRESS_UPDATE_INTERVAL = 100;      // 100ms
export const DEFAULT_MODEL = "Kontext Pro";
```

### Processing Flow

```typescript
// 1. File selection
handleFileSelect(file: File, instructions?: string) {
  // Create processing photo object
  const newPhoto: PhotoResult = {
    id: Date.now().toString(),
    originalUrl: URL.createObjectURL(file),
    fixedUrl: URL.createObjectURL(file),
    instructions,
    timestamp: "Processing...",
    dimensions: "Processing...",
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    model: DEFAULT_MODEL
  };
  
  setProcessingPhoto(newPhoto);
  setProcessingProgress(0);
  
  // 2. Progress simulation
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / PROCESSING_DURATION) * 100, 100);
    setProcessingProgress(Math.floor(progress));
    
    // 3. Completion
    if (progress >= 100) {
      clearInterval(interval);
      setCompletedPhotos(prev => [completedPhoto, ...prev]);
      setNewlyCompletedId(completedPhoto.id);
      setProcessingPhoto(null);
      
      // 4. Remove animation state
      setTimeout(() => setNewlyCompletedId(null), 800);
    }
  }, PROGRESS_UPDATE_INTERVAL);
}
```

### Event Handlers

```typescript
// View management (per-photo state)
const [currentViews, setCurrentViews] = useState<Record<string, 'original' | 'fixed' | 'video'>>({});

const getCurrentView = (photoId: string) => {
  return currentViews[photoId] || 'fixed';
};

const setCurrentView = (photoId: string, view: 'original' | 'fixed' | 'video') => {
  setCurrentViews(prev => ({ ...prev, [photoId]: view }));
};

// Image URL resolution
const getCurrentImageUrl = (photo: PhotoResult) => {
  const view = getCurrentView(photo.id);
  switch (view) {
    case 'original': return photo.originalUrl;
    case 'video': return photo.videoUrl || photo.fixedUrl;
    default: return photo.fixedUrl;
  }
};

// Favorite toggle
const handleToggleFavorite = (photoId: string) => {
  setCompletedPhotos(prev => 
    prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, favorited: !photo.favorited }
        : photo
    )
  );
};

// Fix again (reprocess enhanced image)
const handleFixAgain = async (photo: PhotoResult) => {
  const response = await fetch(photo.fixedUrl);
  const blob = await response.blob();
  const file = new File([blob], `enhanced-photo-${photo.id}.jpg`, { type: 'image/jpeg' });
  handleFileSelect(file, photo.instructions);
};
```

### Drag & Drop Implementation

```typescript
// Upload widget event handlers
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(false);
  
  const files = Array.from(e.dataTransfer.files);
  const imageFile = files.find(file => file.type.startsWith('image/'));
  
  if (imageFile) {
    handleFileSelect(imageFile);
  }
};

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(true);
};

const handleDragLeave = () => {
  setIsDragOver(false);
};

// Paste support
const handlePaste = (e: ClipboardEvent) => {
  const items = e.clipboardData?.items;
  if (!items) return;
  
  for (const item of Array.from(items)) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        handleFileSelect(file);
      }
    }
  }
};

useEffect(() => {
  window.addEventListener('paste', handlePaste);
  return () => window.removeEventListener('paste', handlePaste);
}, []);
```

---

## 8. Component-Specific CSS Classes

### Custom Utility Classes

```css
/* Upload Widget */
.upload-widget-holographic {
  /* Applied to main upload container */
  /* Includes holographic gradient and animation */
}

/* Photo Cards */
.photo-card {
  /* Applied to all photo result cards */
  /* Includes gradient background and shadows */
}

/* Processing Background */
.processing-bg {
  /* Applied to processing card image container */
  /* Includes animated gradient and blur */
}

/* Left Column Background */
.left-column-bg {
  /* Applied to fixed sidebar container */
  background-color: hsl(220 13% 9%);
}

/* Button Variants */
.btn-primary {
  /* Primary action button */
  /* Blue gradient with glow shadow */
}

.btn-secondary {
  /* Secondary action button */
  /* Muted background with subtle hover glow */
}

/* Thumbnail Overlay */
.thumbnail-overlay {
  /* Applied to view toggle thumbnails */
  /* Includes border and shadow effects */
}

/* Animation Classes */
.animate-magical-reveal {
  /* Applied to newly completed photos */
  animation: magical-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-scale-in {
  /* Applied to modals */
  animation: scale-in 0.2s ease-out;
}

/* Utility */
.line-clamp-2 {
  /* Limits text to 2 lines with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 9. Icon Usage Patterns

### Lucide React Icons Used

```typescript
// Navigation & Layout
import { ChevronDown, Plus, X, ArrowLeft } from "lucide-react";

// User & Credits
import { User, Coins } from "lucide-react";

// Actions
import { Download, Share, RotateCcw } from "lucide-react";

// Media
import { Play, Video, Upload, Star } from "lucide-react";

// Icon sizing
"h-4 w-4"  // Small (16px) - Buttons, badges
"h-5 w-5"  // Medium (20px) - Close buttons
"h-8 w-8"  // Large (32px) - Empty state, play button
```

---

## 10. Responsive Design Patterns

### Mobile Considerations

```typescript
// Hide desktop sidebar, show mobile upload widget
"hidden sm:block"    // Desktop sidebar
"sm:hidden"          // Mobile only

// Responsive text sizing
"text-3xl sm:text-4xl lg:text-5xl"  // Scale up hero text

// Responsive spacing
"px-8 py-16 sm:px-12 sm:py-20"      // More padding on desktop

// Responsive image sizing
"w-72 h-56 sm:w-96 sm:h-72"         // Larger images on desktop

// Grid to stacked layout
"grid grid-cols-1 lg:grid-cols-12"  // Stack on mobile, grid on desktop
```

---

## 11. Performance Optimizations

### Image Handling

```typescript
// Create object URLs for previews
URL.createObjectURL(file);

// Use object-contain for aspect ratio preservation
"object-contain"

// Lazy loading for thumbnails (implicit in React)
```

### Animation Performance

```typescript
// Use transform and opacity for GPU acceleration
transform: "scale(1.02)";
opacity: 0.7;

// Prefer backdrop-filter for blur effects
backdrop-filter: blur(0.5px);

// Use will-change sparingly (not implemented, but recommended for production)
```

---

## 12. Key Implementation Notes

### Critical Design Decisions

1. **No Modal Workflow**: Everything happens in-place in the feed
2. **Fixed Upload Widget**: Always accessible without scrolling
3. **In-Card View Toggle**: Switch between Original/Fixed/Video without leaving the card
4. **Blue Primary Color**: All interactive elements use blue (`hsl(217 91% 60%)`)
5. **Holographic Upload**: Eye-catching animated gradient to draw attention
6. **Processing in Feed**: Show processing state inline, not in a separate modal
7. **Stacked Feed**: Newest photos at the top, chronological order
8. **Per-Photo State**: Each photo maintains its own view state independently

### Component Dependencies

```typescript
// UI Components (shadcn/ui)
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Icons
import { lucide-react } from "lucide-react";

// Types
import { PhotoResult, PhotoFeedProps, UploadWidgetProps } from "@/types";
```

---

## 13. Testing Checklist

### Visual Testing
- [ ] Header fixed at top, always visible
- [ ] Upload widget fixed on left, doesn't scroll
- [ ] Photo cards display in correct grid layout (8/4 split)
- [ ] Processing animation shows shimmer and progress
- [ ] Newly completed photos animate in with magical-reveal
- [ ] View toggles show correct image (Original/Fixed/Video)
- [ ] Hover states work on all buttons and cards
- [ ] Mobile view stacks upload widget at top

### Interaction Testing
- [ ] Drag and drop upload works
- [ ] Click to upload works
- [ ] Paste image works (Ctrl+V / Cmd+V)
- [ ] Processing progresses smoothly over 10 seconds
- [ ] Completed photo appears at top of feed
- [ ] View toggle switches image correctly
- [ ] Download button downloads correct image
- [ ] Share button works (native share or clipboard)
- [ ] Fix Again reprocesses the enhanced image
- [ ] Favorite toggle stars/unstars photo
- [ ] Animate button opens modal
- [ ] Modal close button works

### Responsive Testing
- [ ] Desktop: Upload widget fixed on left
- [ ] Mobile: Upload widget at top, scrollable feed below
- [ ] Tablet: Upload widget adapts width appropriately
- [ ] Text scales properly at all breakpoints
- [ ] Images maintain aspect ratio

### Animation Testing
- [ ] Holographic upload background animates continuously
- [ ] Hover speeds up holographic animation
- [ ] Drag over speeds up animation more
- [ ] Processing card shows pulsing gradient
- [ ] Shimmer effect moves across processing image
- [ ] New photo reveals with scale and fade
- [ ] Modal scales in smoothly
- [ ] All transitions are smooth (300ms)

---

## Version History

**v1.0** - 2025-01-XX - Initial comprehensive technical specifications export