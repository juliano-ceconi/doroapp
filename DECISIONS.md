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

---

## [2026-06-26] Reversão da Alteração Temporária do Fundo para Preto

### Contexto

O usuário solicitou desfazer a alteração temporária e retornar ao fundo preto padrão do tema.

### Decisão

1. Restaurar a variável de cor `--matrix-bg` no arquivo `style.css` para `#020203` (Deepest Zinc).

### Consequências

- O fundo da aplicação retorna à cor escura padrão do tema Matrix/Cyberpunk.
- Contraste e legibilidade dos textos e brilhos neon restaurados ao comportamento original.

---

## [2026-06-26] Reorganização do Layout em 3 Colunas e Otimização Dimensional

### Contexto

O usuário solicitou separar a página em 3 colunas (coluna de missões na esquerda, coluna de timer/quadro na central e coluna de métricas/indicadores na direita), garantindo que todo o conteúdo caiba em uma tela sem barra de rolagem horizontal, otimizando as larguras das colunas e reduzindo proporcionalmente o tamanho dos elementos da coluna central.

### Decisão

1. Mover o `.metrics-panel` de dentro da `.sidebar` no arquivo `index.html` para uma nova tag `<aside class="metrics-sidebar">` no final do layout (coluna da direita).
2. Reduzir o tamanho da `.sidebar` (coluna da esquerda) em 15%, mudando sua largura de `300px` para `255px`.
3. Criar a classe `.metrics-sidebar` com largura fixa de `140px` (aproximadamente metade da esquerda) e padding horizontal reduzido (`0.5rem`) para otimização espacial.
4. Reduzir o tamanho dos elementos visuais da coluna central (`.main-content`) em cerca de 20%:
   - `.glitch-text` reduzido de `5rem` para `4rem`.
   - `.timer-display` reduzido de `10rem` para `8rem`.
   - `.btn` reduzido de `min-width: 160px; padding: 0.8rem 0;` para `min-width: 130px; padding: 0.6rem 0;`.
   - Ajustar paddings internos de `.main-content` de `0.75rem 2rem` para `0.5rem 1rem`.
5. Estender as regras de CSS responsivo mobile (`@media (max-width: 768px)`) aplicando `display: contents` para a nova `.metrics-sidebar` e ordenando as métricas com `order: 7` e `8` para ficarem no fim do fluxo de rolagem vertical.

### Consequências

- Layout mais limpo e melhor distribuído horizontalmente, eliminando a sobrecarga de informações da sidebar esquerda.
- Otimização dimensional que evita o aparecimento de barras de rolagem horizontais e reduz o risco de rolagem vertical excessiva em resoluções de desktop comuns.
- Responsividade mobile mantida, com uma transição suave e organizada de 3 colunas para 1 coluna vertical.

---

## [2026-06-26] Ajuste Fino de Largura de Colunas e Ocultação da Barra de Rolagem Central

### Contexto

Identificou-se a presença de uma barra de rolagem vertical visível e indesejada na coluna central (`.main-content`). Além disso, o usuário solicitou diminuir mais 10% a largura da coluna central e repassar essa proporção para a coluna de indicadores à direita.

### Decisão

1. Adicionar regras de `scrollbar-width: none`, `-ms-overflow-style: none` e `.main-content::-webkit-scrollbar { display: none; }` na classe `.main-content` para ocultar a barra de rolagem da coluna central.
2. Aumentar a largura da `.metrics-sidebar` (direita) de `140px` para `200px` e ajustar o padding horizontal para `1rem`. Como a coluna central possui dimensionamento flexível (`flex: 1`), esse aumento de largura da direita comprime a coluna central em cerca de 10% em resoluções de desktop típicas.

### Consequências

- Barra de rolagem vertical no centro ocultada de forma idêntica à coluna esquerda.
- Melhor legibilidade e visualização mais espaçada das barras de métricas na coluna direita.
- Relação visual e proporções das 3 colunas mais equilibradas.

---

## [2026-06-26] Ajuste Adicional de Largura das Colunas Esquerda e Direita

### Contexto

O usuário solicitou aumentar a largura da coluna esquerda em 10% e da coluna direita em 5%, reduzindo o espaço ocupado pela coluna central.

### Decisão

1. Aumentar a largura da `.sidebar` (esquerda) de `255px` para `280px` (aumento de 10%).
2. Aumentar a largura da `.metrics-sidebar` (direita) de `200px` para `210px` (aumento de 5%).

### Consequências

