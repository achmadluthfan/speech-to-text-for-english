"use client";

import { Volume2, BookOpen, Type, Clock } from "lucide-react";
import type { FeedbackOptions, AnalysisResult } from "@/types";

interface FeedbackSectionProps {
  feedbackOptions: FeedbackOptions;
  isActive: boolean;
  onFeedbackOptionsChange: (options: FeedbackOptions) => void;
  onAnalyze: () => void;
  analysisResults: AnalysisResult;
  isAnalyzing: boolean;
}

export function FeedbackSection({
  feedbackOptions,
  isActive,
  onFeedbackOptionsChange,
  onAnalyze,
  analysisResults,
  isAnalyzing,
}: FeedbackSectionProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full ${
        !isActive && "opacity-70"
      }`}
    >
      <h2 className="text-xl font-semibold mb-6">
        Get Feedback on Your Speaking
      </h2>

      <div>
        <p className="mb-2">Select feedback language:</p>
        <div className="flex flex-col gap-2 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="language"
              value="english"
              checked={feedbackOptions.language === "english"}
              onChange={() =>
                onFeedbackOptionsChange({
                  ...feedbackOptions,
                  language: "english",
                })
              }
              className="w-4 h-4 text-blue-600"
              disabled={!isActive || isAnalyzing}
            />
            English
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="language"
              value="indonesia"
              checked={feedbackOptions.language === "indonesia"}
              onChange={() =>
                onFeedbackOptionsChange({
                  ...feedbackOptions,
                  language: "indonesia",
                })
              }
              className="w-4 h-4 text-blue-600"
              disabled={!isActive || isAnalyzing}
            />
            Indonesian
          </label>
        </div>

        <button
          onClick={onAnalyze}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-6 flex justify-center items-center"
          disabled={!isActive || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            "Analyze My Speaking"
          )}
        </button>

        <div>
          <p className="font-semibold mb-4">Analysis Results:</p>

          <div className="space-y-4">
            {/* <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Pronunciation</span>
              </div>
              <p className="text-gray-600">
                {analysisResults.pronunciation ||
                  'No data yet. Click "Analyze My Speaking" to get feedback.'}
              </p>
            </div> */}

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span className="font-medium">Vocabulary</span>
              </div>
              <p className="text-gray-600">
                {analysisResults.vocabulary ||
                  'No data yet. Click "Analyze My Speaking" to get feedback.'}
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Grammar</span>
              </div>
              {/* <p className="text-gray-600">
                {analysisResults.grammar.map(value => {
                  return
                }) ||
                  'No data yet. Click "Analyze My Speaking" to get feedback.'}
              </p> */}
            </div>

            {/* <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Fluency</span>
              </div>
              <p className="text-gray-600">
                {analysisResults.fluency ||
                  'No data yet. Click "Analyze My Speaking" to get feedback.'}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
