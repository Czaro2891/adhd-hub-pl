import { GoogleGenAI, Type } from "@google/genai";

let ai: any = null;
const getAI = () => {
  if (ai) return ai;
  if (typeof window !== 'undefined') {
    // Running in the browser — do NOT instantiate the server-side client here.
    // The Google GenAI client requires a secret API key and must run on a trusted server.
    return null;
  }
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai;
};

export const breakDownTask = async (taskDescription: string): Promise<string[]> => {
  if (!taskDescription.trim()) return [];

  try {
    const client = getAI();
    if (!client) {
      console.warn('Gemini client not available in browser — call the API from a server-side endpoint.');
      return [
        'Weź głęboki oddech.',
        'Przygotuj potrzebne rzeczy.',
        'Zrób pierwszą mała część zadania.',
      ];
    }

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

    const response = await client.models.generateContent({
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