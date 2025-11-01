
import { GoogleGenAI } from "@google/genai";
import { Employee } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generatePerformanceReview = async (employee: Employee, notes: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
    You are an expert HR manager. Generate a concise, professional, and constructive performance review summary for the following employee.
    The tone should be encouraging and balanced, highlighting both strengths and areas for improvement based on the provided notes.
    The output should be in well-formatted markdown.

    Employee Details:
    - Name: ${employee.name}
    - Role: ${employee.role}
    - Department: ${employee.department}

    Performance Notes:
    """
    ${notes}
    """

    Generate the performance review summary:
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating performance review:", error);
    throw new Error("Failed to generate AI summary. Please check your API key and network connection.");
  }
};
