import { Injectable } from '@nestjs/common';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { Plano } from '../../domain/entities/plano.entity';

@Injectable()
export class ListarPlanosUseCase {
  constructor(private readonly planoRepository: IPlanoRepository) {}

  async execute(): Promise<Plano[]> {
    return this.planoRepository.findAll();
  }
}