import { Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

export type TipoAssinatura = 'TODOS' | 'ATIVOS' | 'CANCELADOS';

@Injectable()
export class ListarAssinaturasUseCase {
  constructor(private readonly assinaturaRepository: IAssinaturaRepository) {}

  async execute(tipo: TipoAssinatura): Promise<Assinatura[]> {
    const todas = await this.assinaturaRepository.findAll();
    if (tipo === 'ATIVOS') return todas.filter((a) => a.ativa);
    if (tipo === 'CANCELADOS') return todas.filter((a) => !a.ativa);
    return todas;
  }
}