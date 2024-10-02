import OpenAI from 'openai';

interface Options {
  prompt: string;
  language: string;
}

export const translateUseCase = async (openai: OpenAI, { prompt, language }: Options ) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${language}: ${prompt}`
      }
    ],
    model: 'gpt-4o',
    temperature: 0.2
  })

  return { message: response.choices[0].message.content }
}