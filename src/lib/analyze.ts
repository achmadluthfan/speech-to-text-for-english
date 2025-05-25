import { toast } from "react-hot-toast";
import type { AnalysisResult } from "@/types";

export const analyzeSpeech = async (
  audioUrl: string | null
): Promise<AnalysisResult> => {
  if (audioUrl) {
    try {
      // Fetch the audio data from the URL
      const response = await fetch(audioUrl);

      // Convert the response to a Blob object
      // A Blob (Binary Large Object) represents raw data that can be read as text or binary data
      const blob = await response.blob();

      const apiResponse = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "audio/webm",
        },
        body: blob,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await apiResponse.text();

      const chatCompletion = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: data }),
      });

      return {
        vocabulary: data,
        grammar: data,
      };
    } catch (error) {
      // console.error("Error analyzing speech:", error);
      toast("Failed to analyze speech");
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error analyzing speech:", errorMessage);
      return {
        vocabulary: null,
        grammar: null,
      };
    }
  } else {
    toast("hei 🐷 kauu");
    return {
      vocabulary: null,
      grammar: null,
    };
  }
};
