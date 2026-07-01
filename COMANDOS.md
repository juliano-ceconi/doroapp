# 🛠️ Comandos de Sincronização Manual (XP/Nível)

Como o progresso é salvo localmente no seu navegador, use estes comandos no
**Console do Navegador** (F12) caso mude de máquina ou queira ajustar seu
progresso.

## 📝 Como usar

1. Abra o site no Vercel (ou local).
2. Aperte `F12` e clique na aba **Console**.
3. **IMPORTANTE**: Copie apenas o código **DENTRO** dos blocos.
   **NÃO COPIE** as aspas/crases (```) do começo e do final.
4. Cole o comando e dê `Enter`.

---

## 🚀 Sincronizar Tudo (Comando Mestre)

Este comando define o estado completo. Use-o para migrar de máquina ou fazer um
reset total customizado.

```javascript
// Altere os valores conforme necessário
localStorage.setItem('doroappSave', JSON.stringify({
    xp: 5000, 
    level: 0, 
    missions: [], 
    streak: 0
})); 
location.reload();
```

---

## 💡 Exemplos Práticos

Cole estes comandos no console para ajustes rápidos:

### 1. Aumentar apenas o Nível para 3

Define o XP para 1200 (Mestre dos Workflows).

```javascript
localStorage.setItem('doroappSave', JSON.stringify({
    ...JSON.parse(localStorage.getItem('doroappSave') || '{"xp":0}'), 
    xp: 1200
})); 
location.reload();
```

### 2. Aumentar apenas o XP para 200

Soma 200 ao XP que você já tem.

```javascript
(function() {
    let d = JSON.parse(localStorage.getItem('doroappSave') || '{"xp":0}');
    d.xp = (d.xp || 0) + 200;
    localStorage.setItem('doroappSave', JSON.stringify(d));
    location.reload();
})();
```

### 3. Resetar Missões (Sem alterar XP)

Limpa apenas o status das missões atuais.

```javascript
(function() {
    let d = JSON.parse(localStorage.getItem('doroappSave') || '{"xp":0}');
    if (d.missions) {
        d.missions = d.missions.map(m => ({ ...m, completed: false }));
    }
    localStorage.setItem('doroappSave', JSON.stringify(d));
    location.reload();
})();
```

### 4. Modo Lenda (XP Máximo)

```javascript
localStorage.setItem('doroappSave', JSON.stringify({
    ...JSON.parse(localStorage.getItem('doroappSave') || '{"xp":0}'),
    xp: 300000
}));
location.reload();
```

### 5. Restaurar Streak (Ofensiva)

```javascript
localStorage.setItem('doroappSave', JSON.stringify({
    ...JSON.parse(localStorage.getItem('doroappSave') || '{"xp":0}'),
    streak: 15
}));
location.reload();
```

---

## 🧹 Resetar Tudo (Limpeza Total)

CUIDADO: Isso apaga todo o seu progresso local.

```javascript
localStorage.removeItem('doroappSave');
location.reload();
```