- A coluna central (`.main-content`) teve seu tamanho flexível reduzido de forma correspondente (cerca de 35px a menos).
- Melhor legibilidade do painel esquerdo (missões) e direito (métricas), proporcionando uma visualização mais confortável.


---

## [2026-06-26] Alteração do Rótulo, Unidade e XP da Missão de Foco

### Contexto

O usuário solicitou simplificar e ajustar o texto da missão de 2h de foco, removendo a unidade "min" e atualizando o valor de XP exibido diretamente na lista de missões de 0 XP para 200 XP (que é o bônus de conclusão).

### Decisão

1. Alterar o texto da missão no `gameState` de `"Completar 2h de foco"` para `"2h de foco"`.
2. Remover a concatenação da string `" min"` para o progresso da missão 1 em `renderMissions()`.
3. Ajustar o XP renderizado para mostrar `mission.bonusXp` em vez de `mission.xp` se a missão for a de foco (id: 1), exibindo `[200 XP]` na interface.

### Consequências

- Interface de missões diárias mais direta e alinhada com as recompensas de XP reais da missão de foco.

---

## [2026-06-26] Ajustes de Layout e Tipografia no Doroapp (CSS)

### Contexto

O usuário solicitou aumentar em 1 o tamanho da fonte do Nome (acima da barra de XP) e aumentar a distância entre a seção do temporizador (especificamente o manual override `> 00 MIN SET`) e o quadro de tarefas (Kanban), adicionando uma linha horizontal divisora entre eles.

### Decisão

1. Aumentar o `font-size` da classe `.operator-name` de `0.7rem` para `0.8rem`.
2. Adicionar uma borda superior (`border-top: 1px solid var(--matrix-dim);`) no elemento `.board-section` para servir de barra horizontal.
3. Aumentar o `margin-top` do `.board-section` de `0.75rem` para `2rem` e adicionar `padding-top: 1.5rem` para dar o distanciamento adequado de forma proporcional nos modos desktop e mobile.

### Consequências

- Nome do operador mais legível e destacado no painel esquerdo.
- Separação visual clara entre a área de foco central (temporizador) e o quadro de tarefas, evitando que a interface pareça muito densa verticalmente.

---

## [2026-06-26] Implementação de Logs de Histórico no LocalStorage e Exportação

### Contexto

O usuário solicitou uma maneira de persistir e registrar localmente timestamps de missões concluídas, tarefas finalizadas no Kanban e alterações feitas nas métricas para viabilizar a criação de gráficos no futuro. Adicionalmente, solicitou registrar os minutos de foco de cada dive e remover o botão físico de limpar histórico para evitar exclusão acidental. Também foi solicitado adicionar o XP do evento, o XP total acumulado, o tipo de dispositivo (desktop, mobile ou tablet) de onde partiu a ação, e registrar logs específicos de tarefas adicionadas e excluídas.

### Decisão

1. **Estrutura e Logs no LocalStorage:** Criado o histórico de logs serializado em JSON com a chave `doroapp_history_log` no `localStorage`.
2. **Campos Adicionais de Metadata:**
   - Adicionada detecção de dispositivo usando `navigator.userAgent` (retornando `desktop`, `mobile` ou `tablet` via função `getDeviceType()`).
   - Adicionados os campos `xpGained` (XP recebido na ação) e `totalXp` (XP acumulado pós-ação) em cada entrada de log.
3. **Registro nos Eventos:**
   - Adicionada chamada `logHistoryEvent` no clique de medicamentos e de missões comuns, além da conclusão automática por progresso.
   - **Registro de Tarefas:** Logs detalhados criados com a ação correspondente no campo `value` (`adicionada`, `excluida`, `concluida`) ao interagir com o Kanban de tarefas.
   - Adicionado registro ao ajustar valores das métricas pelo prompt.
   - **Registro de Dives (Foco):** Adicionado log do tempo focado em minutos ao finalizar um ciclo Pomodoro completo (tipo `pomodoro`) e ao consolidar tempo parcial (tipo `parcial`).
4. **Interface Visual & Segurança (Cyberpunk):**
   - Inserida uma seção discreta no rodapé da barra lateral direita com contador de logs em tempo real e botão **EXPORTAR LOG**.
   - **Remoção do Limpar Físico:** Removido o botão "LIMPAR LOG" da interface para evitar exclusão acidental.
   - **Console-Only Clear:** Implementada a função global `window.clearDoroappHistory()` que permite limpar o log via console de desenvolvedor com diálogo de confirmação.

