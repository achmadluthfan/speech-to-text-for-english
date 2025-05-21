"use client";

import type React from "react";

// import { useState, useRef } from "react";
import { useState } from "react";
// import { Mic, Upload, Pause, Square, AlertCircle, Play } from "lucide-react";
import { Mic, Pause, Square, AlertCircle, Play } from "lucide-react";

interface RecordSectionProps {
  isRecording: boolean;
  timer: string;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  audioUrl?: string | null;
  onFileUpload: (file: File) => void;
}

export function RecordSection({
  isRecording,
  timer,
  isActive,
  onStart,
  onPause,
  onStop,
  audioUrl,
}: // onFileUpload,
RecordSectionProps) {
  const [permissionError, setPermissionError] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartClick = async () => {
    if (isRecording) {
      onPause();
    } else {
      try {
        setPermissionError(null);
        onStart();
      } catch (error) {
        console.error("Error starting recording:", error);
        setPermissionError(
          error instanceof DOMException && error.name === "NotAllowedError"
            ? "Microphone access was denied. Please allow microphone access in your browser settings."
            : "Could not access microphone. Please check your device connections."
        );
      }
    }
  };

  const handlePausePlayClick = () => {
    if (isPaused) {
      // Resume recording
      setIsPaused(false);
      onStart(); // This will resume the recording
    } else {
      // Pause recording
      setIsPaused(true);
      onPause(); // This will pause the recording
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     if (file.type.startsWith("audio/")) {
  //       onFileUpload(file);
  //     } else {
  //       alert("Please select an audio file (.mp3, .wav, etc.)");
  //     }
  //   }
  // };

  // const handleBrowseClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = () => {
  //   setIsDragging(false);
  // };

  // const handleDrop = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   const files = e.dataTransfer.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     if (file.type.startsWith("audio/")) {
  //       onFileUpload(file);
  //     } else {
  //       alert("Please drop an audio file (.mp3, .wav, etc.)");
  //     }
  //   }
  // };

  const handleStopClick = () => {
    // Reset pause state when stopping
    setIsPaused(false);
    onStop();
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border h-fit border-gray-200 ${
        !isActive && "opacity-70"
      }`}
    >
      <h2 className="text-xl font-semibold mb-6">
        Record or Upload Your Speaking
      </h2>

      <div className="flex flex-col items-center">
        <button
          onClick={handleStartClick}
          className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center mb-4 hover:bg-red-600 transition-colors"
          disabled={!isActive || (isRecording && !isPaused)}
        >
          <Mic className="w-10 h-10 text-white" />
        </button>

        <div className="text-2xl font-mono mb-2">{timer}</div>

        {permissionError && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 text-red-700 rounded-md border border-red-200 max-w-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{permissionError}</p>
          </div>
        )}

        {/* Time restriction indicator */}
        <div className="w-full max-w-xs mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0:00</span>
            <span className="font-medium text-red-500">Max: 5:00</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            {/* Calculate progress based on timer (assuming format is "MM:SS") */}
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${Math.min(
                  ((Number.parseInt(timer.split(":")[0]) * 60 +
                    Number.parseInt(timer.split(":")[1])) /
                    300) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={handlePausePlayClick}
            className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
              isPaused
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={!isRecording || !isActive}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" /> Play
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            )}
          </button>
          <button
            onClick={handleStopClick}
            className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            disabled={(!isRecording && timer === "00:00") || !isActive}
          >
            <Square className="w-4 h-4" /> Stop
          </button>
        </div>

        {/* Audio Preview */}
        {audioUrl && (
          <div className="w-full max-w-md mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Audio Preview</h3>
            <audio className="w-full" controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* <div className="w-full text-center text-gray-500 mb-4">OR</div>

        <div
          className={`w-full border-2 border-dashed ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } rounded-lg p-8 flex flex-col items-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-600 mb-2">Drop audio file here</p>
          <p className="text-xs text-gray-500 mb-4">
            Maximum duration: 5 minutes
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={handleBrowseClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={!isActive}
          >
            Browse Files
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: .mp3, .wav
          </p>
        </div> */}
      </div>
    </div>
  );
}
