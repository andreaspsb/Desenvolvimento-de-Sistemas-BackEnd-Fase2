import { Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaAssinaturaRepository implements IAssinaturaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(a: any): Assinatura {
    return new Assinatura(
      a.codigo,
      a.codPlano,
      a.codCli,
      a.inicioFidelidade,
      a.fimFidelidade,
      a.dataUltimoPagamento,
      a.custoFinal,
      a.descricao,
    );
  }

  async create(codPlano: number, codCli: number): Promise<Assinatura> {
    const plano = await this.prisma.plano.findUnique({ where: { codigo: codPlano } });
    const hoje = new Date();
    const fimFidelidade = new Date(hoje);
    fimFidelidade.setFullYear(fimFidelidade.getFullYear() + 1);

    const a = await this.prisma.assinatura.create({
      data: {
        codPlano,
        codCli,
        inicioFidelidade: hoje,
        fimFidelidade,
        dataUltimoPagamento: hoje,
        custoFinal: plano!.custoMensal,
        descricao: `Assinatura do plano ${plano!.nome}`,
      },
    });
    return this.toEntity(a);
  }

  async findAll(): Promise<Assinatura[]> {
    const assinaturas = await this.prisma.assinatura.findMany();
    return assinaturas.map(this.toEntity);
  }

  async findByCliente(codCli: number): Promise<Assinatura[]> {
    const assinaturas = await this.prisma.assinatura.findMany({ where: { codCli } });
    return assinaturas.map(this.toEntity);
  }

  async findByPlano(codPlano: number): Promise<Assinatura[]> {
    const assinaturas = await this.prisma.assinatura.findMany({ where: { codPlano } });
    return assinaturas.map(this.toEntity);
  }
}