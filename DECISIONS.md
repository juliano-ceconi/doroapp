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

---

## [2026-06-27] Nova Missão Aeróbico, Ajuste de Borda e Aumento de Colunas do Kanban

### Contexto

O usuário solicitou novos ajustes funcionais e estéticos:
1. Adicionar uma nova missão chamada "Aeróbico" no valor de 500 XP.
2. Escurecer o divisor superior da seção "Registro Histórico" para o mesmo tom da barra abaixo de "MISSÕES".
3. Aumentar a largura de cada uma das colunas do Kanban em 5px, sem mexer nas colunas principais da página, reduzindo o espaço vazio na coluna central.

### Decisão

1. **Adição de Missão:** Adicionada a missão `{ id: 7, text: "Aeróbico", completed: false, xp: 500 }` ao estado inicial no `script.js` (após a missão "Malhar").
2. **Escurecimento do Divisor:** Alterada a cor da borda de `--matrix-dim-medium` para `--matrix-dim` no estilo inline da div `.history-actions` em `index.html`.
3. **Largura das Colunas Kanban:** Alterado o `max-width` da classe `.board-section` no `style.css` de `900px` para `915px`. Com 3 colunas em grid fluida (`1fr`), cada coluna cresce exatamente 5px, aproveitando melhor o espaço vazio do centro.

### Consequências

- Inclusão do hábito de exercícios aeróbicos no controle de gamificação.
- Maior harmonia e sobriedade nas divisórias da barra lateral, minimizando o destaque visual excessivo da seção de Registro Histórico.
- Otimização do espaço central da tela em monitores desktop, com colunas do Kanban mais largas e redução de espaço ocioso nas laterais.

---

## [2026-06-27] Reordenação do Registro Histórico no Layout Mobile

### Contexto

Na versão mobile do Doroapp, a seção de "Registro Histórico" (composta pelas ações de exportação e total de logs) estava sendo renderizada no topo da tela. O usuário solicitou que ela fosse movida para o final do fluxo da página.

### Decisão

1. **Reordenação Flexbox no Mobile:** Adicionada a regra `.history-actions { order: 9; }` na media query de mobile (`@media (max-width: 768px)`) no `style.css` para colocá-la após o `.metrics-panel` (que tem `order: 8`).
2. **Estilização Responsiva:** Foram aplicadas correções de espaçamento (`margin-top: 0 !important;` e `padding: 1.5rem 1rem !important;`), largura total (`width: 100%;`) e fundo translúcido (`background: rgba(0, 10, 0, 0.4) !important;`) com borda superior sólida para garantir que a seção se integre visualmente com as outras seções do layout colapsado em mobile.

### Consequências

- Na versão desktop, o "Registro Histórico" continua no rodapé da barra lateral de métricas.
- Na versão mobile, a seção agora é renderizada corretamente ao final de todo o conteúdo da página, preservando a hierarquia de leitura e a fluidez do layout responsivo de forma harmoniosa com o tema Cyberpunk.

---

## [2026-06-27] Melhoria na Legibilidade de Tarefas Concluídas (Kanban)

### Contexto

O usuário observou que as tarefas concluídas (done) no Kanban ficavam muito escuras e difíceis de ler, devido ao uso da cor verde escura (`--matrix-dim`) e baixa opacidade (`0.4`). Solicitou um tom intermediário para tornar a leitura legível, mantendo o aspecto de tarefa feita.

### Decisão

1. **Ajuste de Opacidade:** Aumentada a opacidade de `.task-card.done` de `0.4` para `0.6` no arquivo `style.css`.
2. **Uso de Cor Intermediária:** Alterada a cor do texto da tarefa concluída (`.task-card.done .task-text`) de `var(--matrix-dim)` para `var(--matrix-dim-medium)`, aproveitando a cor intermediária existente que se adapta dinamicamente aos modos Matrix Green, Agent Purple e Break Blue.

### Consequências

- Excelente leitura das tarefas concluídas em todos os três temas do aplicativo.
- O card continua visualmente identificável como concluído graças à linha tracejada (line-through), check ativo e opacidade ligeiramente reduzida, mas agora totalmente legível.

---

## [2026-06-29] Implementação do Painel de Uso de Planos de IA

### Contexto

O usuário solicitou a inclusão de um painel de uso de Planos de IA contendo as IAs **Claude**, **Codex**, **Antigravity**, **OpenRouter** e **Groq**. O painel deve ser inserido acima da seção de missões, conter barras com porcentagem iniciando em 0% e indo até 100%, permitir a alteração do valor através de duplo clique e apresentar cores customizadas para cada plano no tema cyberpunk.

### Decisão

1. **Estrutura HTML:** Adicionar o container `.ai-plans-panel` contendo os 5 indicadores de planos de IA na barra lateral esquerda (`index.html`), logo acima do log de missões.
2. **Estilização Cyberpunk:** Definir no CSS (`style.css`) regras de layout e gradientes de cores neon permanentes para cada uma das IAs: Claude (Laranja Coral), Codex (Ciano), Antigravity (Roxo/Violeta), OpenRouter (Verde Esmeralda) e Groq (Amarelo Vibrante). O hover de cada linha utilizará a cor específica de cada IA (`currentColor`).
3. **Persistência de Dados:** Expandir o `gameState` no JavaScript (`script.js`) com o objeto `aiPlans`, iniciando todos com o valor `0`. Implementar a carga e restauração deste objeto em `loadGame()` garantindo retrocompatibilidade para perfis locais.
4. **Interatividade (Duplo Clique):** Desenvolver as funções `updateAiPlansUI()` e `initAiPlansListeners()` em `script.js` para registrar eventos de duplo clique nas linhas dos planos, permitindo ao usuário definir um novo valor entre 0 e 100 via prompt e registrar essas ações no log de histórico.

### Consequências

- A barra lateral esquerda ganhou uma seção dinâmica e interativa para acompanhar o consumo dos planos de IA.
- A experiência visual foi enriquecida através de cores exclusivas que se mantêm fixas e independentes do modo de cor geral do Doroapp (Foco, Pausa ou Agente).
- A retrocompatibilidade de sessões e perfis salvos no navegador foi mantida com segurança.

---

## [2026-06-29] Resolução de Conflito de Seletores (Duplo Pop-up no Duplo Clique)

### Contexto

Ao testar a barra de uso de Planos de IA, o usuário relatou que, ao efetuar duplo clique em uma linha de IA para ajuste, eram exibidos dois pop-ups de prompt sequencialmente. Isso ocorria porque a classe `.metric-row` foi reutilizada para manter a consistência visual das barras de IA com as métricas de desempenho. Como resultado, o listener global de duplo clique de métricas (`initMetricsListeners`) e o de planos de IA (`initAiPlansListeners`) disparavam em paralelo.

### Decisão

