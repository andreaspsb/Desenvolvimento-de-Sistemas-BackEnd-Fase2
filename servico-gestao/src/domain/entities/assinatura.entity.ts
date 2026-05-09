export class Assinatura {
  constructor(
    public readonly codigo: number,
    public codPlano: number,
    public codCli: number,
    public inicioFidelidade: Date,
    public fimFidelidade: Date,
    public custoFinal: number,
    public descricao: string,
  ) {}

  // Regra de domínio: ATIVO = fimFidelidade >= hoje
  get ativa(): boolean {
    return this.fimFidelidade >= new Date();
  }
}