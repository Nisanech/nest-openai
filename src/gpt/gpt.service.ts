import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  //   Solo va a llamar los casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase({ prompt: orthographyDto.prompt });
  }
}
