import { toast } from "react-hot-toast";
import type { AnalysisResult } from "@/types";

export const analyzeSpeech = async (
  audioUrl: string | null
  // audioFile: File | null
): Promise<AnalysisResult> => {
  if (audioUrl) {
    // Fetch the audio data from the URL
    const response = await fetch(audioUrl);

    // Convert the response to a Blob object
    // A Blob represents raw data that can be read as text or binary data
    const blob = await response.blob();

    const apiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "audio/webm",
      },
      body: blob,
    });

    const data = await apiResponse.json();
    console.log("data", data);
  } else {
    toast("hei 🐷 kauu");
    return {
      pronunciation: null,
      vocabulary: null,
      grammar: null,
      fluency: null,
    };
  }

  try {
    // In a real app, you would send the audio to your API here
    console.log("Sending audio to API for analysis...");

    const response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({ audioUrl }),
    });

    const data = await response.json();

    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate API response
    return {
      pronunciation:
        "Good pronunciation with some areas for improvement. Work on the 'th' sound.",
      vocabulary:
        "Intermediate level vocabulary. Consider using more varied expressions.",
      grammar:
        "Good sentence structure. Minor errors in verb tense consistency.",
      fluency: "Good pace and rhythm. Some hesitations noted.",
    };
  } catch (error) {
    console.error("Error analyzing audio:", error);
    throw new Error(
      "An error occurred while analyzing your speech. Please try again."
    );
  }
};
