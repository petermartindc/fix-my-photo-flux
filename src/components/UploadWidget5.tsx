import React, { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface UploadWidgetProps {
  onFileSelect: (file: File, instructions?: string) => void;
  isProcessing?: boolean;
}

const UploadWidget5 = ({ onFileSelect, isProcessing }: UploadWidgetProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [instructions, setInstructions] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setInstructions("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileSelect(selectedFile, instructions);
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    }
  }, [handleFileSelect]);

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return (
    <div className="space-y-4">
      <div
        className={`upload-widget-holographic p-4 text-center cursor-pointer min-h-[200px] flex items-center justify-center ${
          isDragOver ? "drag-over" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full">
            <div className="w-full h-40 bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full hover:bg-white hover:text-black transition-colors border border-white/20 hover:border-white"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Drop your photo here</p>
              <p className="text-xs text-muted-foreground">
                Drag & drop, click, or paste
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Custom Instructions</label>
          <div className="relative group">
            <div className="h-4 w-4 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs cursor-help">
              i
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64 text-left leading-relaxed">
              • "Remove background"<br/>
              • "Fix lighting"<br/>
              • "Remove person in red shirt"<br/>
              • "Make colors more vibrant"
            </div>
          </div>
        </div>
        <Textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="(optional)"
          className="min-h-[85px] resize-none text-sm bg-background-secondary placeholder:text-muted-foreground/40 placeholder:font-light"
        />
      </div>

      <div className="space-y-2">
        <Button
          onClick={handleSubmit}
          disabled={!selectedFile || isProcessing}
          className="w-full btn-primary"
        >
          {isProcessing ? "Processing..." : (
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="h-4 w-4" />
              <span>Fix My Photo</span>
            </div>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">1 credit</p>
      </div>
    </div>
  );
};

export default UploadWidget5;