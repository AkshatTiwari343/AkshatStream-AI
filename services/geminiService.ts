
import { GoogleGenAI, Type } from "@google/genai";
import { Video } from "../types";

/**
 * Generates a creative summary for a video using gemini-3-flash-preview.
 */
export const getSummarization = async (video: Video): Promise<string> => {
  // Always use a new instance with the current process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a creative and engaging summary for this video titled "${video.title}". 
                Description: ${video.description}. 
                The category is ${video.category}. 
                Imagine you are an expert film critic. Keep it under 150 words.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "Failed to generate AI insights.";
  }
};

/**
 * Generates a video using Veo 3.1 fast model.
 * Note: Users must have selected an API key via the AI Studio dialog for this to work.
 */
export const generateVideoWithVeo = async (
  prompt: string, 
  onStatusChange: (status: string) => void
): Promise<string> => {
  // Create a new GoogleGenAI instance right before making the API call to use the latest selected key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  onStatusChange("Initializing Veo Creative Engine...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onStatusChange("Crafting your cinematic masterpiece...");

    while (!operation.done) {
      // Use 10 second delay as recommended in the documentation
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      
      const progressSteps = [
        "Analyzing scene composition...",
        "Applying neural lighting...",
        "Rendering temporal consistency...",
        "Finalizing cinematic grade..."
      ];
      const randomStep = progressSteps[Math.floor(Math.random() * progressSteps.length)];
      onStatusChange(randomStep);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video URI returned from Veo");

    // Must append API key when fetching from the download link as per documentation
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Veo generation error:", error);
    throw error;
  }
};
