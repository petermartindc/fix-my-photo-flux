# Flux Migration Guide

## Project Overview

This document contains all design specifications, technical details, and implementation guidelines for migrating the FixMyPhoto UI/UX design system to the original project.

## Design Philosophy

- **Clean, modern aesthetic** with holographic/futuristic elements
- **Non-modal workflow** - everything happens in-page without popups
- **Asymmetric two-column layout** for visual interest
- **Orange accent color** as primary brand color
- **Smooth animations** for professional feel
- **Card-based design** for processing states and results

---

## Color System

### Primary Colors (HSL Format)
```css
--primary: 24 100% 50%        /* Orange #FF8000 */
--primary-foreground: 0 0% 100%

--background: 240 10% 3.9%     /* Dark background */
--foreground: 0 0% 98%         /* Light text */

--card: 240 5% 8%              /* Card backgrounds */
--card-foreground: 0 0% 98%

--muted: 240 3.7% 15.9%
--muted-foreground: 240 5% 64.9%

--accent: 240 4.8% 15.9%
--accent-foreground: 0 0% 98%

--border: 240 3.7% 20%
--input: 240 3.7% 20%
```

### Gradients
```css
/* Holographic effect for upload widget */
background: linear-gradient(135deg, 
  rgba(255, 128, 0, 0.1) 0%,
  rgba(255, 128, 0, 0.05) 50%,
  rgba(255, 128, 0, 0.1) 100%
);

/* Subtle card gradient */
background: linear-gradient(180deg, 
  hsl(var(--card)) 0%,
  rgba(255, 128, 0, 0.02) 100%
);

/* Processing state shimmer */
background: linear-gradient(90deg,
  transparent 0%,
  rgba(255, 128, 0, 0.2) 50%,
  transparent 100%
);
```

---

## Layout Architecture

