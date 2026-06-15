import { Assinatura } from '../entities/assinatura.entity';

export abstract class IAssinaturaRepository {
  abstract create(codPlano: number, codCli: number): Promise<Assinatura>;
  abstract findAll(): Promise<Assinatura[]>;
  abstract findByCliente(codCli: number): Promise<Assinatura[]>;
  abstract findByPlano(codPlano: number): Promise<Assinatura[]>;
  abstract updateDataUltimoPagamento(
    codigo: number,
    dataUltimoPagamento: Date,
  ): Promise<Assinatura>;
  abstract findById(codigo: number): Promise<Assinatura | null>;
}