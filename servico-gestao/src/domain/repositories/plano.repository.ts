import { Plano } from '../entities/plano.entity';

export abstract class IPlanoRepository {
  abstract findAll(): Promise<Plano[]>;
  abstract findById(codigo: number): Promise<Plano | null>;
  abstract updateCustoMensal(codigo: number, custoMensal: number): Promise<Plano>;
}