### Overall Structure
```
┌─────────────────────────────────────────┐
│ Header (Fixed, Full Width)              │
├──────────────┬──────────────────────────┤
│              │                          │
│  Upload      │   Photo Feed             │
│  Widget      │   (Scrollable)           │
│  (350px)     │   (Flexible)             │
│  (Fixed)     │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

### Responsive Behavior
- **Desktop (1024px+)**: Two-column layout as shown above
- **Tablet (768px - 1023px)**: Single column, upload widget at top
- **Mobile (<768px)**: Single column, full width components

### Spacing System
- **Container padding**: `px-4 md:px-8`
- **Component gaps**: `gap-6` (24px) between major sections
- **Card padding**: `p-6` (24px)
- **Content spacing**: `space-y-4` (16px) between related elements

---

## Component Specifications

### 1. Header Component

**Position**: Fixed top, full width, z-index 50

**Layout**:
```
Logo (Left) | Spacer | Credits (Center-Right) | User Menu (Right)
```

**Styling**:
- Background: `bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`
- Border: `border-b border-border`
- Height: `h-16` (64px)
- Padding: `px-6`

**Logo**:
- Image: `fixmyphoto-logo.png`
- Height: `h-8` (32px)
- Width: Auto

**Credits Display**:
- Text: "10 credits remaining"
- Style: `text-sm text-muted-foreground`
- Button: Orange outline variant

**User Dropdown**:
- Avatar with user icon
- Dropdown items: Profile, Settings, Billing, Sign Out
- All items use Lucide icons

---

### 2. Upload Widget

**Position**: Left column, fixed position (doesn't scroll with content)

**Dimensions**:
- Width: `w-full` (350px max-width on parent)
- Min-height: Adapts to content

**Visual Design**:
- Background: Holographic gradient (see Color System)
- Border: `border-2 border-dashed border-primary/30`
- Border radius: `rounded-xl`
- Padding: `p-8`

**States**:

1. **Empty State (Default)**:
   - Icon: Upload cloud (Lucide)
   - Size: `w-12 h-12`
   - Color: `text-primary`
   - Text: "Drop your photo here"
   - Subtext: "or click to browse"
   - Hover: `hover:border-primary/50 hover:bg-primary/5`

2. **Drag Over State**:
   - Border: `border-primary`
   - Background: `bg-primary/10`
   - Scale: `scale-[1.02]`

3. **File Selected State**:
   - Shows image preview
   - Preview size: Full width, max-height 400px
   - Object fit: Cover
   - Clear button: Top-right, size-8, destructive variant

**Custom Instructions**:
- Position: Below upload area
- Label: "Custom instructions (optional)"
- Textarea: 3 rows, resize-none
- Style: `bg-background/50 border-border`
- Placeholder: "Describe any specific changes..."

**Submit Button**:
- Full width
- Text: "Fix My Photo"
- Variant: Default (orange)
- Size: lg
- Disabled states: No file selected OR processing active

**Interactions**:
- Drag and drop
- Click to browse
- Paste from clipboard (Ctrl/Cmd + V)

---

### 3. Photo Feed (Results Area)

**Position**: Right column, scrollable

**Layout**: Vertical stack with `space-y-6`

**Card Types**:

#### A. Processing Card
**When**: Image is being processed

**Structure**:
```
┌──────────────────────────────┐
│  [Processing Icon]           │
│  "Processing your photo..."  │
│  [Progress Bar]              │
│  "Enhancing image quality"   │
└──────────────────────────────┘
```

**Styling**:
- Background: Card with subtle gradient
- Border: `border border-border`
- Padding: `p-6`
- Border radius: `rounded-xl`

**Animation**:
- Progress bar: Animated shimmer effect
- Icon: Gentle pulse animation
- Entrance: `animate-fade-in`

**Progress States**:
- "Analyzing image..."
- "Enhancing image quality..."
- "Applying fixes..."
- "Finalizing..."

#### B. Result Card
**When**: Processing complete

**Structure**:
```
┌────────────────────────────────────┐
│ [View Toggle: Original | Fixed]   │
│                                    │
│ [Image Display - Full Width]      │
│                                    │
│ [Action Buttons Row]               │
│ [Animate > Button]                 │
└────────────────────────────────────┘
```

**View Toggle**:
- Component: Tabs (Radix UI)
- Options: "Original" | "Fixed"
- Style: `bg-muted` background, `data-[state=active]:bg-background`
- Position: Top of card

**Image Display**:
- Width: Full card width
- Max-height: 600px
- Object fit: Contain
- Border radius: `rounded-lg`
- Smooth transition on view toggle

**Action Buttons**:
- Layout: Horizontal flex, gap-2
- Buttons: Download, Share
- Variant: Outline
- Size: sm
- Icons: Download, Share2 (Lucide)

**Animate Button**:
- Full width
- Text: "Animate >"
- Variant: Default (orange)
- Size: lg
- Margin top: `mt-4`

---

### 4. Animation Modal

**Trigger**: Clicking "Animate >" button

**Component**: Dialog (Radix UI)

**Structure**:
```
┌──────────────────────────────────┐
│  ✕ (Close)                       │
│  "Create Video"                  │
│                                  │
│  [Image Preview]                 │
│                                  │
│  Duration: [Slider] 3s           │
│  Effect: [Dropdown]              │
│                                  │
│  [Create Video Button]           │
└──────────────────────────────────┘
```

**Styling**:
- Max width: `max-w-2xl`
- Background: `bg-card`
- Border: `border border-border`
- Padding: `p-6`

**Duration Slider**:
- Range: 1-10 seconds
- Default: 3 seconds
- Steps: 1 second
- Label shows current value

**Effect Dropdown**:
- Options: "Ken Burns", "Zoom", "Pan Left", "Pan Right", "Subtle Motion"
- Default: "Ken Burns"

**Create Video Button**:
- Full width
- Variant: Default (orange)
- Loading state with spinner when processing

---

## Animation System

### Keyframes
```css
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 128, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 128, 0, 0.5);
  }
}
```

### Animation Classes
```css
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite ease-in-out;
}
```

### Transition Classes
```css
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-scale {
  transition: transform 0.2s ease-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

---

## Interactive States

### Button Hover States
```css
/* Primary Button */
default: bg-primary text-primary-foreground
hover: bg-primary/90
active: bg-primary/80 scale-[0.98]

/* Outline Button */
default: border-primary text-primary bg-transparent
hover: bg-primary/10
active: bg-primary/20

/* Destructive Button */
default: bg-destructive
hover: bg-destructive/90
```

### Card Hover States
- Border: `hover:border-primary/30`
- Shadow: `hover:shadow-lg hover:shadow-primary/10`
- Transform: `hover:-translate-y-1`
- Transition: `transition-all duration-200`

### Upload Widget Hover
- Border: Brighten to `border-primary/50`
- Background: Add `bg-primary/5`
- Scale: `scale-[1.01]`
- Cursor: `cursor-pointer`

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Scale
- **Headings**: 
  - H1: `text-4xl font-bold` (36px)
  - H2: `text-2xl font-semibold` (24px)
  - H3: `text-xl font-semibold` (20px)

- **Body**:
  - Default: `text-base` (16px)
  - Small: `text-sm` (14px)
  - Tiny: `text-xs` (12px)

- **Line Height**:
  - Tight: `leading-tight` (1.25)
  - Normal: `leading-normal` (1.5)
  - Relaxed: `leading-relaxed` (1.625)

---

## Component Integration Points

### Expected Data Flow

#### Upload Widget
```typescript
interface UploadWidgetProps {
  onFileSelect: (file: File, instructions: string) => void;
  isProcessing: boolean;
}
```

#### Photo Feed
```typescript
interface PhotoResult {
  id: string;
  originalUrl: string;
  fixedUrl: string;
  timestamp: Date;
  status: 'processing' | 'complete' | 'error';
  processingStep?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}
```

### API Call Pattern
```typescript
// Expected flow
1. User selects file in UploadWidget
2. onFileSelect callback fires with File and instructions
3. Parent component creates FormData and makes API call
4. During processing, show ProcessingCard in PhotoFeed
5. On completion, update to ResultCard with image URLs
6. User can toggle between original/fixed views
7. User can click "Animate >" to open video creation modal
```

### Error Handling
- Toast notifications for upload errors
- Error state in PhotoFeed with retry option
- File validation (type, size) before upload

### Loading States
- Processing card with animated progress
- Disabled submit button during processing
- Loading spinner in modal during video creation

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up color system in index.css
- [ ] Configure Tailwind with semantic tokens
- [ ] Add animation keyframes
- [ ] Test dark mode compatibility

### Phase 2: Header
- [ ] Create Header component
- [ ] Implement fixed positioning
- [ ] Add logo, credits display, user dropdown
- [ ] Style with proper spacing and backdrop blur

### Phase 3: Layout
- [ ] Create two-column container
- [ ] Set up fixed left column (350px)
- [ ] Set up scrollable right column
- [ ] Add responsive breakpoints

### Phase 4: Upload Widget
- [ ] Create UploadWidget component
- [ ] Implement drag-and-drop functionality
- [ ] Add paste-from-clipboard feature
- [ ] Style with holographic effect
- [ ] Add custom instructions textarea
- [ ] Wire up submit button

### Phase 5: Photo Feed
- [ ] Create ProcessingCard component
- [ ] Create ResultCard component
- [ ] Implement view toggle (original/fixed)
- [ ] Add action buttons (download, share)
- [ ] Style cards with animations
- [ ] Add "Animate >" button

### Phase 6: Animations & Polish
- [ ] Add entrance animations
- [ ] Implement hover effects
- [ ] Add transition smoothing
- [ ] Test all interactive states
- [ ] Optimize performance

### Phase 7: Integration
- [ ] Connect upload to API
- [ ] Handle processing states
- [ ] Display results in feed
- [ ] Add error handling
- [ ] Test complete user flow

---

## Key Design Principles to Preserve

1. **No Modal Workflow**: Everything happens in-page, no popups for main flow
2. **Holographic Aesthetic**: Upload widget has that signature holographic gradient
3. **Orange as Primary**: Consistent use of orange (#FF8000) for CTAs and accents
4. **Card-Based Results**: Each photo result is a contained card with its own controls
5. **Smooth Animations**: All state changes are animated smoothly
6. **Fixed Upload Widget**: Left panel stays in place while results scroll
7. **In-Card View Toggle**: Switch between original/fixed without leaving the card
8. **Responsive Design**: Gracefully adapts from desktop to mobile

---

## Common Pitfalls to Avoid

1. **Don't use direct colors**: Always use semantic tokens from the design system
2. **Don't create modals for main flow**: Keep upload and results in-page
3. **Don't mix color formats**: Everything should be HSL
4. **Don't ignore responsive design**: Test at all breakpoints
5. **Don't skip animations**: They're key to the premium feel
6. **Don't make upload widget scrollable**: It should be fixed on desktop
7. **Don't use white/black directly**: Use foreground/background tokens

---

## File Structure Reference

```
src/
├── components/
│   ├── Header.tsx              # Top navigation bar
│   ├── UploadWidget.tsx        # Left panel upload area
│   ├── PhotoFeed.tsx           # Right panel results area
│   ├── ProcessingCard.tsx      # Individual processing state card
│   ├── ResultCard.tsx          # Individual result card
│   └── AnimationModal.tsx      # Video creation modal
├── index.css                   # Design system tokens
└── pages/
    └── Index.tsx               # Main layout container
```

---

## Testing Checklist

- [ ] Upload via drag-and-drop works
- [ ] Upload via click works
- [ ] Upload via paste (Ctrl+V) works
- [ ] Custom instructions are included in submission
- [ ] Processing state displays correctly
- [ ] Result card shows both original and fixed images
- [ ] View toggle switches between original/fixed
- [ ] Download button works
- [ ] Share button works
- [ ] Animate button opens modal
- [ ] Video creation works in modal
- [ ] All animations are smooth
- [ ] All hover states work
- [ ] Responsive design works on mobile
- [ ] Dark mode looks correct
- [ ] Error states display properly

---

## Migration Strategy

### Recommended Approach: Component-by-Component

1. **Start with Header** (Easiest, least dependencies)
2. **Then Layout Structure** (Sets up the foundation)
3. **Then Upload Widget** (Core functionality)
4. **Then Photo Feed** (Most complex)
5. **Finally Animations & Polish** (Enhancement layer)

### Per-Component Migration Steps

For each component:
1. Review this specification for that component
2. Create/update the component file
3. Apply the specified styles using semantic tokens
4. Add the specified animations
5. Wire up the expected props/callbacks
6. Test interactivity and responsive behavior
7. Verify against the design checklist

---

## Support & Questions

When migrating, refer to:
- This document for design specifications
- The actual built components in this project for reference
- Tailwind CSS documentation for utility classes
- Radix UI documentation for component behavior

If something is unclear:
1. Check the built version in this project
2. Review the component's actual code
3. Test the interaction in this project's preview
4. Ask for clarification with specific questions

---

## Version History

- **v1.0** - Initial migration guide created with complete specifications