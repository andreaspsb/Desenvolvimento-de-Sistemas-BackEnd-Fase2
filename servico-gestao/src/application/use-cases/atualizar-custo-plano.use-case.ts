import { Injectable, NotFoundException } from '@nestjs/common';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { Plano } from '../../domain/entities/plano.entity';

@Injectable()
export class AtualizarCustoPlanoUseCase {
  constructor(private readonly planoRepository: IPlanoRepository) {}

  async execute(codigo: number, custoMensal: number): Promise<Plano> {
    const plano = await this.planoRepository.findById(codigo);
    if (!plano) throw new NotFoundException(`Plano ${codigo} não encontrado`);

    return this.planoRepository.updateCustoMensal(codigo, custoMensal);
  }
}