
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileVideo, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import VideoPlayer from './VideoPlayer';

interface VideoUploadProps {
  onVideoUploaded: (url: string) => void;
  currentVideo?: string;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUploaded, currentVideo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [video, setVideo] = useState<string | undefined>(currentVideo);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processVideo(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processVideo(file);
    }
  };

  const processVideo = (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Create a local object URL for the video
    const url = URL.createObjectURL(file);
    setVideo(url);
    onVideoUploaded(url);
    setLoading(false);
    
    toast({
      title: "Video uploaded",
      description: "Your video has been added to the process chart."
    });
  };

  const handleRemoveVideo = () => {
    setVideo(undefined);
    onVideoUploaded('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm transition-all duration-300">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-lg">Process Video</h3>
      </div>
      
      {!video ? (
        <div 
          className={cn(
            "flex flex-col items-center justify-center p-12 transition-colors duration-300 cursor-pointer min-h-[300px]",
            isDragging ? "bg-primary/5" : "bg-secondary/50 hover:bg-secondary/80"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <FileVideo className="w-16 h-16 text-primary/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            {loading ? "Processing video..." : "Add video file"}
          </p>
          <p className="text-sm text-muted-foreground/80 mt-2">
            Click or drag & drop to upload
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 button-hover"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            Select Video
          </Button>
          <input 
            type="file" 
            ref={inputRef} 
            className="hidden" 
            accept="video/*" 
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="relative">
          <VideoPlayer videoUrl={video} />
          <Button 
            size="icon" 
            variant="outline" 
            className="absolute top-2 right-2 rounded-full bg-white/80 z-10" 
            onClick={handleRemoveVideo}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
