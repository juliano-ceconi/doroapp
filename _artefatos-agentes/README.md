# _artefatos-agentes (doroapp)

Este diretório contém os artefatos de governança e documentação de tarefas gerados pelos agentes de IA específicos para o subprojeto `doroapp`.

## Regra de Nomenclatura Oficial (Go-Forward)

Alinhado com a governança global estabelecida em `~/.agents/AGENTS.md`, todo novo artefato gerado por um agente deve seguir estritamente o padrão:
`_artefatos-agentes/{MM}/{AA-MM-DD}/{AA-MM-DD}-at-{hh-mm}-{descricao-breve}.md`

Onde:
- `{MM}`: Mês atual do sistema com dois dígitos (ex: `07`).
- `{AA-MM-DD}`: Data atual do sistema no formato ano-mês-dia com dois dígitos (ex: `26-07-03`).
- `{hh-mm}`: Horário atual com dois dígitos para hora e minuto (ex: `09-15`).
- `{descricao-breve}`: Descrição da tarefa em letras minúsculas separadas por hífen.

## Pastas Legadas / Históricas

As seguintes pastas são históricas (coexistência de múltiplos esquemas antigos):
- `26-06-07/` etc.

> [!IMPORTANT]
> **Não renomeie ou mova as pastas históricas**. Elas são preservadas intocadas para evitar a quebra de links relativos em handoffs, logs e históricos antigos de sessões de agentes.
