export abstract class IGestaoClient {
    abstract verificarAssinaturaAtiva(codAss: number): Promise<boolean>;
}