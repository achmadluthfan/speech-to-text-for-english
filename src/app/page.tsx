"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { RecordSection } from "@/components/RecordSection";
import { FeedbackSection } from "@/components/FeedBackSection";
import { useRecording } from "@/hooks/use-recording";
import { analyzeSpeech } from "@/lib/analyze";
import type { FeedbackOptions, AnalysisResult } from "@/types";

export default function SpeechAnalysisTool() {
  const [feedbackOptions, setFeedbackOptions] = useState<FeedbackOptions>({
    language: "english",
  });
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult>({
    // pronunciation: null,
    vocabulary: null,
    grammar: null,
    // fluency: null,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    isRecording,
    timer,
    audioUrl,
    // audioFile,
    start,
    pause,
    stop,
    // reset,
    setAudioFile,
  } = useRecording();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const results = await analyzeSpeech(audioUrl, feedbackOptions.language);
      setAnalysisResults(results);
      console.log("Analysis complete!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Speaking Analysis Tool
      </h1>
      <p className="text-gray-600 mb-8">
        Record your speech, upload an audio file, and get detailed feedback on
        your speaking skills
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record or Upload Section */}
        <RecordSection
          isRecording={isRecording}
          timer={timer}
          isActive={true}
          onStart={start}
          onPause={pause}
          onStop={stop}
          audioUrl={audioUrl}
          onFileUpload={setAudioFile}
        />

        {/* Get Feedback Section */}
        <div className="md:row-span-1">
          <FeedbackSection
            feedbackOptions={feedbackOptions}
            isActive={true}
            onFeedbackOptionsChange={setFeedbackOptions}
            onAnalyze={handleAnalyze}
            analysisResults={analysisResults}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </div>
    </div>
  );
}