1. **Refinamento do Seletor de Métricas:** Alterar a seleção em `initMetricsListeners()` para coletar apenas as métricas de desempenho originais através do seletor `.metric-row:not(.ai-plan-row)`.
2. **Programação Defensiva:** Adicionar checagem precoce (`if (!metricKey) return;`) no processador de duplo clique de métricas para evitar comportamento inesperado caso alguma linha futura de `.metric-row` não possua o atributo `data-metric`.

### Consequências

- Eliminada a exibição de pop-ups duplicados ao ajustar o percentual de uso dos Planos de IA.
- A consistência do design foi preservada sem a necessidade de duplicar ou alterar nomes de classes CSS do layout.

---

## [2026-06-29] Otimização de Espaço, Alinhamento Inline dos Planos de IA e Remoção de Ícones

### Contexto

Para otimizar o espaço visual da tela e evitar ruídos redundantes na UI Cyberpunk, o usuário solicitou remover todos os ícones/emojis das IAs e das colunas do Kanban (mantendo apenas os ícones das métricas de desempenho originais), colocar as barras de planos de IA na mesma linha de seus nomes e aproximar a listagem do título "Planos de IA".

### Decisão

1. **Remoção de Emojis do Kanban:** Editado `index.html` para remover os emojis `🎯`, `🔥` e `⭐` dos títulos das colunas do Kanban. Removido o emoji `🍅` do badge de pomodoro das tarefas no renderizador (`script.js`).
2. **Remoção de Emojis das IAs:** Editado `index.html` para remover os spans `.metric-icon` contendo `🤖`, `💻`, `🌌`, `🔌` e `⚡`.
3. **Layout Inline de IAs:**
   - Modificada a estrutura HTML dos planos de IA para alinhar o título, a barra e a porcentagem no mesmo nível hierárquico sob o container `.ai-plan-row`.
   - Adicionadas regras no CSS (`style.css`) para definir `.ai-plan-row` como flex horizontal (`flex-direction: row`), alinhar verticalmente ao centro, fixar largura mínima para os títulos das IAs (`min-width: 75px`), definir flex-grow para a barra (`flex: 1`) e alinhar porcentagens à direita (`min-width: 32px`).
4. **Espaçamento do Título:** Ajustado `margin-bottom` do `h3` dentro de `.ai-plans-panel` de `0.5rem` para `0.15rem` no CSS, diminuindo o espaço ocioso vertical.

### Consequências

- Visual da sidebar esquerdo e Kanban muito mais limpo, minimalista e focado, com redução drástica de ruído de emojis.
- Redução substancial de espaço vertical consumido pelo painel de planos de IA, mantendo o Doroapp ADHD-friendly e confortável de usar em telas menores.
- Alinhamento horizontal perfeito de todas as barras de planos de IA.

---

## [2026-06-29] Divisão da Cota Antigravity em AGY GEMINI e AGY CLAUDE

### Contexto

O usuário identificou que o plano de IA Antigravity possui, na realidade, duas cotas distintas (uma do Gemini e outra do Claude). Foi solicitado substituir a barra unificada "ANTIGRAVITY" por duas barras separadas denominadas "AGY GEMINI" e "AGY CLAUDE".

### Decisão

1. **Substituição Visual:** Editado o `index.html` para substituir o elemento `antigravity` pelas linhas correspondentes a `agy_gemini` e `agy_claude`.
2. **Estilização Cyberpunk:**
   - **AGY GEMINI** herdou a cor Roxa/Violeta original (`#b026ff`) do Antigravity.
   - **AGY CLAUDE** recebeu a cor Rosa Neon (`#ff007f`) para criar uma identidade visual distinta e contrastante.
3. **Persistência e Migração:**
   - O objeto `aiPlans` no `gameState` foi atualizado em `script.js` para usar as chaves `agy_gemini` e `agy_claude`.
   - Implementada lógica de migração no carregamento do estado (`loadGame`): se existirem dados persistidos na antiga chave `antigravity`, o valor é copiado automaticamente para `agy_gemini` para manter o histórico de progresso do usuário.

### Consequências

- O painel de Planos de IA passa a representar com fidelidade o uso real das cotas do Antigravity (Gemini e Claude separadamente).
- Preservação da retrocompatibilidade sem causar falhas no carregamento de dados do usuário.
- O visual do Doroapp se manteve fiel à identidade Cyberpunk com a introdução do tom Rosa Neon.

---

## [2026-06-29] Ajustes Finos de Espaçamento e Redução de Caixas da Sidebar

### Contexto

O usuário solicitou diminuir a distância entre a barra do plano de IA "Groq" e a seção de "Missões", bem como reduzir o tamanho dos retângulos (caixas) ao redor de cada plano de IA e de cada missão para melhorar a densidade de informações e visualização do espaço vertical.

### Decisão

1. **Redução do Espaçamento de Missões:** Alterado `margin-top` de `.mission-log` de `1.275rem` para `0.65rem` no `style.css`.
2. **Redução das Caixas de Planos de IA:** Reduzido o `padding` de `.ai-plan-row` de `0.25rem 0.6rem !important` para `0.18rem 0.5rem !important`.
3. **Redução das Caixas de Missões:** Reduzido o `padding` de `.mission-item` de `0.45rem 0.7rem` para `0.35rem 0.6rem` (e de `0.9rem 1rem` para `0.7rem 0.8rem` na media query mobile).

### Consequências

- Redução do scroll vertical na sidebar esquerda.
- Melhor agrupamento de elementos adjacentes, tornando o visual mais minimalista e esteticamente balanceado.

---

## [2026-06-29] Ajustes de Layout e Paleta de Cores Sóbria

### Contexto

Para melhorar a harmonia visual da barra lateral esquerda do Doroapp e evitar a fadiga visual, o usuário solicitou clarear o título referente ao Level (deixando-o mais legível e destacado), mudar a cor dos Planos de IA para versões mais sóbrias/desaturadas das cores atuais e mover a frase motivacional diária para que ela seja exibida acima da seção de "Missões".

### Decisão

1. **Reordenação do Layout da Sidebar**: No arquivo `index.html`, o contêiner `.daily-quote` (`#quote-container`) foi movido para antes da seção `.mission-log` (Missões), mantendo o fluxo natural de leitura visual descendente.
2. **Nova Paleta de Cores para Planos de IA**: No arquivo `style.css`, as cores neon vibrantes anteriores foram desaturadas (saturação em torno de 40-60%) para criar tons mais sóbrios e sofisticados:
   - **Claude**: Laranja coral -> Laranja terracota (`#cf8567`)
   - **Codex**: Ciano neon -> Ciano acinzentado (`#5ecad1`)
   - **AGY GEMINI**: Roxo elétrico -> Lavanda sóbrio (`#a66acb`)
   - **AGY CLAUDE**: Pink choque -> Rosa antigo sóbrio (`#cf5a95`)
   - **OpenRouter**: Verde brilhante -> Verde sálvia sóbrio (`#4ea387`)
   - **Groq**: Amarelo elétrico -> Ouro/Mostarda sóbrio (`#cca958`)
