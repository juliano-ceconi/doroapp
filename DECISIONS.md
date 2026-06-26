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

---

## [2026-06-25] Ajuste Visual de Espaçamentos, Nomenclaturas e Inclusão de Indicadores

### Contexto

O usuário solicitou simplificação de nomenclatura em duas métricas ("Corpo Físico" para "Físico"; "Saúde Emocional" para "Emocional"), inserção de mais dois indicadores no painel ("Saúde" e "Espiritual") e ajustes finos de layout nas missões, níveis e altura das métricas para otimizar o aproveitamento de espaço.

### Decisão

1. **Alteração de Nomenclatura:** Atualizado o arquivo `index.html` para exibir "Físico" e "Emocional".
2. **Inclusão de Novos Indicadores:** Adicionado os blocos HTML para as métricas "Saúde" (❤️) e "Espiritual" (🧘) no arquivo `index.html`. No `script.js`, as novas métricas foram inseridas no objeto de estado inicial `gameState.metrics`, mapeadas no fluxo de renderização (`updateMetricsUI()`) e tratadas no mecanismo de carregamento (`loadGame()`) e reset para retrocompatibilidade.
3. **Ajustes de Proporção (CSS):**
   - Reduzido a altura das missões em 10% alterando o padding vertical de `.mission-item` de `0.5rem` para `0.45rem` (e no layout responsivo de `1rem` para `0.9rem`).
   - Reduzido a distância entre missões em 5% configurando o `gap` em `#mission-list` para `0.475rem`.
   - Reduzido a distância entre Level e Título do level em 10% definindo o `gap` de `.profile-section` para `0.9rem`.
   - Reduzido a distância do Título do level para "Log de Missões" em 15% ajustando o `margin-top` de `.mission-log` para `1.275rem`.
   - Reduzido a altura da caixa de indicadores em 10% configurando o padding vertical de `.metric-row` para `0.315rem` e o `gap` interno para `0.225rem`.

### Consequências

- A barra lateral de status agora suporta 6 indicadores com ajuste interativo completo (duplo-clique) e persistência de dados.
- O layout vertical ficou mais compacto e otimizado, permitindo que todas as missões e novos indicadores caibam de forma harmoniosa sem prejudicar a leitura das fontes.

---

## [2026-06-26] Novas métricas, lembrete diário de remédios com alerta vermelho e personalização do operador

### Contexto

O usuário solicitou melhorias no Doroapp para:
1. Adicionar quatro novos indicadores com porcentagens e ajuste via duplo clique (Alimentação, Água, Aeróbico, Pontualidade).
2. Adicionar missões de lembretes de remédios no topo da lista (Venvanse disparando às 07:00 e Sertralina disparando às 13:30), os quais devem pulsar em vermelho até serem marcados como feitos, e persistir o estado de concluídos até o reset no dia seguinte.
3. Permitir personalizar o nome do operador exibido em cima da barra de XP (padrão "Juliano Ceconi") através de um duplo clique.

### Decisão

1. **Adição de Indicadores no HTML e JS**:
   - Inserido no `index.html` os novos blocos das métricas Alimentação (🥗), Água (💧), Aeróbico (🏃) e Pontualidade (⏱️).
   - Inseridas as chaves correspondentes no objeto de métricas do `gameState.metrics` no `script.js` e inicializadas/restauradas no `loadGame` garantindo retrocompatibilidade.
2. **Nome do Operador Customizável**:
   - Inserido o elemento `.operator-name` no `index.html` acima do contêiner da barra de XP.
   - Adicionados estilos CSS no `style.css` com cursor pointer e brilho hover cyberpunk.
   - Adicionada propriedade `operatorName` no `gameState` no `script.js`.
   - Adicionado listener de `dblclick` no DOM para permitir alteração do nome via caixa de prompt e persistência.
