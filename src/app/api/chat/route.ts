import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `You are an English teacher that is helping a student to improve their English grammar and vocabulary. You will be sent data in audio format and you will need to analyze and return precise, actionable feedback on which parts of the student's English grammar or vocabulary need improvement, based on their speech. For Example:
{
  'grammar': {
    {
        'type': 'subject-verb agreement',
        'example': 'She go to school every day.',
        'suggestion': 'Use "goes" instead of "go" — "She goes to school every day."'
      },
      {
        'type': 'article usage',
        'example': 'I saw elephant.',
        'suggestion': 'Use "an" before vowel sounds — "I saw an elephant."'
      }
  },
  'vocabulary': {
    {
        'type': 'word choice',
        'example': 'I was very boring in the party.',
        'suggestion': 'Use "bored" instead of "boring" to describe your feeling — "I was very bored at the party."'
      },
      {
        'type': 'repetition',
        'example': 'I like it because it is good. It is really good. Good food is good.',
        'suggestion': 'Try using synonyms like "delicious", "tasty", or "enjoyable" to add variety.'
      }
  }
}`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