3. **Clareamento do Título de Level**: Alterada a cor de `.level-info h2` do verde padrão elétrico para um tom de verde neon suave e mais claro (`#70ff97`), com overrides mapeados para manter essa maior clareza e contraste nos modos agente (`#d27eff`) e pausa (`#b2f0ff`).

### Consequências

- A barra lateral esquerda ganhou uma hierarquia de leitura melhor, com a frase diária se integrando logo acima das missões.
- As barras de Planos de IA tornaram-se muito mais integradas ao visual escuro e profissional do Doroapp, diminuindo a poluição visual causada pelos gradientes saturados em excesso.
- O título de nível agora possui maior destaque visual devido à maior luminosidade de sua cor.

---

## [2026-06-29] Ajustes de Suavização Estética e Cores Sóbrias das Tasks

### Contexto

Para refinar a experiência visual do usuário e reduzir a poluição cromática, foram solicitados ajustes pontuais na intensidade dos ícones de métricas pessoais, no brilho da frase motivacional, na sobriedade das tarefas e no tom do verde do Level (que parecia azulado).

### Decisão

1. **Intensidade dos Ícones de Métricas Pessoais**: Reduzida a opacidade padrão do seletor `.metrics-panel .metric-icon` para `0.65` e aplicada uma leve dessaturação (`grayscale(0.15)`) para que os emojis fiquem menos chamativos. Adicionada uma transição de hover para restaurar `opacity: 0.95` e foco colorido ao interagir com a linha.
2. **Suavização do Brilho da Frase Motivacional**: Diminuída a opacidade da sombra da frase motivacional (`--quote-yellow-glow` de `0.15` para `0.08`) e reduzido o raio do `box-shadow` de `.daily-quote` de `15px` para `10px`.
3. **Cabeçalhos de Tasks Sóbrios**: Substituídas as cores semânticas vibrantes do título das colunas de tarefas (`Foco de Hoje`, `Urgentes`, `Importantes`) por tonalidades sóbrias, desaturadas e elegantes (baseadas no tema Nord):
   - **Urgentes**: Vermelho escuro/sóbrio (`#bf616a`)
   - **Importantes**: Âmbar/sóbrio (`#d8a657`)
   - **Foco de Hoje**: Azul acinzentado/sóbrio (`#6c8db3`)
4. **Correção de Tom do Level (AGENTE: OFF)**: Substituída a cor `#70ff97` do título do level (que tinha viés azulado) pelo tom `#82ff8c` (verde clássico matrix clareado na matiz exata), preservando o restante da estética esmeralda.

### Consequências

- Redução da fadiga visual geral ao utilizar o painel de tarefas e acompanhar o progresso diário.
- Melhoria do alinhamento cromático do título do nível com o tom verde clássico do projeto.

---

## [2026-06-29] Bônus de 500 XP ao Atingir 100% de Uso nos Planos de IA

### Contexto

Para incentivar o progresso e a dedicação do usuário nos Planos de IA, foi solicitada a adição de uma bonificação de 500 XP sempre que o progresso de qualquer um dos planos (Claude, Codex, AGY Gemini, AGY Claude, OpenRouter, Groq) atingir a marca de 100%.

### Decisão

1. **Implementação de Bônus de XP**: Na função `initAiPlansListeners()` do `script.js`, adicionamos uma verificação. Se o novo valor inserido for igual a 100 e o valor anterior for inferior a 100, é adicionada a quantidade de 500 XP ao estado do jogo (`gameState.xp`).
2. **Prevenção de Exploit**: A verificação garante que a bonificação de 500 XP só seja disparada quando o plano "atinge" 100% (ou seja, quando sai de um valor inferior a 100 e atinge 100). Atualizações consecutivas de 100 para 100 não geram XP extra.
3. **Feedback Visual e de Histórico**: É disparado um alerta customizado ao usuário sobre a conquista do bônus e o ganho de 500 XP é registrado no parâmetro correspondente da função `logHistoryEvent()`, garantindo que o histórico local mapeie a recompensa.

### Consequências

- Gamificação do uso das ferramentas de IA mais atraente com recompensas mais expressivas de progresso.
- Histórico de eventos consistente com o XP ganho.

---

## [2026-06-29] Centralização dos Títulos de Tasks e Título de Evolução Pessoal

### Contexto

Para melhorar a clareza e simetria do layout visual do Doroapp, o usuário solicitou centralizar os títulos dentro da caixa das colunas de tarefas (Foco de Hoje, Urgentes, Importantes) e adicionar o título "EVOLUÇÃO" logo acima das barras de progresso de desenvolvimento pessoal. Posteriormente, solicitou aproximar o título "EVOLUÇÃO" das barras de progresso.

### Decisão

1. **Centralização dos Títulos de Tasks**: Adicionado um elemento `<span class="column-spacer"></span>` com largura de 24px no início de cada `.column-header` no arquivo `index.html` para servir de contra-peso ao botão de adicionar tarefa (`.btn-add-task`, também com 24px de largura). No arquivo `style.css`, atualizou-se `.column-title` com `text-align: center;` e `flex: 1;` para ocupar simetricamente o centro do contêiner flexbox.
2. **Título de Evolução Pessoal e Ajuste de Espaçamento**: Inserida a tag `<h3>EVOLUÇÃO</h3>` no topo de `.metrics-sidebar` no arquivo `index.html`. Para aproximar a linha de borda inferior do título em relação às barras de progresso, reduzimos em `style.css` o `margin-bottom` de `.metrics-sidebar h3` (de `0.75rem` para `0.4rem` no desktop, e de `1rem` para `0.5rem` no mobile) e o `margin-top` de `.metrics-panel` (de `1rem` para `0.4rem`).

### Consequências

- Os títulos das colunas de tarefas agora ficam perfeitamente centralizados horizontalmente nas caixas, mantendo a harmonia visual.
- A barra lateral de métricas pessoais exibe o título "EVOLUÇÃO" com um espaçamento muito mais compacto, integrado e harmônico acima das barras de progresso.

---

## [2026-06-29] Reordenação Drag & Drop e Edição Inline de Tarefas no Kanban

### Contexto

O usuário solicitou a capacidade de arrastar tarefas no quadro Kanban para alterar sua ordem física, e de poder editar o texto das tarefas criadas.

### Decisão

