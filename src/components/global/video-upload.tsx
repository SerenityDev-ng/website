"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trash2, Upload, X } from "lucide-react";

interface VideoUploadProps {
  onUploadComplete: (urls: string[]) => void;
  folder?: string;
  className?: string;
  initialUrls?: string[];
  maxVideos?: number;
}

export function VideoUpload({
  onUploadComplete,
  folder = "videos",
  className = "",
  initialUrls = [],
  maxVideos = 4,
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [videoUrls, setVideoUrls] = useState<string[]>(initialUrls);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum
    if (videoUrls.length + files.length > maxVideos) {
      toast.error(`You can only upload up to ${maxVideos} videos`);
      return;
    }

    setIsUploading(true);
    const newProgressMap: Record<string, number> = {};
    const uploadedUrls: string[] = [];
    const fileArray = Array.from(files);

    try {
      // Process each file
      for (const file of fileArray) {
        // Validate file type
        if (!file.type.startsWith("video/")) {
          toast.error(`${file.name} is not a valid video file`);
          continue;
        }

        // Initialize progress for this file
        const fileId = `${file.name}-${Date.now()}`;
        newProgressMap[fileId] = 0;
        setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

        // Create form data for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "serenityweb"); // Replace with your upload preset
        formData.append("folder", folder);

        // Upload to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duojjwk8l/video/upload`, // Replace YOUR_CLOUD_NAME with your actual cloud name
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);

        // Update progress to 100% for this file
        setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }));
      }

      // Update state with new URLs
      const newUrls = [...videoUrls, ...uploadedUrls];
      setVideoUrls(newUrls);
      onUploadComplete(newUrls);
      toast.success(`${uploadedUrls.length} video(s) uploaded successfully`);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload video(s)");
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const removeVideo = (index: number) => {
    const newUrls = [...videoUrls];
    newUrls.splice(index, 1);
    setVideoUrls(newUrls);
    onUploadComplete(newUrls);
  };

  const simulateProgress = (fileId: string) => {
    // In a real implementation, you would get actual progress from the upload
    // This is a simulation for demonstration purposes
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        progress = 95; // We'll set it to 100 when the upload is actually complete
        clearInterval(interval);
      }
      setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
    }, 300);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Video preview section */}
        {videoUrls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoUrls.map((url, index) => (
              <div
                key={index}
                className="relative rounded-md border overflow-hidden"
              >
                <video
                  src={url}
                  controls
                  className="w-full h-auto max-h-[200px] object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={() => removeVideo(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Upload button and progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || videoUrls.length >= maxVideos}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Videos"}
            </Button>

            {videoUrls.length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="text-destructive border-destructive hover:bg-destructive/10"
                onClick={() => {
                  setVideoUrls([]);
                  onUploadComplete([]);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading || videoUrls.length >= maxVideos}
          />

          {/* Video count indicator */}
          <div className="text-sm text-muted-foreground">
            {videoUrls.length} of {maxVideos} videos
          </div>

          {/* Progress indicators */}
          {isUploading &&
            Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="space-y-1">
                <div className="text-xs text-muted-foreground">
                  Uploading... {Math.round(progress)}%
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
