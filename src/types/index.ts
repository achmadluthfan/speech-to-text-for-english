export interface RecordingState {
  isRecording: boolean;
  timer: string;
  transcript: string;
}

export interface FeedbackOptions {
  language: "english" | "indonesia";
}

interface SuggestionItem {
  // word: string;
  // suggestion: string;
  explanation: string;
}

export interface AnalysisResult {
  // pronunciation: string | null;
  vocabulary: SuggestionItem[] | null;
  grammar: SuggestionItem[] | null;
  // fluency: string | null;
}
