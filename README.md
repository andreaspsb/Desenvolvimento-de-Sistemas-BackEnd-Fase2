# Desenvolvimento de Sistemas Back-End

Repositório da disciplina **Desenvolvimento de Sistemas Back-End** — Andreas Berwaldt.

O projeto é desenvolvido em fases, cada uma implementando um microsserviço independente.

## Estrutura do repositório

```
.
├── servico-gestao/     ← Fase 1 — API de gestão de planos e assinaturas
└── docs/               ← Documentação geral, enunciados e relatórios
```

## Fases

| Fase | Serviço | Status | Descrição |
|------|---------|--------|-----------|
| 1 | [`servico-gestao/`](./servico-gestao/) | ✅ Concluída | API REST de controle de planos de internet e assinaturas de clientes |
| 2 | — | 🔜 Pendente | Microsserviços + comunicação assíncrona |

## Fase 1 — ServicoGestao

API REST com **NestJS + Prisma + PostgreSQL**, seguindo **Clean Architecture**.

- 7 endpoints sob o prefixo `/gestao/`
- 18 testes unitários passando
- Banco PostgreSQL via Docker (porta 5433)

Veja o [README completo da Fase 1](./servico-gestao/README.md) para instruções de execução.
