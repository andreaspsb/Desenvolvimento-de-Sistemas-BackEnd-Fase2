export class Plano {
  constructor(
    public readonly codigo: number,
    public nome: string,
    public custoMensal: number,
    public data: Date,
    public descricao: string,
  ) {}
}