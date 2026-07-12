const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 19191;
const LOGS_DIR = path.join(__dirname, '..', 'log-registros-local');

// Garantir que a pasta de logs existe
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  // Configurar cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com requisições preflight (CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Rota de salvamento de logs
  if (req.method === 'POST' && req.url === '/api/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        if (!data || !Array.isArray(data.history)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Formato inválido. Esperado objeto com array "history".' }));
          return;
        }

        // Obter data no formato local YYYY-MM-DD
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // Salvar histórico de logs
        const historyFileName = `doroapp-historico-${dateStr}.json`;
        const historyFilePath = path.join(LOGS_DIR, historyFileName);
        fs.writeFileSync(historyFilePath, JSON.stringify(data.history, null, 2), 'utf8');

        // Salvar estado do jogo (gameState) se presente
        let gameStateSaved = false;
        if (data.gameState) {
          const saveFileName = `doroapp-save-${dateStr}.json`;
          const saveFilePath = path.join(LOGS_DIR, saveFileName);
          fs.writeFileSync(saveFilePath, JSON.stringify(data.gameState, null, 2), 'utf8');
          gameStateSaved = true;
        }

        console.log(`[${new Date().toISOString()}] Backup realizado com sucesso para ${dateStr}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          historyFile: historyFileName,
          gameStateSaved: gameStateSaved 
        }));
      } catch (err) {
        console.error('Erro ao processar salvamento do backup:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor ao salvar arquivo.' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Recurso não encontrado.' }));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor de backup local rodando em http://127.0.0.1:${PORT}`);
});
