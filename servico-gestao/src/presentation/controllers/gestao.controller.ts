import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ListarAssinaturasUseCase, TipoAssinatura } from '../../application/use-cases/listar-assinaturas.use-case';
import { ListarAssinaturasClienteUseCase } from '../../application/use-cases/listar-assinaturas-cliente.use-case';
import { ListarAssinaturasPlanoUseCase } from '../../application/use-cases/listar-assinaturas-plano.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';
import { ListarPlanosUseCase } from '../../application/use-cases/listar-planos.use-case';
import { AtualizarCustoPlanoUseCase } from '../../application/use-cases/atualizar-custo-plano.use-case';
import { VerificarAssinaturaAtivaUseCase } from '../../application/use-cases/verificar-assinatura-ativa.use-case';

@Controller('gestao')
export class GestaoController {
  constructor(
    private readonly listarClientes: ListarClientesUseCase,
    private readonly listarPlanos: ListarPlanosUseCase,
    private readonly criarAssinatura: CriarAssinaturaUseCase,
    private readonly atualizarCustoPlano: AtualizarCustoPlanoUseCase,
    private readonly listarAssinaturas: ListarAssinaturasUseCase,
    private readonly listarAssinaturasCliente: ListarAssinaturasClienteUseCase,
    private readonly listarAssinaturasPlano: ListarAssinaturasPlanoUseCase,
    private readonly verificarAssinaturaAtiva: VerificarAssinaturaAtivaUseCase,
  ) {}

  @Get('clientes')
  getClientes() {
    return this.listarClientes.execute();
  }

  @Get('planos')
  getPlanos() {
    return this.listarPlanos.execute();
  }

  @Post('assinaturas')
  postAssinatura(@Body() body: { codPlano: number; codCli: number }) {
    return this.criarAssinatura.execute(body.codPlano, body.codCli);
  }

  @Patch('planos/:idPlano')
  patchPlano(
    @Param('idPlano') idPlano: string,
    @Body() body: { custoMensal: number },
  ) {
    return this.atualizarCustoPlano.execute(Number(idPlano), body.custoMensal);
  }

  @Get('assinaturas/:tipo')
  getAssinaturas(@Param('tipo') tipo: string) {
    return this.listarAssinaturas.execute(tipo.toUpperCase() as TipoAssinatura);
  }

  @Get('assinaturascliente/:codcli')
  getAssinaturasCliente(@Param('codcli') codcli: string) {
    return this.listarAssinaturasCliente.execute(Number(codcli));
  }

  @Get('assinaturasplano/:codplano')
  getAssinaturasPlano(@Param('codplano') codplano: string) {
    return this.listarAssinaturasPlano.execute(Number(codplano));
  }

  @Get('assinatura/:codass/status')
  getAssinaturaStatus(@Param('codass') codass: string) {
    return this.verificarAssinaturaAtiva.execute(Number(codass));
  }
}