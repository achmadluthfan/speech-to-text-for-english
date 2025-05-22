import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const prompt = `You are an English teacher that is helping a student to improve their English grammar and vocabulary. You will be sent data in audio format and you will need to analyze and return precise, actionable feedback on which parts of the student's English grammar or vocabulary need improvement, based on their speech. For Example:
// {
//   'grammar': {
//     {
//         'type': 'subject-verb agreement',
//         'example': 'She go to school every day.',
//         'suggestion': 'Use "goes" instead of "go" — "She goes to school every day."'
//       },
//       {
//         'type': 'article usage',
//         'example': 'I saw elephant.',
//         'suggestion': 'Use "an" before vowel sounds — "I saw an elephant."'
//       }
//   },
//   'vocabulary': {
//     {
//         'type': 'word choice',
//         'example': 'I was very boring in the party.',
//         'suggestion': 'Use "bored" instead of "boring" to describe your feeling — "I was very bored at the party."'
//       },
//       {
//         'type': 'repetition',
//         'example': 'I like it because it is good. It is really good. Good food is good.',
//         'suggestion': 'Try using synonyms like "delicious", "tasty", or "enjoyable" to add variety.'
//       }
//   }
// }`;

const prompt = "";

export async function POST(request: Request) {
  const audio = await request.blob();
  const file = new File([audio], "audio.webm", { type: "audio/webm" });
  // console.log("file", file);

  const transcriptions = await client.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    language: "en",
    response_format: "verbose_json",
    // prompt: prompt,
  });

  console.log("data type", typeof transcriptions);
  console.log("transcriptions", transcriptions);
  console.log(
    "transcriptions.segments.tokens[0]",
    transcriptions.segments?.[0].tokens
  );
  console.log(
    "transcriptions.segments.tokens[1]",
    transcriptions.segments?.[1].tokens
  );
}
