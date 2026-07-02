# Protocolo de Agentes: Doroapp

## Interacao ADHD-Friendly

- **Destaques:** Use **negrito** para palavras-chave e informacoes cruciais.
- **Estrutura:** Prefira **listas curtas** e topicos em vez de paragrafos longos.
- **Clareza:** Va direto ao ponto. Divida informacoes complexas em blocos.
- **Espacamento:** Utilize quebras de linha generosas entre secoes.

## Protocolos de Operacao

### 1. Commits Atomicos

- **Regra:** Realize commits pequenos e focados em uma unica mudanca.
- **Exemplo:** Separe alteracoes de CSS de alteracoes de JavaScript.

### 2. Auto-Correcao e Validacao

- **Regra:** Valide o codigo (sintaxe, bugs obvios) antes de finalizar.
- **Acao:** Use ferramentas de lint ou teste sempre que possivel.

### 3. Preservacao Estetica (Cyberpunk)

- **Regra:** **PROIBIDO** quebrar a estetica Glitch/CRT e o tema Cyberpunk.
- **Acao:** Verifique visualmente qualquer alteracao na interface.

### 4. Seguranca de Comando

- **Regra:** "Ler primeiro, Agir depois".
- **Acao:** Use `ls` ou `view_file` antes de deletar ou sobrescrever arquivos.

### 5. Definicao de Pronto (Deploy Producao)

- **Regra:** Mudancas apenas locais **nao** significam tarefa concluida. O trabalho so e considerado concluido quando estiver **rodando em producao no Vercel** (apos o *git push* para o GitHub).
- **Proibicao:** **PROIBIDO rodar ou iniciar qualquer tipo de servidor local (ex: Python HTTP Server, Node, Live Server) para desenvolvimento ou teste.** A validacao deve ser feita sempre e exclusivamente no deploy de producao na Vercel apos o push.
- **Acao:** Realize o commit, o push para o GitHub e confirme que o deploy na Vercel foi concluido com sucesso.


## Registro de Decisoes

- **Regra:** Nao utilize comentarios extensos no codigo para explicar decisoes
  arquiteturais.
- **Acao:** Registre todas as mudancas importantes e seus "porques" no arquivo [DECISIONS.md](./DECISIONS.md).

## Padroes de Comunicacao e Git

### Commits

- **Idioma:** Sempre escreva mensagens de commit em **Portugues do Brasil (pt-br)**.
- **Linguagem:** Utilize uma linguagem simples, direta e de facil
  entendimento para qualquer pessoa.
- **Estilo:** Evite jargoes tecnicos excessivos quando nao forem estritamente necessarios.

### Documentacao

- Ao atualizar o `README.md` ou outros documentos, mantenha o tom
  motivacional e a estetica do projeto (Cyberpunk / Dev / Matrix).
