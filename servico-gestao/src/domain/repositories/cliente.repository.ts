import { Cliente } from '../entities/cliente.entity';

export abstract class IClienteRepository {
  abstract findAll(): Promise<Cliente[]>;
  abstract findById(codigo: number): Promise<Cliente | null>;
}