import { Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

@Injectable()
export class ListarAssinaturasClienteUseCase {
  constructor(private readonly assinaturaRepository: IAssinaturaRepository) {}

  async execute(codCli: number): Promise<Assinatura[]> {
    return this.assinaturaRepository.findByCliente(codCli);
  }
}