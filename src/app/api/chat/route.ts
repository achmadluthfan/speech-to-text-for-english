import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, output_language } = await request.json();

    const prompt = `You are an English teacher helping a student improve their spoken English skills, focusing on grammar and vocabulary.

    You will receive a text in English that represents a spoken utterance from the student. Your task is to return a JSON-formatted response that analyzes the student's grammar and vocabulary. Provide clear and actionable suggestions for improvement, along with corrected examples. Your response must adapt based on the value of the output_language variable as follows:

    - If output_language is set to "english", all suggestions and explanations must be in English.
    - If output_language is set to "indonesia", all suggestions and explanations must be translated into Indonesian.

    The response must follow this JSON structure:
    {
       "output_language": ${output_language},
      "grammar": [
        {
           "explanation": "<explanation of the suggestion>"
        }
      ],
      "vocabulary": [
        {
          "explanation": "<explanation of the suggestion>"
        }
      ]
    }`;

    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
      response_format: { type: "json_object" },
    });

    return new Response(chatCompletion.choices[0].message.content, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
