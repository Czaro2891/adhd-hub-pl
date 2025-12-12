import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
// Ensure process.env.API_KEY is available in your environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const breakDownTask = async (taskDescription: string): Promise<string[]> => {
  if (!taskDescription.trim()) return [];

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Jesteś empatycznym asystentem dla osoby z ADHD. 
      Użytkownik czuje się przytłoczony zadaniem: "${taskDescription}".
      
      Twoim celem jest rozbicie tego zadania na bardzo małe, konkretne i łatwe do wykonania "mikro-kroki".
      Unikaj ogólników. Pierwszy krok powinien być banalnie prosty (np. "Wstań z krzesła").
      Liczba kroków: od 3 do 8.
      Język: Polski. Ton: wspierający, lekki, bez oceniania.
      
      Zwróć wynik jako czystą listę JSON stringów.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        },
        temperature: 0.7,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const steps = JSON.parse(jsonText);
    return Array.isArray(steps) ? steps : [];
    
  } catch (error) {
    console.error("Gemini breakdown error:", error);
    return [
      "Weź głęboki oddech.",
      "Przygotuj potrzebne rzeczy.",
      "Zrób pierwszą małą część zadania.",
      "Pochwal się za start!"
    ];
  }
};