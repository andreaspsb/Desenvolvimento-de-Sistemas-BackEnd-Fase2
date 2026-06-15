export abstract class IPlanoAtivoCache {
  abstract get(codAss: number): Promise<boolean | null>;
  abstract set(codAss: number, ativo: boolean): Promise<void>;
  abstract delete(codAss: number): Promise<void>;
}