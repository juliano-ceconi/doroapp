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

---

## [2026-06-25] Implementação do Quadro Kanban e Definição de Pronto

### Contexto

Necessidade de trazer a funcionalidade de checklist e Kanban do `vida-os` para o `doroapp` sem quebrar a estética Cyberpunk/Matrix, mantendo a execução independente e adicionando regras claras para entrega de tarefas remotas.

### Decisão

1. Modificar o layout principal (`.main-content`) e o cabeçalho (`.hero-header`) para suportar rolagem vertical independente, permitindo exibir o Kanban abaixo do timer sem quebras visuais.
2. Armazenar a lista de tarefas (`tasks`) no `gameState` e persistir localmente no `localStorage` do navegador para manter o aplicativo funcional de forma offline e leve.
3. Adicionar regra formal de "Definição de Pronto" no `AGENTS.md`, exigindo commits atômicos, push no GitHub e confirmação de deploy bem-sucedido na Vercel antes de finalizar as tarefas.

### Consequências

- O `doroapp` agora possui um gerenciador de tarefas completo (Quadro Kanban com 3 colunas de prioridades e cálculo dinâmico de ganho de XP).
- Compatibilidade retroativa de dados preservada (inicializando `tasks` vazias em dados antigos).
- Processo de deploy e integridade de produção garantidos pelas novas diretrizes operacionais de agentes.

---

## [2026-06-25] Reversão do Escopo de Cores do Modo Agente

### Contexto

Anteriormente, o escopo das variáveis roxas do Modo Agente (`body.agent-mode-active`) havia sido restringido para `.main-content` (painel direito) para manter o painel esquerdo (`.sidebar`/Missões) sempre verde. Isso causou inconsistências visuais, principalmente no modo de Pausa (`break-mode-active`), onde as cores ficavam divididas (azul claro na esquerda e roxo na direita). O usuário solicitou reverter esse comportamento para o comportamento global anterior.

### Decisão

1. Remover o seletor filho `.main-content` da regra de `body.agent-mode-active`, fazendo com que as variáveis de cor do Modo Agente se apliquem ao `body` como um todo.
2. Garantir que as variáveis do Modo Pausa (`body.break-mode-active`) sobressaiam em relação ao Modo Agente quando ambos estiverem ativos, aproveitando a ordem e especificidade da cascata CSS.

### Consequências

- Com o Modo Agente ativo, todo o site fica roxo (incluindo painel de missões).
- Com o Modo Pausa ativo, todo o site fica azul claro (incluindo painel de missões).
- Quando o Modo Pausa e o Modo Agente estão ativos simultaneamente, o Modo Pausa (azul claro) se sobressai integralmente em todo o site.

---

## [2026-06-25] Implementação de Painel de Métricas na Sidebar

### Contexto

O usuário solicitou a inclusão de 4 métricas com barras de progresso (Produtividade, Corpo Físico, Dinheiro, Saúde Emocional) no rodapé do menu esquerdo, abaixo da frase motivacional diária. As porcentagens devem ser individualmente ajustáveis via duplo clique e iniciar em 1%.

### Decisão

1. Adicionar uma nova seção `.metrics-panel` no HTML do menu lateral (`index.html`) contendo as 4 métricas, ícones representativos (`⚡`, `💪`, `💵`, `🧠`), barra de progresso e rótulos de porcentagem.
2. Criar estilos CSS (`style.css`) responsivos no tema Cyberpunk, utilizando as variáveis nativas do Doroapp (`var(--matrix-green)`, `var(--matrix-glow)`) para que as cores das barras acompanhem dinamicamente o tema ativo (verde Matrix, roxo Agente ou azul Pausa).
3. Expandir o estado global `gameState` no JavaScript (`script.js`) para incluir o objeto `metrics` com valores iniciais `1`, persistindo-o e recuperando-o de forma nativa através do `localStorage` (nas funções `saveGame` e `loadGame`).
4. Implementar listeners de duplo clique (`dblclick`) no painel de métricas para solicitar uma nova porcentagem de 1 a 100 via caixa de diálogo (`prompt`), validando e atualizando a interface e a persistência.

### Consequências

- A barra lateral agora apresenta 4 barras de status interativas e persistentes que mudam dinamicamente de visual dependendo do modo ativado no temporizador Pomodoro.
- O estado de carregamento inicial garante a retrocompatibilidade com perfis sem métricas salvas.

---

## [2026-06-25] Estilização Estática da Frase Aleatória (Daily Quote)

### Contexto

O usuário solicitou que a frase motivacional aleatória exibida abaixo do log de missões na barra lateral tenha suas cores alteradas para um amarelo claro constante, que não sofra alteração pelas trocas de modo do Pomodoro (Foco / Pausa / Agente ON).

### Decisão

1. Criar variáveis de cor estáticas no `:root` do CSS (`--quote-yellow` e `--quote-yellow-glow`) com tonalidades de amarelo cyberpunk claro.
2. Alterar as propriedades de borda (`border`), cor de texto (`color`) e sombra (`box-shadow`) da classe `.daily-quote` para consumirem permanentemente as novas variáveis amarelas.
3. Isolar o `.terminal-prompt` dentro de `.daily-quote` aplicando a cor amarela especificamente a ele, preservando a regra geral para outros possíveis prompts de terminal do sistema.

### Consequências

- A frase aleatória mantém um visual amarelo suave e persistente, servindo como ponto de destaque visual constante que se descola da alternância de cores de tema de Foco (Verde), Agente (Roxo) e Pausa (Azul).



