# Registro de Plano: Alteração do Favicon no Doroapp (Revisado - PWA Manifest)
Data: 2026-07-12 13:29 (Local)

## Descrição
Correção do ícone de atalho exibido ao instalar o Doroapp como app (PWA) pelo Chrome, configurando o manifesto web oficial (`manifest.json`) apontando para o favicon SVG minimalista transparente.

## Alterações Planejadas
- Criar o arquivo `05_Vida/doroapp/manifest.json` com especificações do PWA e apontamento do ícone para `imagens/doroapp_favicon.svg`.
- Modificar o cabeçalho de `05_Vida/doroapp/index.html` para incluir `<link rel="manifest" href="manifest.json" />`.
- Atualizar a decisão no `DECISIONS.md`.
- Commit & Push das alterações.