1. **Drag & Drop Nativo (HTML5)**: Adicionou-se o atributo `draggable="true"` em cada `.task-card`. No JavaScript, o arrasto é gerenciado manipulando os eventos nativos. O `dragover` na `.task-list` calcula dinamicamente qual card adjacente está mais próximo verticalmente e insere o card arrastado na posição física correspondente no DOM. No final do arrasto (`dragend` / `drop`), lemos a nova ordem física do DOM em todas as colunas para reconstruir o array `gameState.tasks` em memória, salvando no `localStorage`.
2. **Movimentação entre Colunas (Opção A)**: Permitiu-se arrastar tarefas entre colunas de prioridades distintas. Ao mudar uma tarefa de coluna, sua prioridade (`priority`) e o prêmio correspondente de conclusão (`xpReward`) são atualizados de forma automática (Urgente = 100 XP, Importante = 75 XP, Diária = 50 XP), registrando a movimentação no log de histórico.
3. **Edição Inline de Tarefas (Opção B)**: Adicionou-se um listener de duplo clique (`dblclick`) no texto da tarefa. Ao disparar, o card entra em estado de edição (desabilitando temporariamente seu arrasto), e o texto é substituído por um `<input>` inline contendo o texto da tarefa e suas tags (ex: `#estudo`). Ao teclar `Enter` ou perder o foco (`blur`), o novo texto e tags são validados, salvos no estado e o card é renderizado novamente. Teclar `Escape` cancela as alterações sem salvar.

### Consequências

- Melhora significativa na interatividade do Kanban do Doroapp, aproximando a aplicação de organizadores modernos de produtividade.
- Persistência e integridade do estado e do XP garantidos ao reordenar, reclassificar e editar tarefas de forma fluida.
- Zero dependência externa, mantendo a aplicação estática extremamente rápida e leve.

---

## [2026-06-29] Reordenação do Painel de Planos de IA no Layout Mobile

### Contexto

Na versão mobile, o painel de "Planos de IA" estava em posição não definida especificamente, tornando a ordem de leitura confusa e inconsistente. O usuário solicitou que, na visualização mobile, o painel de Planos de IA fosse posicionado logo abaixo da seção do Timer (Foco de Hoje / timer-container) e acima do quadro de tarefas (Kanban / board-section).

### Decisão

1. **Ajuste de Ordem no Flexbox Mobile**: No bloco `@media (max-width: 768px)` do arquivo [style.css](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp/style.css), definimos explicitamente `.ai-plans-panel` com `order: 4`.
2. **Deslocamento dos Componentes Seguintes**: Ajustamos o valor de `order` de todos os elementos subsequentes para acomodar a inserção:
   - `.board-section` mudou de `order: 4` para `order: 5`.
   - `.daily-quote` mudou de `order: 5` para `order: 6`.
   - `.mission-log` mudou de `order: 6` para `order: 7`.
   - `.metrics-sidebar h3` mudou de `order: 7` para `order: 8`.
   - `.metrics-panel` mudou de `order: 8` para `order: 9`.
   - `.history-actions` mudou de `order: 9` para `order: 10`.
3. **Consistência Estética e Espaçamento**: Adicionamos propriedades ao `.ai-plans-panel` sob mobile (`width: 100%`, `padding` e `border-top` sutil) para que a separação visual continue fluida e alinhada à estética Cyberpunk/Matrix.

### Consequências

- No mobile, a hierarquia agora é: Profile -> Hero Header -> Timer -> Planos de IA -> Quadro de Tarefas (Tasks) -> Frase Diária -> Missões -> Evolução (Métricas) -> Registro Histórico.
- Layout limpo, responsivo e que atende exatamente ao fluxo intuitivo de acompanhamento solicitado pelo usuário.

---

## [2026-06-29] Alteração do Título do Nível 0 (Lvl 1)

### Contexto

O usuário solicitou a alteração do título do primeiro nível (nível 0 no array, mas exibido/identificado como o primeiro nível) de "MOTORISTA 5 ESTRELAS" para "PERDIDO NA TOCA DO COELHO" para alinhar melhor o tema de progressão à atmosfera do sistema.

### Decisão

1. **Atualização no Array de Níveis**: Alteramos a string no array `LEVELS` em `script.js` de `"Motorista 5 Estrelas"` para `"Perdido na Toca do Coelho"`.
2. **Atualização da Documentação**: Atualizamos as referências correspondentes no arquivo `levels.md` (lista de referência) e no `README.md` (seção de Funcionalidades Elite).

### Consequências

- O primeiro nível de progressão do usuário agora é exibido como "Perdido na Toca do Coelho", estabelecendo uma identidade mais próxima à temática cibernética e de imersão ("toca do coelho" da Matrix).

---

## [2026-06-29] Alteração da Cor da Frase Aleatória para Branco Gelo

### Contexto

O usuário solicitou alterar a cor da frase motivacional aleatória exibida na barra lateral para branco gelo, mantendo-se constante independentemente do modo ativo (Foco, Pausa ou Agente).

### Decisão

1. **Definição de Variáveis para Branco Gelo**: Substituímos as variáveis de cor amarelas antigas (`--quote-yellow` e `--quote-yellow-glow`) no `:root` do [style.css](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp/style.css) pelas novas variáveis do tom branco gelo com suave brilho azulado/frio (`--quote-ice-white: #edf4f5` e `--quote-ice-white-glow: rgba(237, 244, 245, 0.08)`).
2. **Atualização das Regras de Estilo**: Alteramos a borda, a cor do texto, a sombra do box `.daily-quote` e a cor do prompt do terminal interno para utilizar as novas variáveis de branco gelo.

### Consequências

- O contêiner da frase motivacional aleatória agora possui uma aparência "branco gelo" nítida e futurista, integrada ao tema Cyberpunk de forma sóbria e sem alterar de cor nas trocas de modo do Pomodoro.

---

## [2026-06-30] Implementação de Alerta de Hidratação a cada Hora (08:00 às 21:00)

### Contexto

O usuário solicitou um mecanismo de lembrete constante de beber água a cada hora cheia no intervalo de 08:00 às 21:00, incentivando a hidratação e a disciplina de forma integrada à gamificação do Doroapp.

### Decisão

1. **Modal de Alerta Customizado**: Criamos uma notificação visual integrada no `script.js` em formato de modal HTML injetado dinamicamente no DOM. Isso evita congelamento do thread principal do temporizador (como ocorreria com o uso de `alert()` nativo do JavaScript) e preserva as variáveis estéticas e de cor dinâmicas do Doroapp (Verde Matrix, Roxo Agente ou Azul Pausa).
2. **Notificação de Sistema (Web Notifications)**: Implementamos a integração com a API nativa de `Notification` do navegador para disparar avisos no sistema operacional caso o usuário esteja trabalhando em outra aba do navegador, mediante permissão solicitada no primeiro carregamento do app.
3. **Persistência de Estados de Alerta**: Para garantir que cada hora no intervalo (8h até 21h) dispare apenas um único alerta, adicionamos persistência local sob a chave `doroapp_water_alerts` no `localStorage`. Isso previne repetições de alertas ao recarregar a página dentro da mesma hora cheia e reseta automaticamente na virada do dia.
4. **Integração de Gamificação**: Ao confirmar no modal clicando em "BEBER ÁGUA (+XP)", o progresso da missão diária de água (ID 4) é incrementado automaticamente em 1 unidade via `incrementMissionProgress(4, 1)`, gerando as recompensas de XP normais e de bônus do aplicativo de forma integrada.

