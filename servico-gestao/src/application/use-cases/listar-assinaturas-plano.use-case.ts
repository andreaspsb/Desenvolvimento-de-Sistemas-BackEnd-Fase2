import { Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

@Injectable()
export class ListarAssinaturasPlanoUseCase {
  constructor(private readonly assinaturaRepository: IAssinaturaRepository) {}

  async execute(codPlano: number): Promise<Assinatura[]> {
    return this.assinaturaRepository.findByPlano(codPlano);
  }
}