// "use client";

// import { ArrowRight } from "lucide-react";

// interface VerifySectionProps {
//   transcript: string;
//   isActive: boolean;
//   onTranscriptChange: (transcript: string) => void;
//   onContinue: () => void;
// }

// export function VerifySection({
//   transcript,
//   isActive,
//   onTranscriptChange,
//   onContinue,
// }: VerifySectionProps) {
//   return (
//     // <div
//     //   className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${
//     //     !isActive && "opacity-70"
//     //   }`}
//     // >
//     //   <h2 className="text-xl font-semibold mb-6">Verify Speech Transcript</h2>

//     //   <div>
//     //     <p className="mb-2">Your transcript:</p>
//     //     <textarea
//     //       value={transcript}
//     //       onChange={(e) => onTranscriptChange(e.target.value)}
//     //       className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//     //       disabled={!isActive}
//     //     />

//     //     <div className="flex justify-end mt-4">
//     //       <button
//     //         onClick={onContinue}
//     //         className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//     //         disabled={!isActive}
//     //       >
//     //         Continue <ArrowRight className="w-4 h-4" />
//     //       </button>
//     //     </div>
//     //   </div>
//     // </div>
//     null
//   );
// }