### Consequências

- Lembrança ativa de hidratação a cada hora no intervalo solicitado.
- Preservação da integridade do timer de Pomodoro e de todo o fluxo de foco principal.
- Integração gamificada perfeita com as missões de saúde biológica já existentes.

---

## [2026-07-01] Inclusão do OpenCode nos Planos de IA

### Contexto

O usuário solicitou adicionar o modelo/plano de IA **OpenCode** à lista de Planos de IA monitorados na barra lateral.

### Decisão

1. **Alteração na Interface**: Adicionada a linha do OpenCode no arquivo `index.html` logo abaixo do plano Groq, com o identificador `opencode`.
2. **Atualização da Lógica e Persistência**: Adicionado `opencode` na lista de planos em `script.js`, no estado padrão (`gameState.aiPlans`), nas rotinas de carregamento e reinicialização de dados.
3. **Estilização Dedicada**: Criada uma paleta de cores específica para o OpenCode no arquivo `style.css`, aplicando um tom azul futurista/cyberpunk (`#4d8afd`) com efeitos de sombra e gradiente na barra de progresso.

### Consequências

- O progresso do plano OpenCode passa a ser renderizado na interface.
- O plano OpenCode possui cor fixa (azul gelo cyberpunk) consistente com os demais planos de IA, mantendo a integridade estética da barra lateral.
- O usuário pode realizar duplo clique no OpenCode para ajustar o seu percentual de uso, que será persistido no `localStorage`.
- Atingir 100% no OpenCode concederá o bônus padrão de +500 XP.

---

## [2026-07-01] Alerta Visual por Horário na Missão de Água

### Contexto

O usuário solicitou que a missão diária de tomar água (ID 4) ficasse vermelha (em alerta piscante) nos horários específicos de 07:00, 10:00, 11:30 e 16:00, até que o respectivo clique de confirmação de consumo de água fosse efetuado.

### Decisão

1. **Associação de Metas Horárias**: Mapeamos os 4 horários para as metas progressivas da missão de água (de 0 a 4 copos):
   - A partir das 07:00: mínimo de 1 copo;
   - A partir das 10:00: mínimo de 2 copos;
   - A partir das 11:30: mínimo de 3 copos;
   - A partir das 16:00: mínimo de 4 copos.
2. **Alerta Visual Estético**: Integramos a função helper `isWaterAlertActive(mission)` para verificar se a hora atual exige um progresso maior do que o atual. Em caso positivo (o usuário está atrasado na hidratação), adicionamos a classe CSS `.medicine-alert` à linha da missão no `renderMissions()`, fazendo-a pulsar em vermelho neon em perfeita harmonia com o tema Cyberpunk do aplicativo.
3. **Indicação de Horários**: Modificamos a string de exibição da missão para adicionar a informação dos horários de disparo das cobranças de forma explícita na UI: `Beber 500ml de água (07h, 10h, 11h30, 16h)`.
4. **Reset Diário de Água**: Criamos a função unificada `checkDailyMissionsReset()` para centralizar o reset de remédios e resetar o progresso de água (`currentProgress = 0`, `completed = false`) no início de cada dia de forma robusta, atualizando a propriedade `lastDoneDate`.

### Consequências

- O usuário recebe avisos visuais imediatos e intuitivos caso atrase o cronograma de hidratação definido.
- O clique de confirmação retira o alerta de forma imediata (reatividade local).
- O progresso de água passa a ser redefinido para zero em cada nova data do sistema.

---

## [2026-07-01] Expansão da Lista de Quotes com Frases Inteligentes

### Contexto

O usuário solicitou adicionar frases motivacionais inteligentes à lista `QUOTES` do Doroapp, focando em Programação, Matrix, IA e Motivação, e distanciando-se de clichês superficiais. Posteriormente, notou-se que frases longas quebravam o layout da sidebar em muitas linhas.

### Decisão

1. **Seleção e Refinamento**: Propusemos uma lista de 20 frases intelectuais baseadas em analogias cibernéticas. Após feedback do operador, foram removidas 7 frases consideradas dispensáveis (números 1, 3, 4, 5, 8, 14 e 18), restando 13 frases de alto impacto.
2. **Compactação de Frases Longas**: Revisamos e reduzimos o comprimento das frases que excediam 100 caracteres (como a frase sobre automação e a frase sobre redes neurais) para mantê-las curtas, compactas e ideais para leitura na sidebar, preservando totalmente seu sentido.
3. **Integração no Estado**: Expandimos o array global `QUOTES` em `script.js` com a inserção das 13 frases definitivas ajustadas.

### Consequências

- O painel de frase aleatória diária/por foco do Doroapp ganha maior diversidade e relevância intelectual.
- O layout da sidebar é preservado sem quebras excessivas de linha, mantendo a estética minimalista e Cyberpunk.
- O tema Cyberpunk e de desenvolvimento de agentes é reforçado de maneira leve e direta.

---

## [2026-07-02] Implementação de Missões Editáveis (Nome e XP)

### Contexto

O usuário solicitou a capacidade de transformar as Missões em editáveis diretamente na interface do Doroapp, permitindo alterar tanto o nome da Missão quanto os valores de XP associados a elas, e garantir que essas edições sejam salvas permanentemente no navegador.

### Decisão

1. **Persistência de Edições no localStorage**: Modificamos a função `loadGame()` no arquivo [script.js](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp/script.js) para restaurar os campos `text`, `xp` e `bonusXp` de missões carregados do `localStorage` (se existirem), em vez de redefini-los todas as vezes pelos valores estáticos definidos no código.
2. **Diferenciação de Eventos de Clique**: Como o clique simples (`onclick`) em um item de missão executa uma ação instantânea de conclusão ou progresso, implementamos um atraso (`setTimeout` de 250ms) no clique simples combinado com o uso da propriedade `e.detail` para identificar cliques duplos. Caso um duplo clique seja detectado (`e.detail === 2`), o timeout do clique simples é cancelado e a edição é disparada sem acionar a conclusão da missão.
3. **Fluxo de Edição Inline (`editMission`)**: Criamos a função `editMission(id)` no `script.js` que solicita o novo nome da missão via prompt do navegador e, sequencialmente, solicita os novos valores de XP. A lógica diferencia missões que possuem `bonusXp` (como Foco e Água) e missões comuns, oferecendo prompts específicos para cada tipo.
4. **Indicação Visual**: Adicionamos o atributo `title` a cada item de missão renderizado, explicando o comportamento para facilitar a usabilidade: *"Clique simples para concluir/progredir | Duplo-clique para editar"*.

