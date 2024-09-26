import * as process from 'node:process';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (options: Options) => {
  const { prompt } = options;

  return {
    prompt: prompt,
    apikey: process.env.OPENAI_API_KEY,
  };
};
