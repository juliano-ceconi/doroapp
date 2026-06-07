# 🧠 Registro de Decisões Arquiteturais

Este arquivo registra o histórico de decisões importantes tomadas por agentes ou
humanos no projeto, facilitando a compreensão do "porquê" por trás das mudanças.

---

## [2026-06-07] Criação do Doroapp

### Contexto

Criação do projeto a partir de uma base existente, sem preservar o histórico Git
do repositório de origem.

### Decisão

1. Adotar `doroapp` como nome do projeto e do repositório.
2. Usar `juliano-ceconi/doroapp` como repositório remoto.
3. Preservar a funcionalidade e a estética Cyberpunk existentes.

### Consequências

- O Doroapp possui histórico Git independente.
- Referências de projeto e caminhos locais apontam para o novo repositório.

---

## [2026-02-20] Implementação do Protocolo de Agentes

### Contexto

Necessidade de padronizar a atuação do Google Antigravity no repositório para
garantir acessibilidade (pt-br), clareza (ADHD-friendly) e segurança operacional.

### Decisão

1. Criação do `AGENTS.md` como fonte de verdade para regras de IA.
2. Definição do uso obrigatório de Português (pt-br).
3. Adoção do estilo de resposta ADHD-friendly (negrito, listas, espaçamento).
4. Estabelecimento de Commits Atômicos e Auto-correção como padrão.

### Consequências

- Melhora na legibilidade para o usuário humano.
- Histórico de Git mais limpo e rastreável.
- Redução de riscos de quebras acidentais na UI Cyberpunk.