### Consequências

- O usuário consegue personalizar as missões (nome e XP) em tempo de execução sem mexer no código-fonte.
- As missões personalizadas são salvas no `localStorage` e recarregadas corretamente ao atualizar a página.
- A experiência de usabilidade mantém o mesmo padrão estático e cyberpunk do Doroapp (sem poluição visual de botões de edição, utilizando o prompt clássico já usado nas métricas e nome do operador).

## [2026-07-03] Expansao Planos de IA (Google AI Studio, Cerebras, NVIDIA, SambaNova)

### Contexto

Adicionados 4 novos provedores de IA ao painel de Planos de IA, cada um com cor propria discreta e elegante.

### Mudancas

1. **`script.js`**: Estado inicial `aiPlans` ganhou chaves `ai_studio`, `cerebras`, `nvidia`, `sambanova` (valor 0). Array de iteracao em `updateAiPlansUI` estendido.
2. **`index.html`**: 4 novas linhas `.ai-plan-row` inseridas apos OpenCode.
3. **`style.css`**: Blocos de cor para cada novo plano.

### Paleta de Cores

| Plano | Cor (texto/barra) | Gradiente escuro |
|---|---|---|
| AI Studio | Coral `#e06c75` | `#5c2a2e` |
| Cerebras | Teal `#4db8a0` | `#1e4038` |
| NVIDIA | Verde lima `#7ab04a` | `#334a1e` |
| SambaNova | Violeta `#b07cc9` | `#3d2552` |

### Consequencias

- Painel passou de 7 para 11 planos.
- Compatibilidade retroativa mantida (planos novos iniciam em 0 se carregados de save anterior).

## [2026-07-06] Melhorias no Sistema de Missões e Alertas do Doroapp

### Contexto

O usuário solicitou melhorias no comportamento das missões:
1. Corrigir a falha de persistência onde a edição de nomes das missões não era mantida ao recarregar o navegador.
2. Permitir que o horário das missões do tipo "Hora do Foco" (onde a linha fica vermelha) seja editável.
3. Fazer com que a missão "Malhar" também fique vermelha (alerta visual) diariamente às 06:30.
4. Alterar a ordem das missões exibidas na tela conforme uma nova disposição de prioridades.

### Decisão

1. **Persistência Completa no LocalStorage**: Corrigimos a função `loadGame()` em [script.js](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp/script.js) para restaurar não apenas a conclusão das missões, mas também os campos `text`, `xp`, `bonusXp` e `triggerTime` a partir dos dados do `savedMission` persistidos no `localStorage`.
2. **Edição do Horário de Disparo (`triggerTime`)**: Adicionamos um prompt opcional na função `editMission(id)` de [script.js](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp/script.js) para que, caso a missão possua a propriedade `triggerTime`, o usuário possa editar o seu valor (exibido na interface) com validação de formato `HH:MM`.
3. **Alerta de Horário na Missão "Malhar"**: Adicionamos a propriedade `triggerTime: "06:30"` à missão "Malhar" (ID 6) no array inicial de missões e unificamos a lógica de comportamento. Agora, qualquer missão (medicamento ou comum) que possua o atributo `triggerTime`:
   - Fica vermelha (pulsando na classe `.medicine-alert`) após passar o horário correspondente no dia caso ainda não esteja concluída;
   - Funciona como missão diária fixa no `toggleMission()` (mantém-se concluída pelo resto do dia e atualiza a propriedade `lastDoneDate`, evitando o auto-reset rápido de 1.5s das missões repetitivas);
   - Reseta no início do dia seguinte na rotina global `checkDailyMissionsReset()`.
4. **Reposicionamento Físico**: Reordenamos os objetos no array `gameState.missions` inicial no código para respeitar a ordem: Malhar (1º), Água (2º), Meditar (3º), Aeróbico (4º), as duas Hora do Foco (5º e 6º), Marco (7º), Dia sem Doomscrolling (8º) e por fim 2h de foco (9º). Como a restauração no `loadGame` é mapeada a partir do array estático do código, essa ordem é herdada e exibida com perfeição.

### Consequências

- O nome e o horário de qualquer missão personalizada ficam persistidos permanentemente no navegador.
- Missões com horário de compromisso (como "Malhar" e "Hora do Foco") comportam-se de forma consistente e integrada como tarefas diárias únicas e com alertas vermelhos vibrantes após o horário de disparo.
- A listagem de missões passa a respeitar a nova ordem de prioridade diária estabelecida pelo usuário.

## [2026-07-06] Painel de Planos de IA Recolhível

### Contexto

O usuário solicitou um botão de recolher ao lado de 'Planos de IA', para ocultar a seção quando não estiver em uso. Isso economiza espaço na tela, permitindo focar em aspectos mais imediatos como as Missões logo abaixo (tanto no desktop quanto no mobile).

### Decisão

1. **Estrutura HTML (`index.html`)**: Substituímos o cabeçalho simples do painel por um cabeçalho estruturado `.ai-plans-header` contendo o título `<h3>` e um botão de ação `<button id="btn-toggle-ai-plans" class="btn-collapse">` no estilo cyberpunk `[&minus;]` / `[+]`. Envolvemos a lista de planos na div `.ai-plans-content`.
2. **Estilização CSS (`style.css`)**: Definimos o alinhamento flexível da nova `.ai-plans-header`, o visual temático para `.btn-collapse` (sem bordas/fundo, cores em consonância com o tema cyberpunk e text-shadow de brilho sob hover) e a regra `.ai-plans-panel.collapsed .ai-plans-content { display: none; }` para recolhimento instantâneo.
3. **Lógica de Comportamento e Persistência (`script.js`)**: Criamos a função `initAiPlansCollapse()` para ler o estado de recolhimento (`doroapp_ai_plans_collapsed`) do `localStorage`, aplicando a classe `collapsed` e atualizando o texto do botão correspondente no carregamento inicial (`DOMContentLoaded`). O listener de clique no botão alterna o estado do painel, salva o novo estado no navegador e modifica o caractere visual do botão entre `[−]` (expandido) e `[+]` (recolhido).

### Consequências

- Usuários que não utilizam planos de IA ou querem focar nas missões/Kanban podem recolher a seção com um clique.
- O estado recolhido é persistido entre recarregamentos de página, poupando espaço valioso de tela.
- Mantida a estética retrô/cyberpunk do sistema.

---

## [2026-07-12] Importação de Histórico e Servidor Local de Backup

### Contexto

O usuário solicitou uma maneira de importar arquivos de logs/histórico exportados pelo Doroapp em novos navegadores para sincronizar o progresso de logs manualmente, bem como automatizar o salvamento desses logs localmente em disco na pasta `05_Vida/doroapp/log-registros-local/`.

### Decisão

