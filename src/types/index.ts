export interface RecordingState {
  isRecording: boolean;
  timer: string;
  transcript: string;
}

export interface FeedbackOptions {
  language: "english" | "indonesia";
}

interface SuggestionItem {
  suggestion: string;
  word: string;
}

export interface AnalysisResult {
  // pronunciation: string | null;
  vocabulary: SuggestionItem[] | null;
  grammar: SuggestionItem[] | null;
  // fluency: string | null;
}
