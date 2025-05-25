import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = "";

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check content type
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("audio/")) {
      console.error("Invalid content type:", contentType);
      return new Response(
        JSON.stringify({
          error: "Invalid content type. Expected audio content.",
          received: contentType,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const audio = await request.blob();

    // Check if audio data is present and has size
    if (!audio || audio.size === 0) {
      console.error("No audio data received or empty audio file");
      return new Response(
        JSON.stringify({
          error: "No audio data received or empty audio file",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Audio details", {
      size: audio.size,
      type: audio.type,
    });

    const file = new File([audio], "audio.webm", { type: "audio/webm" });

    const transcriptions = await client.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "en",
      response_format: "text",
    });

    // Check if transcription is empty or invalid
    if (
      !transcriptions ||
      typeof transcriptions !== "string" ||
      transcriptions.trim().length === 0
    ) {
      console.error("Empty or invalid transcription received from OpenAI");
      return new Response(
        JSON.stringify({
          error: "Failed to generate transcription",
          details: "Empty or invalid transcription received",
        }),
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(transcriptions, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI API Error:", {
        status: error.status,
        message: error.message,
        code: error.code,
        type: error.type,
      });

      return new Response(
        JSON.stringify({
          error: "OpenAI API Error",
          details: error.message,
          code: error.code,
          type: error.type,
        }),
        {
          status: error.status || 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Handle general errors
    console.error("Transcription error:", error);
    return new Response(
      JSON.stringify({
        error: "Transcription failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