1. **Botão IMPORTAR LOG (`index.html`)**: Adicionamos o botão "IMPORTAR LOG" e um input de arquivo oculto ao lado do botão "EXPORTAR LOG" no menu lateral direito.
2. **Leitura e Validação de JSON (`script.js`)**: Implementamos no JavaScript a leitura do arquivo JSON importado via `FileReader`. O app valida se o arquivo é um array JSON de histórico legítimo, substitui a chave `doroapp_history_log` no `localStorage` após confirmação do usuário e atualiza a contagem exibida na interface.
3. **Servidor Local de Backup (`scripts/backup-server.js`)**: Criamos um servidor local Node.js sem dependências, projetado para rodar em background via PM2. Ele escuta requisições na porta `19191` e grava arquivos formatados de histórico e estado (`doroapp-historico-YYYY-MM-DD.json` e `doroapp-save-YYYY-MM-DD.json`) na pasta local de logs.
4. **Sincronização de Logs (`script.js`)**: Adicionamos a função `backupLogLocalmente()` no Doroapp para enviar os logs do localStorage via POST para o servidor local no carregamento da página (`DOMContentLoaded`) e toda vez que um novo evento de histórico é inserido. A requisição falha de forma silenciosa e não bloqueante se o servidor local de backup estiver offline.

### Consequências

- Facilidade para transferir o histórico de logs entre diferentes navegadores através do upload do JSON.
- Backup local 100% automatizado, atualizado a cada ação executada no Doroapp ou ao recarregar a página, gravando os arquivos diretamente na pasta de preferência do usuário (`log-registros-local/`).
- Mantida a resiliência e portabilidade do Doroapp estático, rodando offline e no Vercel sem dependências locais obrigatórias.

---

## [2026-07-12] Substituição do Favicon por Design Autoral (SVG Minimalista & PWA Manifest)

### Contexto

O Doroapp utilizava um favicon genérico do Matrix (`imagens/icons8-neo.svg`). Havia a necessidade de possuir um favicon autoral conectado à lore do projeto (nível inicial "Perdido na Toca do Coelho") em estilo de ficção científica (sci-fi), com minimalismo, transparência e consistência tanto na aba do navegador quanto quando instalado como Chrome App (PWA) ou em notificações nativas.

### Decisão

1. Criar um favicon autoral ultra-minimalista no formato SVG contendo o desenho em wireframe geométrico de um coelho (linhas brancas) e um visor horizontal verde neon.
2. Salvar o arquivo gerado como `doroapp_favicon.svg` na pasta `imagens/`.
3. Atualizar o `index.html` para carregar o novo favicon em formato SVG (`type="image/svg+xml"`).
4. Adicionar um arquivo de manifesto web (`manifest.json`) especificando metadados de PWA e o ícone SVG com tamanho dinâmico (`sizes: "any"`), vinculando-o no `index.html`. Isso garante que o instalador do Chrome no Windows utilize o ícone do coelho transparente para o app instalado, em vez de gerar um ícone padrão com a letra "D".
5. Atualizar o caminho de ícone de notificações de hidratação no `script.js` para usar o novo favicon SVG.

### Consequências

- Identidade visual autoral, moderna e coesa em todas as interfaces: aba do navegador, atalho do Chrome App (PWA) no Windows e popups de notificações do sistema.
- Uso do formato SVG garante transparência perfeita em qualquer tema de fundo, peso inferior a 1KB e renderização vetorial nítida.

---

## [2026-07-13] Refatoração e Reposicionamento do Protetor de Tela (SYS AMBIENT)

### Contexto

O botão de protetor de tela "SYS AMBIENT" estava localizado na div central `.status-indicator` poluindo visualmente a área do temporizador principal. Além disso, o comportamento do protetor de tela continha problemas de usabilidade:
1. Qualquer movimento infinitesimal do mouse (1px) ou digitação de teclado fechava o protetor de tela instantaneamente. Isso impedia o usuário de ativar manualmente o protetor em um monitor/janela e interagir com outros aplicativos/páginas no computador.
2. O temporizador de inatividade padrão (30s) não possuía chave de desativação (on/off).

### Decisão

1. Mover o botão "SYS AMBIENT" da div central `.status-indicator` para o painel `.sys-config-panel` (Configurações) na sidebar esquerda inferior.
2. Adicionar uma nova configuração do tipo select "AUTO MATRIX (30s)" em `.sys-config-panel` para habilitar ou desabilitar a ativação automática do protetor por inatividade, persistida na propriedade `gameState.ambientAutoActive`.
3. Ajustar os estilos CSS no `.sys-config-panel` com a criação da classe `.btn-config`, mantendo a harmonia dimensional e estética Cyberpunk.
4. Alterar a função `resetInactivityTimer` no `script.js` eliminando o fechamento automático da chuva Matrix ao registrar movimentação de periféricos. O fechamento agora é delegado exclusivamente ao evento de clique no próprio canvas do protetor (`matrixCanvas`) ou pressionando a tecla `ESC`.
5. Condicionar o temporizador de 30s de inatividade na função `resetInactivityTimer` ao estado de `gameState.ambientAutoActive`.

### Consequências

- Redução da poluição visual no dashboard de foco central do Pomodoro.
- O protetor de tela Matrix Rain agora funciona como um protetor autêntico e persistente, permitindo focar em tarefas ou usar outros aplicativos em segundo plano sem que ele se feche sozinho com pequenas movimentações de mouse.
- Interface de configurações unificada na sidebar esquerda com controle explícito e persistente do protetor automático.

---

## [2026-07-13] Adição do Botão Full-screen e Atalho de Teclado

### Contexto

Necessidade de alternar o aplicativo Doroapp para tela cheia de forma rápida para aumentar a imersão no protocolo de foco profundo (Deep Focus), seja por interação direta na interface ou por atalho rápido no teclado.

### Decisão

1. Adicionar um botão "FULL SCREEN" no painel de configurações na barra lateral esquerda (`.sys-config-panel`) do `index.html`.
2. Implementar a lógica utilizando a Fullscreen API do navegador (`requestFullscreen`/`exitFullscreen`) no `script.js` em uma função centralizada `toggleFullscreen()`.
3. Associar a tecla "f"/"F" no tratador global de eventos de teclado `keydown` (quando não estiver com foco em inputs ou textareas) para alternar a tela cheia.

### Consequências

- O usuário consegue alternar o Doroapp para tela cheia com um clique no botão na barra lateral ou pressionando a tecla "F".
- Mantém o foco sem distrações visuais do navegador de forma simples e compatível com navegadores modernos.

---

## [2026-07-13] Adição de Escolha do Tempo de Inatividade do Protetor e Controle de Ruído Cinza

### Contexto

Para melhorar a customização visual e auditiva no doroapp:
1. O tempo de inatividade para acionar o protetor de tela (Matrix Rain) era fixado rigidamente em 30 segundos. Desejava-se a flexibilidade de poder escolher durações maiores ou desativá-lo completamente.
2. Havia necessidade de ter um gerador de som ambiente/ruído focado que rodasse continuamente em segundo plano sem overengineering e que pudesse ser controlado (ligado/desligado e volume).

