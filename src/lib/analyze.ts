import { toast } from "react-hot-toast";
import type { AnalysisResult } from "@/types";

export const analyzeSpeech = async (
  audioUrl: string | null
): Promise<AnalysisResult> => {
  if (audioUrl) {
    // Fetch the audio data from the URL
    const response = await fetch(audioUrl);

    // Convert the response to a Blob object
    // A Blob (Binary Large Object) represents raw data that can be read as text or binary data
    const blob = await response.blob();

    const apiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "audio/webm",
      },
      body: blob,
    });

    const data = await apiResponse.text();

    console.log("response", data);

    return {
      vocabulary: data,
      grammar: data,
    };
  } else {
    toast("hei 🐷 kauu");
    return {
      vocabulary: null,
      grammar: null,
    };
  }
};
