"use client";

import { useState, useRef, useCallback } from "react";

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const start = useCallback(async () => {
    try {
      // Reset any previous recording
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create media recorder
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      // Set up event handlers
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        // const sizeInBytes = audioBlob.size;
        // const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        // const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        // console.log("Audio Blob Size:", {
        //   bytes: sizeInBytes,
        //   kilobytes: `${sizeInKB} KB`,
        //   megabytes: `${sizeInMB} MB`,
        // });

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Stop all tracks in the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      // Start recording
      recorder.start();
      setIsRecording(true);

      // Start timer
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - (startTimeRef.current || 0);
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        setTimer(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );

        // Auto-stop after 5 minutes
        if (minutes >= 5) {
          stop();
        }
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert(
        "Could not access microphone. Please check your browser permissions."
      );
    }
  }, [audioUrl]);

  const pause = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
    }

    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimer("00:00");
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioFile(null);
  }, [stop, audioUrl]);

  const handleFileUpload = useCallback(
    (file: File) => {
      // Clear any previous recording
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      // Create URL for the uploaded file
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioFile(file);

      // Reset recording state
      setIsRecording(false);
      setTimer("00:00");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    },
    [audioUrl]
  );

  return {
    isRecording,
    timer,
    audioUrl,
    audioFile,
    start,
    pause,
    stop,
    reset,
    setAudioFile: handleFileUpload,
  };
}
