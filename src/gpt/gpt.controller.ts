import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express'
import { GptService } from './gpt.service';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConstDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(prosConstDiscusserDto)
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConstDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConstDiscusserDto)

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK)

    for await(const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';

      res.write(piece)
    }

    res.end()
  }

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translate(translateDto)
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto)

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Param('fileId') fileId: string,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileId)

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }
}
