import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserStreamUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Se de dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe ser en formato markdown, los pros y contras deben de estar en una lista.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.8,
    max_tokens: 500,
    stream: true,
  });
};
