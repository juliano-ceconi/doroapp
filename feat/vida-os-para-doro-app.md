# Aqui está a lista das **features recomendadas** do [vida-os](file:///d:/projetos/juliano-ceconi/05_Vida/vida-os) para implementação no [doroapp](file:///d:/projetos/juliano-ceconi/05_Vida/doroapp), ordenadas do **menor risco/maior valor** para o **maior risco/complexidade**. 

Adotando essa ordem, garantimos que o aplicativo **nunca quebre** em produção na **Vercel**, mantendo a persistência de dados no navegador via `localStorage` a cada passo.

---

## 1. 📋 Quadro Kanban / Checklist Local (Prioridade Máxima)

* **O que é:** Adicionar a seção de quadro (board) com as 3 colunas de tarefas: **Foco de Hoje**, **Urgentes** e **Importantes**.
* **Como fazer:** Implementar a UI estilizada no tema Cyberpunk e salvar os dados no `localStorage` do navegador.
* **Por que primeiro:** É a feature de produtividade que faz mais falta hoje no `doroapp` e tem **zero dependências externas**.

---

## 2. 🔗 Vinculação de Tarefa ao Timer (Task Link)

* **O que é:** Um menu de seleção (*dropdown*) abaixo do timer para escolher em qual tarefa ativa você está trabalhando.
* **Como fazer:** Quando o timer concluir:
  1. Incrementa o contador de pomodoros da tarefa.
  2. Concede o XP correspondente ao concluir a tarefa (Urgente = 100 XP, Importante = 75 XP, Diária = 50 XP).
* **Por que segundo:** Conecta a gamificação do timer diretamente com a lista de afazeres diários, criando o ciclo de recompensa principal.

---

## 3. 🏆 Sistema de Conquistas (Achievements)

* **O que é:** Um painel na barra lateral para exibir conquistas desbloqueadas (ex: *"Primeiro Foco"*, *"Mestre Iniciante"*, *"Protocolo Ativado"*).
* **Como fazer:** Integrar a verificação de regras ao finalizar tarefas ou pomodoros e salvar os estados das conquistas desbloqueadas no `localStorage`.
* **Por que terceiro:** Aumenta o fator de gamificação e motivação sem adicionar complexidade técnica ou risco ao core do app.

---

## 4. 📤 Exportação de Logs para CSV

* **O que é:** Um botão simples na interface para baixar um arquivo CSV com o histórico de missões e tarefas concluídas.
* **Como fazer:** Gerar o CSV dinamicamente a partir dos dados do `localStorage`.
* **Por que quarto:** Permite que você faça backup manual e acompanhe seu histórico antes de termos sincronização automática.

---

## 5. ☁️ Sincronização em Nuvem (Supabase + Auth)

* **O que é:** Integração com o banco de dados Supabase e login via Magic Link.
* **Como fazer:** Configurar o Supabase como armazenamento primário e usar o `localStorage` como **cache/fallback automático** caso você esteja offline.
* **Por que por último:** É a feature que **costuma dar mais problemas** (e provavelmente o que quebrou no `vida-os`). Deve ser feita com cuidado, mantendo o app 100% funcional de forma offline se o login não for realizado.

---

## 🚀 Próximo Passo

Se você concordar com essa ordem, me diga qual feature quer começar a implementar e faremos a alteração isolada!