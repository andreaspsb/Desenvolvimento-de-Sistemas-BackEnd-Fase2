import { Injectable } from '@nestjs/common';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { Plano } from '../../domain/entities/plano.entity';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaPlanoRepository implements IPlanoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Plano[]> {
    const planos = await this.prisma.plano.findMany();
    return planos.map(
      (p) => new Plano(p.codigo, p.nome, p.custoMensal, p.data, p.descricao),
    );
  }

  async findById(codigo: number): Promise<Plano | null> {
    const p = await this.prisma.plano.findUnique({ where: { codigo } });
    if (!p) return null;
    return new Plano(p.codigo, p.nome, p.custoMensal, p.data, p.descricao);
  }

  async updateCustoMensal(codigo: number, custoMensal: number): Promise<Plano> {
    const p = await this.prisma.plano.update({
      where: { codigo },
      data: { custoMensal, data: new Date() },
    });
    return new Plano(p.codigo, p.nome, p.custoMensal, p.data, p.descricao);
  }
}