### Decisão

1. Modificar a configuração "AUTO MATRIX" no `.sys-config-panel` para um seletor que unifica ativação e tempo de inatividade com opções: Desativado, 15s, 30s, 1m, 2m, 5m.
2. Adicionar o controle de "RUÍDO CINZA" na barra lateral contendo um botão compacto ON/OFF e um slider de volume estilizado customizadamente (`.sys-slider`) no tema Cyberpunk, variando de 0 a 100%.
3. Implementar um gerador de áudio aveludado de alta performance baseado em Web Audio API. Para evitar sibilâncias agudas de alta frequência (que soam como estática ou "fritura"), o áudio do buffer circular de 2.0s é sintetizado utilizando o algoritmo matemático de **ruído marrom (Brownian noise)** por meio de uma integração acumulativa de amostras de ruído branco no domínio do tempo. O som aveludado resultante é alimentado diretamente no GainNode (sem filtros biquad de sibilância). O ganho total de sinal é limitado a 15% (`maxGain = 0.15`) e a resposta do slider de volume é mapeada por uma curva exponencial quadrática para fornecer maior sensibilidade e suavidade em faixas baixas (ex: 1% a 10%).
4. Adicionar um tratador especial de interação do usuário (`click`, `keydown`) de uso único para desbloquear e resumir o `AudioContext` suspenso nativamente por restrições dos navegadores, dando execução imediata ao ruído cinza caso esteja ativado no estado de carregamento.
5. Persistir `ambientAutoTimeout` (segundos), `grayNoiseActive` (boolean) and `grayNoiseVolume` (number) no `gameState` e no `localStorage` de forma retrocompatível.

### Consequências

- Customização total do tempo de inatividade do protetor de tela, prevenindo distrações indesejadas.
- Inclusão de um gerador acústico embutido que atua no isolamento de ruído ambiente de forma extremamente aveludada, imersiva e natural (soando como o barulho relaxante de uma cachoeira ou chuva distante), sem exigir consumo excessivo de CPU ou carregamento de arquivos externos.
- UX aprimorada com persistência de estado, controles cyberpunk e resposta de volume altamente precisa em volumes sutis.

---

## [2026-07-13] Renomeação do Bloqueio de Tela e Controle de Volume do Teclado

### Contexto

Para melhorar a clareza textual e o controle auditivo no Doroapp:
1. O texto "AMBIENT TELA: SYS AMBIENT" do protetor de tela causava estranheza. Desejava-se alterar para "BLOQUEAR TELA: MATRIX", alinhado à estética e propósito do recurso.
2. Os sons de teclado mecânico (Cherry MX Brown, Red, Blue) ao digitar tinham volumes estáticos definidos via código. Era necessário adicionar um controle de volume (0-100) ajustável e persistente pelo usuário diretamente no painel.

### Decisão

1. Renomear o texto explicativo da linha correspondente a Matrix Rain para "BLOQUEAR TELA:" e o texto do botão de ativação para "MATRIX" no arquivo `index.html`.
2. Adicionar um controle deslizante de volume (`#slider-keyboard-vol` de classe `.sys-slider`) e a respectiva label de percentual (`#label-keyboard-vol`) em uma nova linha ("VOL TECLADO") abaixo da linha de seleção do switch de teclado ("TECLADO") no painel lateral do `index.html`, evitando poluição visual e encavalamento de elementos.
3. Adicionar a variável `keyboardVolume` (valor inicial de 80) no `gameState` para persistência no `localStorage`.
4. Refatorar a lógica de geração de som do teclado no `script.js` dentro da função `playKeyboardSound()` para criar um nó de ganho centralizado (`keyboardGain`) que multiplica os ganhos originais do tipo de switch pelo volume do teclado, permitindo atenuação e amplificação suave.
5. Adicionar listeners para monitoramento do slider e atualização dinâmica do volume e da label em tempo real.

### Consequências

- A interface de configurações ficou mais intuitiva com as novas nomenclaturas ("BLOQUEAR TELA: MATRIX").
- O usuário agora possui controle total de volume sobre os sons de digitação do teclado (0-100), permitindo uma experiência tátil-auditiva sob medida e persistida no navegador.

---

## [2026-07-13] Redução da Velocidade do Protetor de Tela Matrix

### Contexto

O usuário solicitou que a velocidade da queda dos caracteres no bloqueio de tela "Matrix" fosse reduzida para proporcionar uma experiência de foco mais calma ("chill").

### Decisão

1. Reduzir o incremento de posição de queda vertical (`matrixDrops[i]`) de `1` para `0.3` a cada chamada de frame (`drawMatrixRain()`), diminuindo a velocidade em aproximadamente 3.3 vezes.
2. Alterar o cálculo da coordenada `y` do texto para `Math.floor(matrixDrops[i]) * matrixFontSize`. Isso arredonda a posição para a linha exata da fonte de forma pixel-perfect, evitando anti-aliasing (borrado) que ocorreria ao renderizar caracteres em coordenadas de pixels fracionadas.

### Consequências

- A chuva de códigos Matrix agora cai em um ritmo muito mais relaxante e calmo, reduzindo a distração visual na tela de bloqueio.
- Os caracteres continuam com renderização perfeitamente nítida devido ao alinhamento pixel-perfect baseado no grid da fonte.

---

## [2026-07-15] Novo Favicon Coelho Branco Minimalista de Perfil

### Contexto

O usuário solicitou a criação de um novo favicon para o Doroapp com a imagem de um coelho branco minimalista, de corpo inteiro e visto de lado (de perfil).

### Decisão

1. Fazer o backup do favicon original (`imagens/doroapp_favicon.svg` com estilo cyberpunk de óculos verde neon) como `imagens/doroapp_favicon_original_cyberpunk.svg`.
2. Substituir `imagens/doroapp_favicon.svg` com a silhueta geométrica clássica do coelho sólido de perfil, ajustando a centralização vertical (Y + 4) e aplicando um filtro de sombra projetada (`feDropShadow`) para garantir alto contraste contra fundos claros e escuros de navegadores.
3. Manter a orelha traseira sombreada em cinza claro (`#cccccc`) para dar profundidade tridimensional ao design geométrico original.

### Consequências

- O aplicativo Doroapp agora exibe um favicon minimalista de coelho branco sólido em perfil no navegador, atendendo à identidade visual clássica e reconhecível.
- A compatibilidade de renderização foi preservada em qualquer tema do navegador do usuário, graças à sombra de contraste aplicada.
- A referência no `manifest.json` e `index.html` permanece apontada para `imagens/doroapp_favicon.svg`, assegurando que o deploy e cache sejam atualizados sem quebras estruturais.
