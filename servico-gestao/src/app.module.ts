import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaPlanoRepository } from './infrastructure/repositories/prisma-plano.repository';
import { PrismaClienteRepository } from './infrastructure/repositories/prisma-cliente.repository';
import { PrismaAssinaturaRepository } from './infrastructure/repositories/prisma-assinatura.repository';
import { IPlanoRepository } from './domain/repositories/plano.repository';
import { IClienteRepository } from './domain/repositories/cliente.repository';
import { IAssinaturaRepository } from './domain/repositories/assinatura.repository';
import { ListarPlanosUseCase } from './application/use-cases/listar-planos.use-case';
import { ListarClientesUseCase } from './application/use-cases/listar-clientes.use-case';
import { CriarAssinaturaUseCase } from './application/use-cases/criar-assinatura.use-case';
import { AtualizarCustoPlanoUseCase } from './application/use-cases/atualizar-custo-plano.use-case';
import { ListarAssinaturasUseCase } from './application/use-cases/listar-assinaturas.use-case';
import { ListarAssinaturasClienteUseCase } from './application/use-cases/listar-assinaturas-cliente.use-case';
import { ListarAssinaturasPlanoUseCase } from './application/use-cases/listar-assinaturas-plano.use-case';
import { GestaoController } from './presentation/controllers/gestao.controller';
import { VerificarAssinaturaAtivaUseCase } from './application/use-cases/verificar-assinatura-ativa.use-case';
import { RegistrarPagamentoAssinaturaUseCase } from './application/use-cases/registrar-pagamento-assinatura.use-case';
import { RabbitmqPagamentoConsumer } from './infrastructure/events/rabbitmq-pagamento.consumer';

@Module({
  controllers: [GestaoController],
  providers: [
    PrismaService,
    { provide: IPlanoRepository, useClass: PrismaPlanoRepository },
    { provide: IClienteRepository, useClass: PrismaClienteRepository },
    { provide: IAssinaturaRepository, useClass: PrismaAssinaturaRepository },
    ListarPlanosUseCase,
    ListarClientesUseCase,
    CriarAssinaturaUseCase,
    AtualizarCustoPlanoUseCase,
    ListarAssinaturasUseCase,
    ListarAssinaturasClienteUseCase,
    ListarAssinaturasPlanoUseCase,
    VerificarAssinaturaAtivaUseCase,
    RegistrarPagamentoAssinaturaUseCase,
    RabbitmqPagamentoConsumer,
  ],
})
export class AppModule {}