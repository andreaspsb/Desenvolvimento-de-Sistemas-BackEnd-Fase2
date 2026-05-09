import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaClienteRepository implements IClienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany();
    return clientes.map((c) => new Cliente(c.codigo, c.nome, c.email));
  }

  async findById(codigo: number): Promise<Cliente | null> {
    const c = await this.prisma.cliente.findUnique({ where: { codigo } });
    if (!c) return null;
    return new Cliente(c.codigo, c.nome, c.email);
  }
}