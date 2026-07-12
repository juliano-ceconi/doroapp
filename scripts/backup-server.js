const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 19191;
const LOGS_DIR = path.join(__dirname, '..', 'log-registros-local');
const MAX_HISTORY_FILES = 20;
const MAX_SAVE_FILES = 20;

// Garantir que a pasta de logs existe
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

/**
 * Remove arquivos excedentes no diretório mantendo apenas os mais recentes.
 */
function pruneOldFiles(dir, prefix, maxFiles) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`[Purga] Erro ao ler diretório para purga:`, err);
      return;
    }

    const targetFiles = files
      .filter(f => f.startsWith(prefix) && f.endsWith('.json'))
      .sort((a, b) => b.localeCompare(a));

    if (targetFiles.length > maxFiles) {
      const filesToDelete = targetFiles.slice(maxFiles);
      filesToDelete.forEach(file => {
        const filePath = path.join(dir, file);
        fs.unlink(filePath, unlinkErr => {
          if (unlinkErr) {
            console.error(`[Purga] Erro ao deletar arquivo antigo ${file}:`, unlinkErr);
          } else {
            console.log(`[Purga] Arquivo excedente removido: ${file}`);
          }
        });
      });
    }
  });
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

        // Obter data e hora locais no formato YYYY-MM-DD_HH-mm
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}_${hours}-${minutes}`;

        // Salvar histórico de logs
        const historyFileName = `doroapp-historico-${dateStr}.json`;
        const historyFilePath = path.join(LOGS_DIR, historyFileName);
        fs.writeFileSync(historyFilePath, JSON.stringify(data.history, null, 2), 'utf8');
        pruneOldFiles(LOGS_DIR, 'doroapp-historico-', MAX_HISTORY_FILES);

        // Salvar estado do jogo (gameState) se presente
        let gameStateSaved = false;
        if (data.gameState) {
          const saveFileName = `doroapp-save-${dateStr}.json`;
          const saveFilePath = path.join(LOGS_DIR, saveFileName);
          
          // Injetar o timestamp completo (ISO 8601) no gameState
          const gameStateWithTimestamp = {
            ...data.gameState,
            updatedAt: now.toISOString()
          };
          
          fs.writeFileSync(saveFilePath, JSON.stringify(gameStateWithTimestamp, null, 2), 'utf8');
          gameStateSaved = true;
          pruneOldFiles(LOGS_DIR, 'doroapp-save-', MAX_SAVE_FILES);
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
