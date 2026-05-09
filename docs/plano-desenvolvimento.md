# Plano de Desenvolvimento: ServicoGestao — Fase 1

## Stack
- **Linguagem**: TypeScript
- **Framework**: NestJS
- **ORM**: Prisma
- **Banco de dados**: PostgreSQL
- **Container**: Docker
- **Arquitetura**: Clean Architecture (Robert Martin)
- **Metodologia**: TDD via agente Professor

---

## Fase A — Setup (pré-TDD)

### A1. Scaffold do projeto NestJS
- `nest new servico-gestao` dentro do repo
- Instalar dependências: `@nestjs/swagger`, `prisma`, `@prisma/client`, `jest`, `@nestjs/testing`

### A2. Docker Compose
- Arquivo `docker-compose.yml` com serviço PostgreSQL (porta 5432)
- `.env` com `DATABASE_URL`

### A3. Schema Prisma
- `prisma/schema.prisma` com modelos: Plano, Cliente, Assinatura
- `prisma migrate dev --name init`

### A4. Estrutura de pastas (Clean Architecture)
```
src/
  domain/
    entities/        ← Plano, Cliente, Assinatura (classes TypeScript puras, sem ORM)
    repositories/    ← Interfaces IPlanoRepository, IClienteRepository, IAssinaturaRepository
  application/
    use-cases/       ← Um arquivo por use case
  infrastructure/
    database/        ← PrismaService
    repositories/    ← PrismaPlanoRepository, PrismaClienteRepository, PrismaAssinaturaRepository
  presentation/
    controllers/     ← GestaoController
```

### A5. Seeding
- `prisma/seed.ts` com 10 clientes, 5 planos, 5 assinaturas

---

## Fase B — TDD (7 ciclos)

| # | Use Case | Endpoint | Regra de domínio |
|---|---|---|---|
| 1 | `CreateAssinaturaUseCase` | `POST /gestao/assinaturas` | `inicioFidelidade = hoje`, `fimFidelidade = hoje + 365 dias` |
| 2 | `ListClientesUseCase` | `GET /gestao/clientes` | — |
| 3 | `ListPlanosUseCase` | `GET /gestao/planos` | — |
| 4 | `UpdatePlanoCustoUseCase` | `PATCH /gestao/planos/:idPlano` | atualiza `custoMensal` e `data` |
| 5 | `ListAssinaturasUseCase` | `GET /gestao/assinaturas/:tipo` | `ATIVO = fimFidelidade >= hoje` |
| 6 | `ListAssinaturasByClienteUseCase` | `GET /gestao/assinaturascliente/:codcli` | — |
| 7 | `ListAssinaturasByPlanoUseCase` | `GET /gestao/assinaturasplano/:codplano` | — |

Cada ciclo segue o fluxo TDD:
1. **Red** — escrever o teste com mock do repositório
2. **Green** — implementação mínima para passar
3. **Refactor** — melhorar sem quebrar

---

## Decisões arquiteturais

- Entidades de domínio são **classes TypeScript puras** (sem decorators do Prisma)
- Repositórios Prisma implementam as interfaces do domínio (princípio DIP do SOLID)
- Status `ATIVO` = `fimFidelidade >= data de hoje`
- `Pagamento` e microsserviços ficam para a Fase 2

---

## Verificação final

1. `docker compose up -d` → PostgreSQL rodando
2. `npx prisma migrate dev` → schema aplicado
3. `npx prisma db seed` → dados populados
4. `npm run test` → todos os 7 testes passando
5. `npm run start:dev` → API rodando em `localhost:3000`
6. Testar todos os 7 endpoints via Postman
7. Swagger disponível em `/api`
