import { Injectable, NotFoundException } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { IClienteRepository } from '../../domain/repositories/cliente.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

@Injectable()
export class CriarAssinaturaUseCase {
  constructor(
    private readonly assinaturaRepository: IAssinaturaRepository,
    private readonly planoRepository: IPlanoRepository,
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(codPlano: number, codCli: number): Promise<Assinatura> {
    const plano = await this.planoRepository.findById(codPlano);
    if (!plano) throw new NotFoundException(`Plano ${codPlano} não encontrado`);

    const cliente = await this.clienteRepository.findById(codCli);
    if (!cliente) throw new NotFoundException(`Cliente ${codCli} não encontrado`);

    return this.assinaturaRepository.create(codPlano, codCli);
  }
}