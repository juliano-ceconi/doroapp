# Registro de Walkthrough: Substituição do Favicon do Doroapp por Design Autoral (SVG Minimalista & PWA Manifest)
Data: 2026-07-12 13:30 (Local)

## Resumo das Alterações
- Adicionado arquivo `imagens/doroapp_favicon.svg` contendo o coelho minimalista geométrico (linhas brancas com visor verde neon e fundo transparente nativo).
- Criado `manifest.json` com especificações PWA vinculadas ao favicon SVG com sizes "any" para que atalhos do Chrome App no Windows usem a imagem correta do coelho transparente.
- Modificado `index.html` para carregar o favicon e apontar para o `manifest.json`.
- Atualizado o ícone das notificações de água no `script.js` para usar o novo favicon SVG.
- Adicionado registro de decisão em `DECISIONS.md`.
- Commit e push realizados para deploy automático de produção no Vercel.

## Código do Favicon SVG Criado
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Orelhas e Rosto em Wireframe Branco -->
  <path d="M 35 45 L 30 15 L 45 45 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" fill="none" />
  <path d="M 65 45 L 70 15 L 55 45 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" fill="none" />
  <path d="M 45 45 L 50 45 L 55 45 L 70 65 L 50 85 L 30 65 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" fill="none" />
  <path d="M 50 45 L 50 85" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" fill="none" opacity="0.7" />
  <path d="M 45 45 L 50 85 L 55 45" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.5" />
  <!-- Visor Cyberpunk Verde Neon -->
  <line x1="36" y1="56" x2="64" y2="56" stroke="#00ff66" stroke-width="4.5" stroke-linecap="round" />
</svg>
```
