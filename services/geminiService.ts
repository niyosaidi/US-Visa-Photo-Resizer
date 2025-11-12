
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const visaPhotoPrompt = `
You are an expert AI image editor. Your task is to transform this uploaded image into a photo that follows U.S. visa digital photo standards.

Follow these steps precisely:
1.  Detect the person’s face in the uploaded image.
2.  Crop the image to a perfect square (1:1 aspect ratio).
3.  Center the person's head both vertically and horizontally within this square frame.
4.  Ensure the head size (from the bottom of the chin to the top of the head) occupies between 50% and 70% of the total image height.
5.  Completely replace the existing background with a plain, evenly lit, uniform white or off-white background. There should be no shadows, patterns, or textures in the background.
6.  Adjust the lighting and color balance to be neutral and ensure natural skin tones. Remove harsh shadows on the face and neutralize any strong color casts.
7.  Preserve the person’s natural facial features. Do not apply any beautification, smoothing, or alterations to their appearance. The goal is a realistic, clear photo.
8.  Output a sharp, high-quality image.

Do not add any text, watermarks, or other artifacts to the image. The final output must be only the edited image.
`;


export const processVisaPhoto = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: visaPhotoPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    return null;

  } catch (error) {
    console.error("Error processing image with Gemini API:", error);
    throw new Error("Failed to communicate with the AI model. Please check your connection or API key.");
  }
};
