import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ProxyService } from './proxy.service';

@Module({
  controllers: [GatewayController],
  providers: [
    ProxyService,
    {
      provide: 'GESTAO_URL',
      useValue: process.env.GESTAO_URL ?? 'http://localhost:3001',
    },
    {
      provide: 'FATURAMENTO_URL',
      useValue: process.env.FATURAMENTO_URL ?? 'http://localhost:3002',
    },
    {
      provide: 'PLANOS_ATIVOS_URL',
      useValue: process.env.PLANOS_ATIVOS_URL ?? 'http://localhost:3003',
    },
  ],
})
export class AppModule {}