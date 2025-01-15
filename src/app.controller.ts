import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Status da API') // Categoria mais clara e relacionada
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar o status da API' }) // Resumo em português
  @ApiResponse({
    status: 200,
    description: 'A API está ativa e funcionando corretamente.',
  })
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
