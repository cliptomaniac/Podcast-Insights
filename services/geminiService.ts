
import { GoogleGenAI, Type } from "@google/genai";
import { type InsightsOutput } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const insightsSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A plausible title for the video podcast.",
    },
    summary: {
      type: Type.STRING,
      description: "A 3-5 sentence summary of the imagined video's key ideas.",
    },
    actionPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of 5 clear, concise, and motivational action steps aligned with the user's goal.",
    },
    reflectionQuestion: {
      type: Type.STRING,
      description: "A single, powerful reflection question to encourage immediate action."
    }
  },
  required: ["title", "summary", "actionPoints", "reflectionQuestion"]
};

export const generateInsights = async (youtubeUrl: string, userGoal: string): Promise<InsightsOutput> => {
  const prompt = `
    You are an AI assistant that excels at distilling wisdom from video content and turning it into actionable advice.
    The user has provided a YouTube URL and a personal goal. Your task is to analyze the hypothetical content of the video and generate insights aligned with their goal.

    **Constraint:** You cannot access external websites or YouTube. Therefore, you must *infer* the topic of the video based on a typical podcast found at a URL like this and generate a plausible summary and key takeaways related to that topic.

    **User Inputs:**
    - YouTube URL: "${youtubeUrl}"
    - User's Goal: "${userGoal}"

    **Your Task:**
    1. **Create a Plausible Title:** Generate a fitting title for the imagined video.
    2. **Summarize Key Ideas:** Write a 3-5 sentence overview of the video's imagined key concepts.
    3. **Identify 5 Valuable Takeaways:** Extract the 5 most valuable ideas from this imagined content.
    4. **Create Actionable Steps:** For each takeaway, rewrite it as a clear, concise, and motivational action step that directly helps the user achieve their goal: "${userGoal}".
    5. **Write a Reflection Question:** Conclude with a single, powerful reflection question to spur immediate action.

    **Output Format:** You MUST provide the response as a single JSON object matching the defined schema. Do not include any text, markdown formatting, or 'json' wrappers outside of the JSON object itself.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: insightsSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Basic validation
    if (!parsedJson.title || !parsedJson.summary || !Array.isArray(parsedJson.actionPoints) || !parsedJson.reflectionQuestion) {
        throw new Error("Received malformed data from API.");
    }
    
    return parsedJson as InsightsOutput;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('json')) {
        throw new Error("Failed to get a valid response from the AI. It may be having trouble with the request. Please try rephrasing your goal.");
    }
    throw new Error("Could not generate insights. Please check your connection and try again.");
  }
};
