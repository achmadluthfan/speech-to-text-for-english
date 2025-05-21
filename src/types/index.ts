export interface RecordingState {
  isRecording: boolean;
  timer: string;
  transcript: string;
}

export interface FeedbackOptions {
  language: "english" | "indonesian";
}

export interface AnalysisResult {
  pronunciation: string | null;
  vocabulary: string | null;
  grammar: string | null;
  fluency: string | null;
}