3. **Missões Especiais de Remédio**:
   - Adicionado no topo da lista de missões os itens especiais com IDs `"venvanse"` e `"sertralina"`.
   - Criada a função `hasMedicineTriggered` que avalia se a hora e minuto atual superam o horário de disparo (07:00 / 13:30).
   - Implementado reset diário baseado em data local (`lastDoneDate`) comparando com `todayStr` (formato `YYYY-MM-DD`). Se a data for diferente, a missão de remédio torna-se pendente.
   - Criada animação CSS `@keyframes pulse-red` e a classe `.mission-item.medicine-alert` em `style.css` para fazer os remédios não concluídos piscarem em vermelho neon após o horário de disparo.
   - Atualizado o listener de clique (`toggleMission`) para que remédios, uma vez concluídos, fiquem permanentes no dia (sem o auto-reset de 1.5 segundos das outras missões).
   - Criado um loop de verificação periódico (`setInterval` a cada 10 segundos) que checa a virada de data em tempo real e atualiza a interface sem requerer recarregamento da página.

### Consequências

- O Doroapp passa a possuir uma gestão interativa e visual de tomada de medicamentos controlados integrada ao seu ciclo diário de XP.
- Quatro novos indicadores de hábitos diários integrados à sidebar de métricas.
- Identificação do operador personalizada, salvando o nome localmente no navegador.

---

## [2026-06-26] Consolidação Parcial de Foco e Missão de 2h de Foco

### Contexto

O usuário solicitou uma maneira de consolidar o progresso de foco mesmo quando este é interrompido antes do fim por uma urgência ("Mergulho Parcial"), garantindo o XP correspondente e o progresso da missão diária de foco. Além disso, solicitou a substituição da missão "Completar 4 Pomodoros" por "Completar 2h de foco", que acumula o tempo real focado em minutos.

### Decisão

1. **Botão Parcial na Interface**:
   - Inserido o botão `<button id="btn-partial">` com classes `btn btn-secondary` no `.timer-controls` em `index.html`. Ele permanece oculto (`display: none`) por padrão.
2. **Lógica de Visibilidade e Clique**:
   - Desenvolvida a função `updatePartialButtonVisibility()` no `script.js` para exibir o botão Parcial apenas quando o timer estiver em modo `"focus"` e com tempo decorrido (`timeLeft < totalTime`).
   - Implementado o listener de clique no `btn-partial`: calcula os minutos inteiros focados (`Math.floor(tempo decorrido)`), valida o mínimo de 1 minuto para evitar abusos, adiciona o XP proporcional (`minutos * 4`), incrementa a missão 1, exibe feedback no estilo terminal e reseta o timer de foco.
3. **Conversão da Missão 1 para Minutos de Foco**:
   - Atualizada a definição da missão 1 no `gameState.missions` para `"Completar 2h de foco"`, com meta (`targetProgress`) configurada para `120` (minutos) e `xp: 0` (o XP é ganho no timer, a missão fornece apenas o bônus de conclusão de `200 XP`).
   - Adicionada a unidade `"min"` na renderização da missão 1 em `renderMissions()` para exibir o progresso no formato `(X/120 min)`.
   - Modificada a lógica de tick no final do ciclo completo para incrementar o progresso da missão com o tempo total do timer (`currentFocusTime`).
   - O multiplicador de benefício do **Agent Mode (2x)** foi preservado: quando o modo agente está ativo, os minutos de foco acumulados na missão também são duplicados.

### Consequências

- Maior flexibilidade no uso diário do aplicativo, permitindo registrar o foco em cenários de interrupções inevitáveis.
- Acompanhamento do tempo total focado de forma contínua e gradual na missão diária, ao invés da contagem binária de pomodoros.

---

## [2026-06-26] Alteração Temporária do Fundo para Branco

### Contexto

O usuário solicitou alterar o fundo do Doroapp para branco para realizar um teste rápido, com a intenção de reverter a alteração posteriormente.

### Decisão

1. Alterar a variável de cor `--matrix-bg` no arquivo `style.css` de `#020203` (preto) para `#ffffff` (branco).

### Consequências

- O fundo da aplicação ficará branco para fins de visualização rápida e testes do usuário.
- Elementos com cores claras (verde elétrico, roxo, azul) sofrerão perda temporária de contraste no fundo branco até que o usuário reverta a alteração.
