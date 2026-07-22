# Ajuste de cores do modo agente

## Objetivo

Manter o painel esquerdo verde quando `AGENTE: ON` estiver ativo e aplicar o
tema roxo somente ao conteúdo principal à direita.

## Alteração

- O escopo das variáveis roxas foi movido de `body.agent-mode-active` para
  `body.agent-mode-active .main-content`.
- Nenhuma estrutura HTML ou lógica JavaScript foi alterada.

## Validação

- `git diff --check`: concluído sem erros.
- Verificação estrutural: `.sidebar` está fora de `.main-content`, inclusive
  quando ambos usam `display: contents` no layout mobile, mantendo a herança
  das variáveis separada.
- A validação visual não pôde ser executada porque o navegador integrado não
  estava disponível nesta sessão.
