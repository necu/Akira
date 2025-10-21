import { GoogleGenAI } from "@google/genai";

export const getGameGuide = async (game: string, topic: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Actúa como un experto estratega de videojuegos de talla mundial, con un profundo conocimiento del juego "${game}". Eres conocido por crear las guías más claras, concisas y efectivas.
  
  Tu tarea es generar una guía sobre el siguiente tema: "${topic}".
  
  Por favor, estructura tu respuesta de forma profesional, usando:
  - Un título claro y llamativo.
  - Párrafos cortos y directos.
  - Listas con viñetas o numeradas para los pasos o consejos clave.
  - **Negrita** para resaltar conceptos importantes.
  
  La guía debe ser práctica y accionable para un jugador que busca mejorar. Evita el relleno y ve directo al grano.
  
  Guía para "${game}" sobre "${topic}":`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching game guide from Gemini:", error);
    throw new Error("No se pudo generar la guía desde la IA. Inténtalo de nuevo.");
  }
};
