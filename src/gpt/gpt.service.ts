import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';

import { Injectable, NotFoundException } from '@nestjs/common';

import OpenAI from 'openai';

import {
  orthographyUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  TextToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  //   Solo va a llamar los casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }

  async translate({ prompt, language }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, language });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await TextToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      `../../generated/audios/`,
      `${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }
}
