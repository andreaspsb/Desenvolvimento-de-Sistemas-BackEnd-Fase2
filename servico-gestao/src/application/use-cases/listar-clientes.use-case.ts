import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ListarClientesUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }
}