### Consequências

- Logs salvos localmente ricos em metadados (XP individual, XP total acumulado, dispositivo, tipo de ação da task), facilitando a montagem de gráficos detalhados no futuro.
- Eliminação do risco de limpar o histórico por clique acidental, mantendo a capacidade de gerenciamento por comandos no console do navegador.
- Estética da barra lateral mais limpa e focada em exportação de dados.

---

## [2026-06-27] Ajustes de Cores, Espaçamentos, Nomenclaturas e Proporções de Colunas

### Contexto

O usuário solicitou melhorias no Doroapp para:
1. Ajustar a cor da seção de "Registro Histórico" para um tom mais claro intermediário, mantendo boa legibilidade sem disputar atenção com o restante do site.
2. Aumentar a distância vertical entre o título "DEEP DIVE FOCUS" e o topo da página, e também entre "UM MERGULHO MUDA TUDO." e o temporizador.
3. Remover a palavra "Métricas" do cabeçalho da barra de métricas.
4. Alterar a missão "Não abrir redes sociais [100 XP]" para "Dia sem Doomscrolling [1000 XP]" e ajustar a recompensa correspondente.
5. Alterar a nomenclatura do menu esquerdo de "Log de Missões" para "Missões".
6. Ajustar a proporção das colunas laterais: diminuindo 5% da largura da coluna da esquerda e transferindo esse mesmo valor (14px) para somar na largura da coluna de métricas (direita).

### Decisão

1. **Variável de Cor Intermediária:** Criada a variável CSS `--matrix-dim-medium` com tons intermediários nas três folhas de temas (Matrix Green: `#00881b`, Agent Purple: `#7e12c0`, Break Blue: `#3896b3`) e aplicada a cor na borda e nos textos da seção de Registro Histórico.
2. **Espaçamento Central:** Ajustado o `margin-top` de `.hero-header` para `1.5rem` e o `margin-top` de `.focus-matrix` para `1.5rem`.
3. **Remoção de Título:** Removida a tag `<h3>Métricas</h3>` do cabeçalho da barra direita (`.metrics-sidebar`).
4. **Renomeação de Menu e Missões:**
   - Atualizado o título no HTML de "Log de Missões" para "Missões".
   - Modificada a missão ID 3 em `gameState.missions` para `"Dia sem Doomscrolling"` e seu XP para `1000`.
5. **Redimensionamento de Colunas:**
   - Reduzida a largura de `.sidebar` de `280px` para `266px` (redução de 5%).
   - Aumentada a largura de `.metrics-sidebar` de `210px` para `224px` (adição de 14px).

### Consequências

- Visual mais espaçado e harmônico no centro da página.
- Menor ocupação horizontal da barra de missões e maior respiro para as barras de progresso das métricas à direita.
- Missão diária de foco em hábitos aprimorada com maior incentivo de XP contra doomscrolling.
- Registro Histórico com melhor leitura, integrado ao comportamento dinâmico de cores do app.

---

## [2026-06-27] Ajustes Finos de Dimensão de Colunas, Divisor do Histórico e Espaçamento de Botões

### Contexto

O usuário solicitou novos ajustes finos na UI:
1. Fixar a largura da coluna esquerda (sidebar) em 275px e a coluna direita em 220px.
2. Aumentar a distância vertical entre o display do timer e os botões de controle para ficar simétrica em relação à distância acima do timer.
3. Alterar o estilo de divisor (linha divisória) acima do Registro Histórico de tracejado para linha sólida, harmonizando com a barra horizontal existente abaixo de "MISSÕES".

### Decisão

1. **Largura das Colunas:** Ajustadas as larguras fixas no CSS: `.sidebar` para `275px` e `.metrics-sidebar` para `220px`.
2. **Espaçamento de Controles:** Aumentado o `padding-top` da classe `.timer-controls` de `1rem` para `1.5rem`, igualando ao `margin-top` de `1.5rem` acima do timer.
3. **Estilo do Divisor:** Modificada a linha divisória de `border-top: 1px dashed` para `border-top: 1px solid` no HTML da seção `.history-actions`, mantendo a cor ajustada `--matrix-dim-medium`.

### Consequências

- Simetria visual aprimorada em torno da área de foco do temporizador Pomodoro.
- Identidade visual mais coesa com o uso de linhas sólidas padronizadas em todas as divisões do app.
- Distribuição de espaço horizontal otimizada para ambas as colunas de status.
