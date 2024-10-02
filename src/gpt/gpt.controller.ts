import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';

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
}
