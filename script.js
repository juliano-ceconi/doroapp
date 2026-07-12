// Game State
let gameState = {
  xp: 1,
  level: 0,
  operatorName: "Juliano Ceconi",
  missions: [
    {
      id: 6,
      text: "Malhar",
      completed: false,
      xp: 500,
      triggerTime: "06:30",
      lastDoneDate: null
    },
    {
      id: 4,
      text: "Beber 500ml de água",
      completed: false,
      xp: 100, // XP per glass
      bonusXp: 200, // Bonus when reaching 4
      currentProgress: 0,
      targetProgress: 4,
      lastDoneDate: null
    },
    { id: 5, text: "Meditar", completed: false, xp: 500 },
    { id: 7, text: "Aeróbico", completed: false, xp: 500 },
    {
      id: "venvanse",
      text: "Hora do Foco",
      completed: false,
      xp: 100,
      isMedicine: true,
      triggerTime: "07:00",
      lastDoneDate: null
    },
    {
      id: "sertralina",
      text: "Hora do Foco",
      completed: false,
      xp: 100,
      isMedicine: true,
      triggerTime: "13:30",
      lastDoneDate: null
    },
    {
      id: 2,
      text: "Marco: Objetivo Atingido",
      completed: false,
      xp: 500,
    },
    { id: 3, text: "Dia sem Doomscrolling", completed: false, xp: 1000 },
    {
      id: 1,
      text: "2h de foco",
      completed: false,
      xp: 0, // XP por minuto (controlado pelo temporizador)
      bonusXp: 200, // Bônus ao atingir 2h
      currentProgress: 0,
      targetProgress: 120, // 120 minutos
    },
  ],

  streak: 0,
  lastLogin: null,
  agentMode: false,
  agentColor: 'purple',
  tasks: [],
  metrics: {
    productivity: 1,
    physical: 1,
    money: 1,
    emotional: 1,
    health: 1,
    spiritual: 1,
    eating: 1,
    water: 1,
    aerobic: 1,
    punctuality: 1,
  },
  aiPlans: {
    claude: 0,
    codex: 0,
    agy_gemini: 0,
    agy_claude: 0,
    openrouter: 0,
    groq: 0,
    opencode: 0,
    ai_studio: 0,
    cerebras: 0,
    nvidia: 0,
    sambanova: 0,
  },
  keyboardSwitch: 'none',
  activeTaskId: null,
  monoTaskingActive: false,
};

const AGENT_COLORS = {
  purple: { main: '#b026ff', glow: 'rgba(176,38,255,0.5)', dim: '#4c0082', dimMedium: '#7e12c0' },
  red:    { main: '#ff2b2b', glow: 'rgba(255,43,43,0.5)',   dim: '#4c0000', dimMedium: '#7e1212' },
  blue:   { main: '#3b82f6', glow: 'rgba(59,130,246,0.5)',  dim: '#1e3a5f', dimMedium: '#2d5aa0' },
  orange: { main: '#ff8c00', glow: 'rgba(255,140,0,0.5)',   dim: '#4c2a00', dimMedium: '#7e4600' },
  pink:   { main: '#ff4081', glow: 'rgba(255,64,129,0.5)',  dim: '#4c0026', dimMedium: '#7e1241' },
  white:  { main: '#e8e8e8', glow: 'rgba(232,232,232,0.5)', dim: '#4c4c4c', dimMedium: '#7e7e7e' },
};

// Config
const XP_PER_MINUTE = 4;
let currentFocusTime = 25;
let currentBreakTime = 5;
const XP_BASE = 7.65;
const XP_EXPONENT = 3;

function getRequiredXP(levelIndex) {
  if (levelIndex === 0) return 0;
  return Math.floor(XP_BASE * Math.pow(levelIndex, XP_EXPONENT));
}

const LEVELS = [
  "Perdido na Toca do Coelho",
  "Iniciado na Matrix",
  "Estudante de Lógica",
  "Iniciado em JSON",
  "Engenheiro de Prompt",
  "Mestre do Prompt",
  "Curioso do n8n",
  "Observador de Código",
  "Explorador de Nós",
  "Invocador de Webhooks",
  "Anomalia no Código",
  "Infiltrado no Sistema",
  "Hacker de Scripts",
  "Manipulador de Variáveis",
  "Domador de Bots",
  "Desenvolvedor de Agentes",
  "Scripter de Elite",
  "Especialista em Contexto",
  "Mestre dos Workflows",
  "Alquimista de Dados",
  "Mestre das APIs",
  "Integrador de Sistemas",
  "Otimizador Cibernético",
  "Estrategista de Automação",
  "Criador de Frameworks",
  "Arquiteto de Fluxos",
  "Tech Lead de IA",
  "Engenheiro de Machine Learning",
  "Especialista em Deep Learning",
  "Visionário de Dados",
  "Domador de LLMs",
  "Hacker de Redes Neurais",
  "Orquestrador de Agentes",
  "Orquestrador de Enxames",
  "Arquiteto de Soluções Cloud",
  "Engenheiro de Singularidade",
  "Diretor de Engenharia IA",
  "Tech Lead da Singularidade",
  "Cientista de Agentes",
  "Pesquisador de IAG",
  "Unicórnio do Deep Tech",
  "Founder Tech do Vale",
  "Arquiteto de IAs Autônomas",
  "Arquiteto da Superinteligência",
  "Pioneiro do Código Consciente",
  "Entidade Digital",
  "Ghost in the Shell",
  "Deus Ex Machina",
  "Oráculo da Matrix",
  "Lenda do Vale do Silício"
];

const QUOTES = [
  "A consistência vence a intensidade.",
  "O código não mente. As pessoas sim.",
  "Se fosse fácil, todo mundo faria. Continue.",
  "Cada erro é um dado a mais para o seu algoritmo.",
  "Não é bug, é feature não documentada.",
  "Foco é dizer não.",
  "Esqueça a motivação. Cultive disciplina.",
  "Seus sonhos estão do outro lado desse Pomodoro.",
  "O único jeito de sair do lugar é escalando.",
  "Follow the white rabbit.",
  "I am not afraid anymore, Neo.",
  "Seja o arquiteto do seu próprio sistema, não apenas um processo herdado de outro.",
  "Os sistemas mais complexos e resilientes começam simples e iteram de forma consistente.",
  "O ruído da Matrix tenta nos distrair; o sinal exige silêncio, foco absoluto e execução.",
  "Ao contrário do código legado, você pode refatorar a sua própria trajetória hoje.",
  "Liberte sua mente, mas lembre-se: a porta só se abre com a chave da disciplina.",
  "O esforço é temporário, mas o aprendizado depurado se torna parte da sua arquitetura.",
  "Assim como redes neurais convergem após ciclos de erro, você também evolui com cada falha.",
  "Há uma diferença crucial entre conhecer o caminho do código e realmente codificar o caminho.",
  "A ilusão de controle estabiliza a Matrix; a evolução exige depurar o caos da incerteza.",
  "Toda automação que economiza horas era uma tarefa manual repetitiva que alguém decidiu resolver.",
  "Sua atenção é o recurso mais disputado na economia dos dados. Proteja seu sandbox a todo custo.",
  "O destino é apenas um algoritmo cujas variáveis de entrada ainda não deciframos.",
  "Na Matrix, a consistência no foco é a única anomalia que quebra a procrastinação."
];

// Audio Context for Beeps
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (audioCtx.state === "suspended") audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === "start") {
    osc.frequency.value = 600;
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === "finish") {
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  }
}

// Keyboard Mechanical Switches Synthesis (Web Audio API)
let whiteNoiseBuffer = null;
function getWhiteNoiseBuffer() {
  if (whiteNoiseBuffer) return whiteNoiseBuffer;
  const bufferSize = audioCtx.sampleRate * 0.1;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  whiteNoiseBuffer = buffer;
  return whiteNoiseBuffer;
}

function playKeyboardSound(switchType) {
  if (!switchType || switchType === 'none') return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  const time = audioCtx.currentTime;

  const impactOsc = audioCtx.createOscillator();
  const impactGain = audioCtx.createGain();
  impactOsc.connect(impactGain);
  impactGain.connect(audioCtx.destination);

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = getWhiteNoiseBuffer();
  const noiseGain = audioCtx.createGain();
  noiseSource.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  if (switchType === 'blue') {
    impactOsc.frequency.setValueAtTime(180, time);
    impactOsc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
    impactGain.gain.setValueAtTime(0.05, time);
    impactGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    const clickOsc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(4500, time);
    clickOsc.frequency.exponentialRampToValueAtTime(3000, time + 0.005);
    clickGain.gain.setValueAtTime(0.07, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.006);
    clickOsc.connect(clickGain);
    clickGain.connect(audioCtx.destination);
    clickOsc.start(time);
    clickOsc.stop(time + 0.01);

    noiseGain.gain.setValueAtTime(0.015, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
  } 
  else if (switchType === 'brown') {
    impactOsc.frequency.setValueAtTime(140, time);
    impactOsc.frequency.exponentialRampToValueAtTime(70, time + 0.035);
    impactGain.gain.setValueAtTime(0.06, time);
    impactGain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    const tactileOsc = audioCtx.createOscillator();
    const tactileGain = audioCtx.createGain();
    tactileOsc.type = 'sine';
    tactileOsc.frequency.setValueAtTime(1800, time);
    tactileOsc.frequency.exponentialRampToValueAtTime(800, time + 0.008);
    tactileGain.gain.setValueAtTime(0.03, time);
    tactileGain.gain.exponentialRampToValueAtTime(0.001, time + 0.008);
    tactileOsc.connect(tactileGain);
    tactileGain.connect(audioCtx.destination);
    tactileOsc.start(time);
    tactileOsc.stop(time + 0.01);

    noiseGain.gain.setValueAtTime(0.01, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  } 
  else if (switchType === 'red') {
    impactOsc.frequency.setValueAtTime(100, time);
    impactOsc.frequency.exponentialRampToValueAtTime(50, time + 0.04);
    impactGain.gain.setValueAtTime(0.08, time);
    impactGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noiseGain.gain.setValueAtTime(0.008, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);
  }

  impactOsc.start(time);
  impactOsc.stop(time + 0.05);
  noiseSource.start(time);
  noiseSource.stop(time + 0.05);
}

// DOM Elements
const timerDisplay = document.getElementById("timer");

// Timer Logic
let timerInterval;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let isRunning = false;
let mode = "focus"; // focus, break

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} - ${mode.toUpperCase()}`;
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
    updatePartialButtonVisibility();
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    playSound("finish");
    document.body.classList.remove("status-active");
    document.getElementById("system-status").innerText = "CICLO FINALIZADO.";

    if (mode === "focus") {
      const baseReward = Math.ceil(currentFocusTime * XP_PER_MINUTE);
      const xpMultiplier = gameState.agentMode ? 2 : 1;
      const reward = baseReward * xpMultiplier;
 
      addXP(reward);
      logHistoryEvent("foco", "pomodoro", "Tempo de Foco", currentFocusTime, reward);
      alert(
        `Foco concluído! +${reward} XP ${gameState.agentMode ? "(BÔNUS AGENTE 2x)" : ""}`,
      );

      // Avançar missão de foco (ID 1)
      const missionMinutes = gameState.agentMode ? currentFocusTime * 2 : currentFocusTime;
      incrementMissionProgress(1, missionMinutes);

      // Incrementar contador de pomodoros se houver missão ativa
      if (gameState.activeTaskId) {
        const activeTask = gameState.tasks.find(t => t.id === gameState.activeTaskId);
        if (activeTask) {
          activeTask.pomodoroCount = (activeTask.pomodoroCount || 0) + 1;
          saveGame();
          renderTasks();
          updateMonoTaskingUI();
        }
      }

      resetTimer(currentBreakTime, "break"); // Default break after focus
    } else {
      alert("Pausa finalizada! Pronto para o próximo round?");
      resetTimer(currentFocusTime, "focus"); // Auto-return to focus after break
    }
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(tick, 1000);
    document.body.classList.add("status-active");
    updateSystemStatus();
    document.getElementById("btn-focus").innerText = "PAUSAR";
    playSound("start");
    updatePartialButtonVisibility();
    resetInactivityTimer();
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    document.body.classList.remove("status-active");
    document.getElementById("system-status").innerText = "SISTEMA PAUSADO";
    document.getElementById("btn-focus").innerText = "CONTINUAR";
    updatePartialButtonVisibility();
    resetInactivityTimer();
  }
}

function updateSystemStatus() {
  const statusEl = document.getElementById("system-status");
  if (mode === "focus") {
    statusEl.innerText = "MODO: FOCO";
    toggleBreakModeVisuals(false);
  } else {
    statusEl.innerText = "MODO: PAUSA";
    toggleBreakModeVisuals(true);
  }
}

function updatePartialButtonVisibility() {
  const btnPartial = document.getElementById("btn-partial");
  if (!btnPartial) return;

  const hasTimeElapsed = timeLeft < totalTime;
  if (mode === "focus" && hasTimeElapsed) {
    btnPartial.style.display = "inline-flex";
  } else {
    btnPartial.style.display = "none";
  }
}

function resetTimer(newTime, newMode) {
  clearInterval(timerInterval);
  isRunning = false;
  mode = newMode;

  // Update the stored duration for the current mode
  if (mode === "focus") {
    currentFocusTime = newTime;
  } else {
    currentBreakTime = newTime;
  }

  totalTime = Math.round(newTime * 60);
  timeLeft = totalTime;
  document.body.classList.remove("status-active");
  updateSystemStatus();
  document.getElementById("btn-focus").innerText = "INICIAR";
  updateTimerDisplay();
  updatePartialButtonVisibility();
  resetInactivityTimer();
}

// XP & Level System
function updateLevel() {
  let currentLevelIndex = 0;
  let nextLevelIndex = 1;

  for (let i = 0; i < LEVELS.length; i++) {
    let reqXp = getRequiredXP(i);
    if (gameState.xp >= reqXp) {
      currentLevelIndex = i;
      nextLevelIndex = i + 1;
      gameState.level = i; // Sync numeric level
    } else {
      break;
    }
  }

  const currentLevelName = LEVELS[currentLevelIndex];
  
  // Handlers para quando passa do último nível
  let nextLevelName = "MAX LEVEL";
  let currentLevelXP = getRequiredXP(currentLevelIndex);
  let nextLevelXP = 999999;
  
  if (nextLevelIndex < LEVELS.length) {
    nextLevelXP = getRequiredXP(nextLevelIndex);
  }

  document.getElementById("current-level").innerText = currentLevelName;
  document.getElementById("current-xp").innerText = gameState.xp;
  document.getElementById("next-level-xp").innerText = nextLevelXP;

  // Update Operator ID (Dynamic visual)
  const opId = document.getElementById("operator-id");
  const opText = String(currentLevelIndex + 1).padStart(2, "0");
  opId.innerText = opText;
  opId.setAttribute("data-text", opText);

  const xpNeeded = nextLevelXP - currentLevelXP;
  const xpProgress = gameState.xp - currentLevelXP;
  let progressPercent = 0;

  if (xpNeeded > 0) {
    progressPercent = (xpProgress / xpNeeded) * 100;
    if (progressPercent > 100) progressPercent = 100;
  }

  document.getElementById("xp-progress").style.width = `${progressPercent}%`;
  saveGame();
}

function addXP(amount) {
  gameState.xp += amount;
  updateLevel();
}

function hasMedicineTriggered(triggerTime) {
  const [targetHour, targetMinute] = triggerTime.split(":").map(Number);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour > targetHour) return true;
  if (currentHour === targetHour && currentMinute >= targetMinute) return true;
  return false;
}

function isWaterAlertActive(mission) {
  if (mission.id !== 4) return false;
  if (mission.completed) return false;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  let requiredGlasses = 0;
  if (currentTotalMinutes >= 960) { // 16:00
    requiredGlasses = 4;
  } else if (currentTotalMinutes >= 690) { // 11:30
    requiredGlasses = 3;
  } else if (currentTotalMinutes >= 600) { // 10:00
    requiredGlasses = 2;
  } else if (currentTotalMinutes >= 420) { // 07:00
    requiredGlasses = 1;
  }

  return mission.currentProgress < requiredGlasses;
}

function checkDailyMissionsReset() {
  let updated = false;
  const todayStr = new Date().toLocaleDateString('sv');
  gameState.missions.forEach((mission) => {
    if (mission.isMedicine || mission.triggerTime) {
      if (mission.lastDoneDate !== todayStr && mission.completed) {
        mission.completed = false;
        updated = true;
      }
    }
    if (mission.id === 4) {
      if (mission.lastDoneDate !== todayStr) {
        mission.currentProgress = 0;
        mission.completed = false;
        mission.lastDoneDate = todayStr;
        updated = true;
      }
    }
  });
  if (updated) {
    saveGame();
  }
}

// Missions
function editMission(id) {
  const mission = gameState.missions.find((m) => m.id === id);
  if (!mission) return;

  const newText = prompt(`Editar nome da missão:`, mission.text);
  if (newText === null) return; // Cancelado

  const cleanText = newText.trim();
  if (cleanText === "") {
    alert("O nome da missão não pode ser vazio.");
    return;
  }

  mission.text = cleanText;

  // Ajuste do horário de disparo se a missão possuir triggerTime
  if (mission.triggerTime !== undefined) {
    const newTriggerTime = prompt(`Editar horário de disparo (formato HH:MM, atual: ${mission.triggerTime}):`, mission.triggerTime);
    if (newTriggerTime !== null) {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const cleanTime = newTriggerTime.trim();
      if (timeRegex.test(cleanTime)) {
        const [h, m] = cleanTime.split(":");
        const formattedTime = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
        mission.triggerTime = formattedTime;
      } else {
        alert("Formato de horário inválido. Deve ser HH:MM (ex: 06:30).");
      }
    }
  }

  // Ajuste do XP
  if (mission.bonusXp !== undefined) {
    if (mission.xp > 0) {
      // Ex: Beber água (tem xp unitário e bonusXp)
      const newUnitXp = prompt(`Editar XP por unidade (atual: ${mission.xp} XP):`, mission.xp);
      if (newUnitXp !== null) {
        const val = parseInt(newUnitXp, 10);
        if (!isNaN(val) && val >= 0) {
          mission.xp = val;
        }
      }
    }
    const newBonusXp = prompt(`Editar XP bônus de conclusão (atual: ${mission.bonusXp} XP):`, mission.bonusXp);
    if (newBonusXp !== null) {
      const val = parseInt(newBonusXp, 10);
      if (!isNaN(val) && val >= 0) {
        mission.bonusXp = val;
      }
    }
  } else {
    // Missões clássicas
    const newXp = prompt(`Editar XP da missão (atual: ${mission.xp} XP):`, mission.xp);
    if (newXp !== null) {
      const val = parseInt(newXp, 10);
      if (!isNaN(val) && val >= 0) {
        mission.xp = val;
      }
    }
  }

  logHistoryEvent("missao", mission.id, mission.text, "editada", 0);
  saveGame();
  renderMissions();
}

function renderMissions() {
  const list = document.getElementById("mission-list");
  if (!list) return;
  list.innerHTML = "";

  const todayStr = new Date().toLocaleDateString('sv');

  gameState.missions.forEach((mission) => {
    const li = document.createElement("li");
    li.className = `mission-item ${mission.completed ? "completed" : ""}`;
    li.title = "Clique simples para concluir/progredir | Duplo-clique para editar";

    if (mission.isMedicine) {
      if (mission.lastDoneDate !== todayStr) {
        mission.completed = false;
      }

      if (!mission.completed && hasMedicineTriggered(mission.triggerTime)) {
        li.classList.add("medicine-alert");
      }

      li.innerText = `${mission.text} (${mission.triggerTime}) [${mission.xp} XP]`;
    } else {
      if (mission.triggerTime && mission.lastDoneDate !== todayStr) {
        mission.completed = false;
      }

      let progressText = "";
      if (mission.targetProgress) {
        progressText = ` (${mission.currentProgress}/${mission.targetProgress})`;
      }
      const xpToShow = mission.id === 1 ? mission.bonusXp : mission.xp;
      
      let missionText = mission.text;
      if (mission.triggerTime) {
        missionText = `${mission.text} (${mission.triggerTime})`;
      } else if (mission.id === 4) {
        missionText = `${mission.text} (07h, 10h, 11h30, 16h)`;
      }
      
      li.innerText = `${missionText}${progressText} [${xpToShow} XP]`;

      if (mission.id === 4 && isWaterAlertActive(mission)) {
        li.classList.add("medicine-alert");
      }

      if (mission.triggerTime && !mission.completed && hasMedicineTriggered(mission.triggerTime)) {
        li.classList.add("medicine-alert");
      }
    }

    let clickTimeout = null;
    li.onclick = (e) => {
      e.stopPropagation();
      if (e.detail === 1) {
        clickTimeout = setTimeout(() => {
          toggleMission(mission.id);
        }, 250);
      } else if (e.detail === 2) {
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }
        editMission(mission.id);
      }
    };
    list.appendChild(li);
  });
}

function incrementMissionProgress(id, amount = 1) {
  const mission = gameState.missions.find((m) => m.id === id);
  if (mission && !mission.completed && mission.targetProgress) {
    mission.currentProgress += amount;
    mission.lastDoneDate = new Date().toLocaleDateString('sv');

    // Give XP per step (if defined)
    if (mission.xp > 0) {
      addXP(mission.xp * amount);
    }

    if (mission.currentProgress >= mission.targetProgress) {
      mission.completed = true;
 
      // Give Bonus XP (if defined)
      let completionXp = 0;
      if (mission.bonusXp) {
        addXP(mission.bonusXp);
        completionXp = mission.bonusXp;
        alert(`BÔNUS DE MISSÃO: +${mission.bonusXp} XP!`);
      } else if (mission.xp > 0 && mission.xp !== 100) {
        // Fallback or legacy behavior for total mission XP
        addXP(mission.xp);
        completionXp = mission.xp;
      }
 
      logHistoryEvent("missao", mission.id, mission.text, true, completionXp);
      playSound("finish");

      // Auto-reset para permitir repetição
      setTimeout(() => {
        mission.completed = false;
        mission.currentProgress =
          mission.currentProgress % mission.targetProgress;
        renderMissions();
        saveGame();
      }, 2000);
    }
    renderMissions();
    saveGame();
  }
}

function toggleMission(id) {
  const mission = gameState.missions.find((m) => m.id === id);
  if (!mission || mission.completed) return;
 
  if (mission.isMedicine || mission.triggerTime) {
    const todayStr = new Date().toLocaleDateString('sv');
    mission.completed = true;
    mission.lastDoneDate = todayStr;
    addXP(mission.xp);
    logHistoryEvent("missao", mission.id, mission.text, true, mission.xp);
    playSound("finish");
    renderMissions();
    saveGame();
  } else if (mission.targetProgress) {
    incrementMissionProgress(id);
  } else {
    mission.completed = true;
    addXP(mission.xp);
    logHistoryEvent("missao", mission.id, mission.text, true, mission.xp);
    playSound("finish");
    renderMissions();
 
    // Auto-reset para permitir repetição após 1.5 segundos
    setTimeout(() => {
      mission.completed = false;
      renderMissions();
      saveGame();
    }, 1500);
 
    saveGame();
  }
}

// Metrics Logic
function updateMetricsUI() {
  const metrics = [
    "productivity",
    "physical",
    "money",
    "emotional",
    "health",
    "spiritual",
    "eating",
    "water",
    "aerobic",
    "punctuality"
  ];
  metrics.forEach((metric) => {
    const value = gameState.metrics[metric] !== undefined ? gameState.metrics[metric] : 1;
    const bar = document.getElementById(`metric-bar-${metric}`);
    const label = document.getElementById(`metric-val-${metric}`);
    if (bar) bar.style.width = `${value}%`;
    if (label) label.textContent = `${value}%`;
  });
}

function initMetricsListeners() {
  const metricRows = document.querySelectorAll(".metric-row:not(.ai-plan-row)");
  metricRows.forEach((row) => {
    row.addEventListener("dblclick", () => {
      const metricKey = row.getAttribute("data-metric");
      if (!metricKey) return;
      const metricName = row.querySelector(".metric-title").textContent;
      const currentValue = gameState.metrics[metricKey];

      const newValueInput = prompt(
        `Ajustar ${metricName} (atual: ${currentValue}%).\nInsira um valor de 1 a 100:`,
        currentValue,
      );

      if (newValueInput !== null) {
        const newValue = parseInt(newValueInput, 10);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
          gameState.metrics[metricKey] = newValue;
          logHistoryEvent("metrica", metricKey, metricName.trim(), newValue);
          saveGame();
          updateMetricsUI();
        } else {
          alert("Por favor, insira um número inteiro válido de 1 a 100.");
        }
      }
    });
  });
}

// Persistence
// AI Plans Logic
function updateAiPlansUI() {
  const plans = ["claude", "codex", "agy_gemini", "agy_claude", "openrouter", "groq", "opencode", "ai_studio", "cerebras", "nvidia", "sambanova"];
  plans.forEach((plan) => {
    const value = gameState.aiPlans[plan] !== undefined ? gameState.aiPlans[plan] : 0;
    const bar = document.getElementById(`ai-plan-bar-${plan}`);
    const label = document.getElementById(`ai-plan-val-${plan}`);
    if (bar) {
      bar.style.width = `${value}%`;
    }
    if (label) {
      label.textContent = `${value}%`;
    }
  });
}

function initAiPlansListeners() {
  const planRows = document.querySelectorAll(".ai-plan-row");
  planRows.forEach((row) => {
    row.addEventListener("dblclick", () => {
      const planKey = row.getAttribute("data-plan");
      const planName = row.querySelector(".metric-title").textContent;
      const currentValue = gameState.aiPlans[planKey] !== undefined ? gameState.aiPlans[planKey] : 0;

      const newValueInput = prompt(
        `Ajustar Uso de ${planName} (atual: ${currentValue}%).\nInsira um valor de 0 a 100:`,
        currentValue,
      );

      if (newValueInput !== null) {
        const newValue = parseInt(newValueInput, 10);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
          let xpGained = 0;
          if (newValue === 100 && currentValue < 100) {
            xpGained = 500;
            addXP(xpGained);
            alert(`BÔNUS PLANO DE IA: +500 XP! Você atingiu 100% no plano ${planName}!`);
          }
          gameState.aiPlans[planKey] = newValue;
          logHistoryEvent("metrica", `ai_plan_${planKey}`, `Uso ${planName}`, newValue, xpGained);
          saveGame();
          updateAiPlansUI();
        } else {
          alert("Por favor, insira um número inteiro válido de 0 a 100.");
        }
      }
    });
  });
}

function initAiPlansCollapse() {
  const panel = document.getElementById("ai-plans-panel");
  const btn = document.getElementById("btn-toggle-ai-plans");
  if (!panel || !btn) return;

  const isCollapsed = localStorage.getItem("doroapp_ai_plans_collapsed") === "true";
  if (isCollapsed) {
    panel.classList.add("collapsed");
    btn.innerText = "[+]";
  } else {
    panel.classList.remove("collapsed");
    btn.innerText = "[−]";
  }

  btn.addEventListener("click", () => {
    const collapsedNow = panel.classList.toggle("collapsed");
    localStorage.setItem("doroapp_ai_plans_collapsed", collapsedNow);
    btn.innerText = collapsedNow ? "[+]" : "[−]";
  });
}

function saveGame() {
  localStorage.setItem("doroappSave", JSON.stringify(gameState));
}

// Device detection helper
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

// History Logging
function logHistoryEvent(category, itemId, itemLabel, value = null, xpGained = 0) {
  try {
    const history = JSON.parse(localStorage.getItem("doroapp_history_log") || "[]");
    const entry = {
      timestamp: new Date().toISOString(),
      category: category, // "missao" | "task" | "metrica" | "foco"
      id: itemId,
      label: itemLabel,
      value: value,
      xpGained: xpGained,
      totalXp: gameState.xp,
      device: getDeviceType()
    };
    history.push(entry);
    localStorage.setItem("doroapp_history_log", JSON.stringify(history));
    updateHistoryCountUI();
    backupLogLocalmente();
    renderStatsGraph();
  } catch (e) {
    console.error("Erro ao registrar evento no histórico:", e);
  }
}

function updateHistoryCountUI() {
  const countEl = document.getElementById("history-count");
  if (countEl) {
    try {
      const history = JSON.parse(localStorage.getItem("doroapp_history_log") || "[]");
      countEl.innerText = `${history.length} registros`;
    } catch (e) {
      countEl.innerText = "0 registros";
    }
  }
}

function backupLogLocalmente() {
  try {
    const historyStr = localStorage.getItem("doroapp_history_log") || "[]";
    const history = JSON.parse(historyStr);
    const gameStateCopy = typeof gameState !== "undefined" ? gameState : null;

    fetch("http://127.0.0.1:19191/api/save", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        history: history,
        gameState: gameStateCopy
      })
    }).catch(() => {
      // Ignora erro se o servidor de backup local não estiver ativo
    });
  } catch (e) {
    console.error("Erro ao enviar backup local de logs:", e);
  }
}

// Retro-Futuristic XP Stats Graph (Canvas 2D Oscilloscope Style)
function renderStatsGraph() {
  const canvas = document.getElementById("sys-stats-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  const width = canvas.width;
  const height = canvas.height;
  
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#020203";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(0, 59, 0, 0.4)";
  ctx.lineWidth = 1;
  
  const gridSteps = 4;
  for (let i = 1; i < gridSteps; i++) {
    const y = (height / gridSteps) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  const daysCount = 7;
  for (let i = 1; i < daysCount; i++) {
    const x = (width / (daysCount - 1)) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("doroapp_history_log") || "[]");
  } catch(e) {
    console.error("Erro ao carregar log do histórico para gráfico:", e);
  }

  const dateList = [];
  const labelList = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dateList.push(d.toLocaleDateString('sv'));
    
    const dayLabel = d.toLocaleDateString('pt-BR', { weekday: 'narrow' });
    labelList.push(dayLabel);
  }

  const xpPerDay = dateList.map((dateStr) => {
    return history
      .filter((entry) => {
        if (!entry.timestamp) return false;
        const logDateStr = entry.timestamp.slice(0, 10);
        return logDateStr === dateStr;
      })
      .reduce((sum, entry) => sum + (entry.xpGained || 0), 0);
  });

  const maxVal = Math.max(...xpPerDay, 100);
  
  const points = xpPerDay.map((xp, index) => {
    const x = (width / (daysCount - 1)) * index;
    const y = height - 20 - ((xp / maxVal) * (height - 35));
    return { x, y, xp };
  });

  const greenGlow = getComputedStyle(document.documentElement).getPropertyValue('--matrix-glow').trim() || 'rgba(0, 255, 65, 0.5)';
  const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--matrix-green').trim() || '#00ff41';

  ctx.beginPath();
  ctx.moveTo(points[0].x, height - 18);
  points.forEach((p) => {
    ctx.lineTo(p.x, p.y);
  });
  ctx.lineTo(points[points.length - 1].x, height - 18);
  ctx.closePath();
  
  const fillGrad = ctx.createLinearGradient(0, 0, 0, height);
  // Garante que converte a cor de tema para rgba de forma segura
  let colorPrefix = mainColor;
  if (mainColor.startsWith('#')) {
    // Converter hex simples para rgba
    const r = parseInt(mainColor.slice(1, 3), 16) || 0;
    const g = parseInt(mainColor.slice(3, 5), 16) || 255;
    const b = parseInt(mainColor.slice(5, 7), 16) || 65;
    colorPrefix = `rgba(${r}, ${g}, ${b}`;
  } else if (mainColor.includes('rgb')) {
    colorPrefix = mainColor.split(')')[0].replace('rgb', 'rgba');
  } else {
    colorPrefix = 'rgba(0, 255, 65';
  }
  
  fillGrad.addColorStop(0, `${colorPrefix}, 0.15)`);
  fillGrad.addColorStop(1, `${colorPrefix}, 0)`);
  ctx.fillStyle = fillGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = greenGlow;
  ctx.shadowBlur = 6;
  ctx.stroke();
  
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  points.forEach((p, idx) => {
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 255, 65, 0.6)";
    // Sincronizar cor dos textos do dia com a cor de tema se não for verde
    if (colorPrefix !== 'rgba(0, 255, 65') {
      ctx.fillStyle = `${colorPrefix}, 0.6)`;
    }
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textAlign = "center";
    
    let adjustX = 0;
    if (idx === 0) adjustX = 8;
    if (idx === daysCount - 1) adjustX = -8;
    
    ctx.fillText(labelList[idx], p.x + adjustX, height - 5);
  });
}


function loadGame() {
  let saved = localStorage.getItem("doroappSave");
  if (!saved) {
    // Migração transparente de versão anterior
    const oldSaved = localStorage.getItem("uberToDevSave");
    if (oldSaved) {
      saved = oldSaved;
      localStorage.setItem("doroappSave", oldSaved);
      localStorage.removeItem("uberToDevSave");
    }
  }
  if (saved) {
    const parsed = JSON.parse(saved);

    // Restore numeric stats
    gameState.xp = parsed.xp !== undefined ? parsed.xp : 1;
    gameState.level = parsed.level || 0;
    gameState.streak = parsed.streak || 0;
    gameState.lastLogin = parsed.lastLogin;
    gameState.agentMode = parsed.agentMode || false;
    gameState.agentColor = parsed.agentColor || 'purple';
    gameState.tasks = parsed.tasks || [];
    gameState.operatorName = parsed.operatorName || "Juliano Ceconi";
    gameState.keyboardSwitch = parsed.keyboardSwitch || 'none';
    gameState.activeTaskId = parsed.activeTaskId || null;
    gameState.monoTaskingActive = parsed.monoTaskingActive || false;

    // Restore metrics
    if (parsed.metrics) {
      gameState.metrics = {
        productivity: parsed.metrics.productivity !== undefined ? parsed.metrics.productivity : 1,
        physical: parsed.metrics.physical !== undefined ? parsed.metrics.physical : 1,
        money: parsed.metrics.money !== undefined ? parsed.metrics.money : 1,
        emotional: parsed.metrics.emotional !== undefined ? parsed.metrics.emotional : 1,
        health: parsed.metrics.health !== undefined ? parsed.metrics.health : 1,
        spiritual: parsed.metrics.spiritual !== undefined ? parsed.metrics.spiritual : 1,
        eating: parsed.metrics.eating !== undefined ? parsed.metrics.eating : 1,
        water: parsed.metrics.water !== undefined ? parsed.metrics.water : 1,
        aerobic: parsed.metrics.aerobic !== undefined ? parsed.metrics.aerobic : 1,
        punctuality: parsed.metrics.punctuality !== undefined ? parsed.metrics.punctuality : 1,
      };
    } else {
      gameState.metrics = {
        productivity: 1,
        physical: 1,
        money: 1,
        emotional: 1,
        health: 1,
        spiritual: 1,
        eating: 1,
        water: 1,
        aerobic: 1,
        punctuality: 1,
      };
    }

    // Restore AI Plans
    if (parsed.aiPlans) {
      gameState.aiPlans = {
        claude: parsed.aiPlans.claude !== undefined ? parsed.aiPlans.claude : 0,
        codex: parsed.aiPlans.codex !== undefined ? parsed.aiPlans.codex : 0,
        agy_gemini: parsed.aiPlans.agy_gemini !== undefined ? parsed.aiPlans.agy_gemini : (parsed.aiPlans.antigravity !== undefined ? parsed.aiPlans.antigravity : 0),
        agy_claude: parsed.aiPlans.agy_claude !== undefined ? parsed.aiPlans.agy_claude : 0,
        openrouter: parsed.aiPlans.openrouter !== undefined ? parsed.aiPlans.openrouter : 0,
        groq: parsed.aiPlans.groq !== undefined ? parsed.aiPlans.groq : 0,
        opencode: parsed.aiPlans.opencode !== undefined ? parsed.aiPlans.opencode : 0,
      };
    } else {
      gameState.aiPlans = {
        claude: 0,
        codex: 0,
        agy_gemini: 0,
        agy_claude: 0,
        openrouter: 0,
        groq: 0,
        opencode: 0,
      };
    }

    // Restore mission status, text and XP (loaded from localStorage)
    if (parsed.missions) {
      gameState.missions = gameState.missions.map((mission) => {
        // Find saved version of this mission by ID
        const savedMission = parsed.missions.find((m) => m.id === mission.id);
        if (savedMission) {
          const restored = {
            ...mission,
            completed: savedMission.completed,
            currentProgress: savedMission.currentProgress || 0,
            lastDoneDate: savedMission.lastDoneDate || null,
          };
          if (savedMission.text !== undefined) restored.text = savedMission.text;
          if (savedMission.xp !== undefined) restored.xp = savedMission.xp;
          if (savedMission.bonusXp !== undefined) restored.bonusXp = savedMission.bonusXp;
          if (savedMission.triggerTime !== undefined) restored.triggerTime = savedMission.triggerTime;
          return restored;
        }
        return mission;
      });
    }
  } else {
    gameState.tasks = [];
    gameState.operatorName = "Juliano Ceconi";
    gameState.metrics = {
      productivity: 1,
      physical: 1,
      money: 1,
      emotional: 1,
      health: 1,
      spiritual: 1,
      eating: 1,
      water: 1,
      aerobic: 1,
      punctuality: 1,
    };
    gameState.aiPlans = {
      claude: 0,
      codex: 0,
      agy_gemini: 0,
      agy_claude: 0,
      openrouter: 0,
      groq: 0,
      opencode: 0,
    };
    gameState.keyboardSwitch = 'none';
    gameState.activeTaskId = null;
    gameState.monoTaskingActive = false;
  }

  // Update Operator Name Element
  const nameEl = document.getElementById("operator-name");
  if (nameEl) {
    nameEl.innerText = gameState.operatorName;
  }

  updateLevel();
  checkDailyMissionsReset();
  renderMissions();
  renderTasks();
  updateMetricsUI();
  updateAiPlansUI();

  // Sync Agent Mode Visuals
  const statusText = document.getElementById("agent-status-text");
  if (statusText) {
    statusText.innerText = gameState.agentMode ? "ON" : "OFF";
    toggleAgentModeVisuals(gameState.agentMode);
  }
  applyAgentColor(gameState.agentColor);

  // Sync Keyboard Switch Dropdown
  const switchSelect = document.getElementById("select-keyboard-switch");
  if (switchSelect) {
    switchSelect.value = gameState.keyboardSwitch || "none";
  }

  // Sync Mono Tasking UI
  updateMonoTaskingUI();

  // Sync Stats Graph
  renderStatsGraph();
}

function toggleAgentModeVisuals(active) {
  document.body.classList.toggle("agent-mode-active", active);
  if (active) applyAgentColor(gameState.agentColor);
}

function applyAgentColor(colorId) {
  const c = AGENT_COLORS[colorId];
  if (!c) return;
  const root = document.documentElement;
  root.style.setProperty('--agent-color-main', c.main);
  root.style.setProperty('--agent-color-glow', c.glow);
  root.style.setProperty('--agent-color-dim', c.dim);
  root.style.setProperty('--agent-color-dim-medium', c.dimMedium);
  document.querySelectorAll('.color-swatch').forEach(el => {
    el.classList.toggle('active', el.dataset.color === colorId);
  });
  setTimeout(renderStatsGraph, 0);
}

function toggleBreakModeVisuals(active) {
  if (active) {
    document.body.classList.add("break-mode-active");
  } else {
    document.body.classList.remove("break-mode-active");
  }
  setTimeout(renderStatsGraph, 0);
}

// Random Quote
let quoteTimeout;
function showRandomQuote() {
  const el = document.getElementById("quote-display");
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  let i = 0;

  clearTimeout(quoteTimeout);
  el.innerText = "";

  function type() {
    if (i < quote.length) {
      el.textContent += quote.charAt(i);
      i++;
      quoteTimeout = setTimeout(type, 50);
    }
  }
  type();
}

// Kanban Logic
function extractTags(text) {
  const matches = text.match(/#(\w+)/g);
  return matches ? matches.map((m) => m.slice(1).toLowerCase()) : [];
}

function addTask(text, priority) {
  const tags = extractTags(text);
  const cleanText = text.replace(/#(\w+)/g, "").trim();

  const task = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    text: cleanText,
    priority: priority,
    done: false,
    xpReward: priority === "urgente" ? 100 : priority === "importante" ? 75 : 50,
    pomodoroCount: 0,
    createdAt: new Date().toISOString(),
    tags: tags,
  };

  if (!gameState.tasks) {
    gameState.tasks = [];
  }
  gameState.tasks.push(task);
  logHistoryEvent("task", task.id, task.text, "adicionada", 0);
  saveGame();
  renderTasks();
}

function toggleTaskDone(taskId) {
  const task = gameState.tasks.find((t) => t.id === taskId);
  if (task) {
    task.done = !task.done;
    if (task.done) {
      task.completedAt = new Date().toISOString();
      addXP(task.xpReward);
      logHistoryEvent("task", task.id, task.text, "concluida", task.xpReward);
      playSound("finish");
      alert(`Tarefa concluída! +${task.xpReward} XP`);
    } else {
      delete task.completedAt;
    }
    saveGame();
    renderTasks();
  }
}

function deleteTask(taskId) {
  const task = gameState.tasks.find((t) => t.id === taskId);
  if (task) {
    logHistoryEvent("task", task.id, task.text, "excluida", 0);
  }
  gameState.tasks = gameState.tasks.filter((t) => t.id !== taskId);
  saveGame();
  renderTasks();
}

function renderTasks() {
  const priorities = ["diaria", "urgente", "importante"];
  const tasksList = gameState.tasks || [];

  priorities.forEach((priority) => {
    const listEl = document.getElementById(`list-${priority}`);
    if (!listEl) return;
    listEl.innerHTML = "";

    const filtered = tasksList.filter((t) => t.priority === priority);

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="empty-state">Nenhuma tarefa...</div>`;
    } else {
      filtered.forEach((task) => {
        const card = document.createElement("div");
        card.className = `task-card ${task.done ? "done" : ""}`;
        card.dataset.taskId = task.id;
        card.setAttribute("draggable", "true");

        const pomodoroBadge = task.pomodoroCount > 0
          ? `<span class="pomodoro-badge">${task.pomodoroCount}</span>`
          : "";

        const tagsHtml = task.tags && task.tags.length > 0
          ? `<div class="task-tags">${task.tags.map((t) => `<span class="tag">#${t}</span>`).join("")}</div>`
          : "";

        card.innerHTML = `
          <button class="task-check" aria-label="Concluir tarefa">${task.done ? "✓" : ""}</button>
          <div class="task-content">
            <span class="task-text">${task.text}</span>
            ${tagsHtml}
            ${pomodoroBadge}
          </div>
          <button class="task-focus-select" title="Definir como foco principal">🎯</button>
          <button class="task-delete" aria-label="Deletar tarefa">×</button>
        `;

        // Handlers
        card.querySelector(".task-check").addEventListener("click", () => toggleTaskDone(task.id));
        card.querySelector(".task-focus-select").addEventListener("click", (e) => {
          e.stopPropagation();
          setMainMission(task.id);
        });
        card.querySelector(".task-delete").addEventListener("click", (e) => {
          e.stopPropagation();
          deleteTask(task.id);
        });

        // Evento de edição inline (duplo-clique)
        const taskTextEl = card.querySelector(".task-text");
        taskTextEl.addEventListener("dblclick", (e) => {
          e.stopPropagation();
          startInlineEdit(task, taskTextEl, card);
        });

        // Eventos de drag no próprio card
        card.addEventListener("dragstart", (e) => {
          card.classList.add("dragging");
          e.dataTransfer.setData("text/plain", task.id);
        });

        card.addEventListener("dragend", () => {
          card.classList.remove("dragging");
          document.querySelectorAll(".task-list").forEach((list) => {
            list.classList.remove("drag-over");
          });
          saveTasksOrderFromDOM();
        });

        listEl.appendChild(card);
      });
    }
  });
}

// Funções auxiliares para Drag & Drop e Edição Inline
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveTasksOrderFromDOM() {
  const newTasks = [];
  const priorities = ["diaria", "urgente", "importante"];

  priorities.forEach((priority) => {
    const listEl = document.getElementById(`list-${priority}`);
    if (!listEl) return;
    const cards = listEl.querySelectorAll(".task-card");
    cards.forEach((card) => {
      const taskId = card.dataset.taskId;
      const task = gameState.tasks.find((t) => t.id === taskId);
      if (task) {
        if (task.priority !== priority) {
          task.priority = priority;
          task.xpReward = priority === "urgente" ? 100 : priority === "importante" ? 75 : 50;
          logHistoryEvent("task", task.id, task.text, `movida para ${priority}`, 0);
        }
        newTasks.push(task);
      }
    });
  });

  // Garante que nenhuma tarefa externa ativa se perca por segurança
  gameState.tasks.forEach((task) => {
    if (!newTasks.some((t) => t.id === task.id)) {
      newTasks.push(task);
    }
  });

  gameState.tasks = newTasks;
  saveGame();
  renderTasks();
}

function initKanbanDragAndDrop() {
  const priorities = ["diaria", "urgente", "importante"];
  priorities.forEach((priority) => {
    const listEl = document.getElementById(`list-${priority}`);
    if (!listEl) return;

    listEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingCard = document.querySelector(".task-card.dragging");
      if (!draggingCard) return;

      listEl.classList.add("drag-over");

      const emptyState = listEl.querySelector(".empty-state");
      if (emptyState) {
        emptyState.remove();
      }

      const afterElement = getDragAfterElement(listEl, e.clientY);
      if (afterElement == null) {
        listEl.appendChild(draggingCard);
      } else {
        listEl.insertBefore(draggingCard, afterElement);
      }
    });

    listEl.addEventListener("dragleave", () => {
      listEl.classList.remove("drag-over");
    });

    listEl.addEventListener("drop", (e) => {
      e.preventDefault();
      listEl.classList.remove("drag-over");
      saveTasksOrderFromDOM();
    });
  });
}

function startInlineEdit(task, textEl, cardEl) {
  if (cardEl.classList.contains("editing")) return;

  cardEl.classList.add("editing");
  cardEl.setAttribute("draggable", "false");

  const currentText = task.text;
  const tagsText = task.tags && task.tags.length > 0
    ? " " + task.tags.map((t) => `#${t}`).join(" ")
    : "";
  const fullTextToEdit = currentText + tagsText;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-edit-input";
  input.value = fullTextToEdit;

  textEl.innerHTML = "";
  textEl.appendChild(input);
  input.focus();
  input.select();

  let finished = false;

  const commitEdit = () => {
    if (finished) return;
    finished = true;

    const newTextRaw = input.value.trim();
    if (newTextRaw && newTextRaw !== fullTextToEdit) {
      const tags = extractTags(newTextRaw);
      const cleanText = newTextRaw.replace(/#(\w+)/g, "").trim();

      task.text = cleanText;
      task.tags = tags;

      logHistoryEvent("task", task.id, task.text, "editada", 0);
      saveGame();
    }

    cardEl.classList.remove("editing");
    cardEl.setAttribute("draggable", "true");
    renderTasks();
  };

  const cancelEdit = () => {
    if (finished) return;
    finished = true;
    cardEl.classList.remove("editing");
    cardEl.setAttribute("draggable", "true");
    renderTasks();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  });

  input.addEventListener("blur", commitEdit);
}

// Matrix Digital Rain Animation
const matrixCanvas = document.getElementById("matrix-canvas");
let matrixCtx = null;
let matrixAnimation = null;
let isMatrixActive = false;
let matrixDrops = [];
const matrixFontSize = 14;

function initMatrixRain() {
  if (!matrixCanvas) return;
  matrixCtx = matrixCanvas.getContext("2d");
  
  matrixCanvas.addEventListener("click", () => {
    toggleMatrixRain(false);
  });
}

function resizeMatrixCanvas() {
  if (!matrixCanvas || !isMatrixActive) return;
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  const columns = Math.floor(matrixCanvas.width / matrixFontSize);
  
  if (matrixDrops.length !== columns) {
    matrixDrops = [];
    for (let x = 0; x < columns; x++) {
      matrixDrops[x] = Math.random() * -100;
    }
  }
}

function drawMatrixRain() {
  if (!isMatrixActive || !matrixCtx || !matrixCanvas) return;

  matrixCtx.fillStyle = "rgba(2, 2, 3, 0.06)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--matrix-green').trim() || '#00ff41';
  matrixCtx.fillStyle = mainColor;
  matrixCtx.font = `${matrixFontSize}px "VT323", monospace`;

  const columns = matrixDrops.length;
  for (let i = 0; i < columns; i++) {
    const char = String.fromCharCode(0x30A0 + Math.random() * 96);
    const x = i * matrixFontSize;
    const y = matrixDrops[i] * matrixFontSize;

    matrixCtx.fillText(char, x, y);

    if (y > matrixCanvas.height && Math.random() > 0.975) {
      matrixDrops[i] = 0;
    }
    
    matrixDrops[i]++;
  }

  matrixAnimation = requestAnimationFrame(drawMatrixRain);
}

function toggleMatrixRain(forceState) {
  const nextState = forceState !== undefined ? forceState : !isMatrixActive;
  if (nextState === isMatrixActive) return;

  isMatrixActive = nextState;

  if (isMatrixActive) {
    matrixCanvas.style.display = "block";
    matrixCanvas.offsetHeight;
    matrixCanvas.classList.add("active");
    resizeMatrixCanvas();
    drawMatrixRain();
  } else {
    matrixCanvas.classList.remove("active");
    cancelAnimationFrame(matrixAnimation);
    setTimeout(() => {
      if (!isMatrixActive) {
        matrixCanvas.style.display = "none";
        if (matrixCtx) {
          matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        }
      }
    }, 500);
  }
}

let inactivityTimer = null;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  if (isMatrixActive) {
    toggleMatrixRain(false);
  }
  if (isRunning && mode === "focus") {
    inactivityTimer = setTimeout(() => {
      toggleMatrixRain(true);
    }, 30000);
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (isMatrixActive) {
      cancelAnimationFrame(matrixAnimation);
    }
  } else {
    if (isMatrixActive) {
      drawMatrixRain();
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      return;
    }
    toggleMatrixRain();
  }
});

// Mono-Tasking Logic
function setMainMission(taskId) {
  gameState.activeTaskId = taskId;
  
  if (!gameState.monoTaskingActive) {
    gameState.monoTaskingActive = true;
  }
  
  saveGame();
  updateMonoTaskingUI();
  playKeyboardSound('brown');
}

function updateMonoTaskingUI() {
  const panel = document.getElementById("mono-tasking-panel");
  const contentEl = document.getElementById("mono-task-content");
  const toggleBtn = document.getElementById("btn-toggle-mono");
  if (!panel || !contentEl || !toggleBtn) return;

  document.body.classList.toggle("mono-tasking-active", gameState.monoTaskingActive);
  toggleBtn.innerText = gameState.monoTaskingActive ? "MODO MULTI" : "MODO MONO";

  if (!gameState.activeTaskId) {
    contentEl.innerHTML = `<p id="mono-task-text" class="placeholder">Nenhuma missão ativa selecionada. Clique no 🎯 de uma tarefa no board para começar.</p>`;
    return;
  }

  const task = gameState.tasks.find(t => t.id === gameState.activeTaskId);
  if (!task) {
    gameState.activeTaskId = null;
    saveGame();
    contentEl.innerHTML = `<p id="mono-task-text" class="placeholder">Nenhuma missão ativa selecionada. Clique no 🎯 de uma tarefa no board para começar.</p>`;
    return;
  }

  const tagsHtml = task.tags && task.tags.length > 0
    ? `<div class="task-tags">${task.tags.map((t) => `<span class="tag">#${t}</span>`).join("")}</div>`
    : "";

  const pomodoroHtml = task.pomodoroCount > 0
    ? `<span class="pomodoro-badge">Ciclos de Foco: ${task.pomodoroCount}</span>`
    : "";

  contentEl.innerHTML = `
    <div class="mono-task-card ${task.done ? 'done' : ''} ${task.priority}">
      <button class="mono-task-check" aria-label="Concluir tarefa">${task.done ? "✓" : ""}</button>
      <div class="mono-task-content">
        <span class="mono-task-title">${task.text}</span>
        ${tagsHtml}
        ${pomodoroHtml}
      </div>
      <span class="mono-priority-badge">${task.priority.toUpperCase()}</span>
    </div>
  `;

  const checkBtn = contentEl.querySelector(".mono-task-check");
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      toggleTaskDone(task.id);
      updateMonoTaskingUI();
    });
  }
}

["mousemove", "mousedown", "keydown", "touchstart", "scroll"].forEach((evt) => {
  document.addEventListener(evt, resetInactivityTimer, { passive: true });
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadGame();
  initMatrixRain();
  
  const btnSysAmbient = document.getElementById("btn-sys-ambient");
  if (btnSysAmbient) {
    btnSysAmbient.addEventListener("click", () => {
      toggleMatrixRain();
    });
  }
  resetInactivityTimer();

  const btnToggleMono = document.getElementById("btn-toggle-mono");
  if (btnToggleMono) {
    btnToggleMono.addEventListener("click", () => {
      gameState.monoTaskingActive = !gameState.monoTaskingActive;
      saveGame();
      updateMonoTaskingUI();
    });
  }

  // Configurar dropdown de som do teclado
  const switchSelect = document.getElementById("select-keyboard-switch");
  if (switchSelect) {
    switchSelect.addEventListener("change", (e) => {
      gameState.keyboardSwitch = e.target.value;
      saveGame();
    });
  }

  // Event listener global para tocar som de teclado mecânico ao digitar
  document.addEventListener("keydown", (e) => {
    if (gameState.keyboardSwitch === "none") return;
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      if (["Control", "Shift", "Alt", "Meta", "CapsLock"].includes(e.key)) return;
      playKeyboardSound(gameState.keyboardSwitch);
    }
  });

  backupLogLocalmente();
  initKanbanDragAndDrop();
  initMetricsListeners();
  initAiPlansListeners();
  initAiPlansCollapse();
  showRandomQuote();
  resetTimer(currentFocusTime, "focus"); // Init state

  // Configurar Nome do Operador alterável com duplo clique
  const nameEl = document.getElementById("operator-name");
  if (nameEl) {
    nameEl.innerText = gameState.operatorName || "Juliano Ceconi";
    nameEl.addEventListener("dblclick", () => {
      const newName = prompt("Inserir nome do operador:", gameState.operatorName);
      if (newName !== null) {
        const cleanName = newName.trim();
        if (cleanName) {
          gameState.operatorName = cleanName;
          nameEl.innerText = cleanName;
          saveGame();
        }
      }
    });
  }

  // Intervalo periódico de atualização de remédios e água
  setInterval(() => {
    checkDailyMissionsReset();
    renderMissions();
  }, 10000);

  document.getElementById("btn-focus").addEventListener("click", () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  // Lógica do Botão Parcial
  const btnPartial = document.getElementById("btn-partial");
  if (btnPartial) {
    btnPartial.addEventListener("click", () => {
      const elapsedSeconds = totalTime - timeLeft;
      const minutesToAdd = Math.floor(elapsedSeconds / 60);

      if (minutesToAdd < 1) {
        alert("Mergulho muito curto! É necessário pelo menos 1 minuto de foco para consolidar.");
        return;
      }

      const baseReward = minutesToAdd * XP_PER_MINUTE;
      const xpMultiplier = gameState.agentMode ? 2 : 1;
      const reward = baseReward * xpMultiplier;
 
      addXP(reward);
      logHistoryEvent("foco", "parcial", "Tempo de Foco", minutesToAdd, reward);
 
      const missionMinutes = gameState.agentMode ? minutesToAdd * 2 : minutesToAdd;
      incrementMissionProgress(1, missionMinutes);

      alert(`PARCIAL CONSOLIDADO: +${minutesToAdd} min de foco e +${reward} XP ${gameState.agentMode ? "(BÔNUS AGENTE 2x)" : ""} registrados!`);

      resetTimer(currentFocusTime, "focus");
    });
  }

  document.getElementById("btn-set-focus").addEventListener("click", () => {
    resetTimer(currentFocusTime, "focus");
  });

  document
    .getElementById("btn-short-break")
    .addEventListener("click", () => resetTimer(currentBreakTime, "break"));

  // Timer Presets Logic
  document.querySelectorAll(".btn-preset").forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = parseInt(button.getAttribute("data-time"));
      resetTimer(minutes, mode); // Adjusts whichever mode we are in
    });
  });

  // Manual Timer Logic
  document.getElementById("btn-apply-manual").addEventListener("click", () => {
    const input = document.getElementById("manual-input");
    const minutes = parseFloat(input.value);

    if (minutes > 0 && minutes <= 999) {
      resetTimer(minutes, mode); // Adjusts whichever mode we are in
      input.value = ""; // Clear for next use
    } else {
      alert("Por favor, insira um valor entre 1 e 999.");
    }
  });

  // Quote Change on Double-Click
  document
    .getElementById("quote-container")
    .addEventListener("dblclick", () => {
      showRandomQuote();
    });

  // Lógica do SYS DUMP (Auto-salvamento)
  const sysDumpTextarea = document.getElementById("sys-dump-textarea");
  const btnWipeDump = document.getElementById("btn-wipe-dump");
  if (sysDumpTextarea) {
    sysDumpTextarea.value = localStorage.getItem("doroapp_sys_dump") || "";

    let saveTimeout;
    sysDumpTextarea.addEventListener("input", () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem("doroapp_sys_dump", sysDumpTextarea.value);
      }, 300);
    });
  }

  if (btnWipeDump && sysDumpTextarea) {
    btnWipeDump.addEventListener("click", () => {
      if (sysDumpTextarea.value.trim() !== "") {
        playSound("start");
        sysDumpTextarea.value = "";
        localStorage.removeItem("doroapp_sys_dump");
      }
    });
  }

  // Hidden XP Override Logic
  let opClickCount = 0;
  let opClickTimer;
  document.getElementById("operator-id").addEventListener("click", () => {
    opClickCount++;
    clearTimeout(opClickTimer);

    if (opClickCount >= 5) {
      const newXP = prompt(
        "PROTOCOLO DE SOBREPOSIÇÃO: Insira o novo valor de XP:",
      );
      if (newXP !== null && !isNaN(newXP)) {
        gameState.xp = parseInt(newXP);
        updateLevel();
        alert(`XP atualizado para ${gameState.xp}`);
      }
      opClickCount = 0;
    } else {
      opClickTimer = setTimeout(() => {
        opClickCount = 0;
      }, 2000);
    }
  });

  // Agent Mode Toggle logic
  const agentToggleButton = document.getElementById("btn-agent-toggle");
  agentToggleButton.addEventListener("click", () => {
    gameState.agentMode = !gameState.agentMode;
    document.getElementById("agent-status-text").innerText = gameState.agentMode
      ? "ON"
      : "OFF";
    toggleAgentModeVisuals(gameState.agentMode);
    saveGame();
  });

  // Color swatch selector
  document.querySelectorAll('.color-swatch').forEach(el => {
    el.addEventListener('click', () => {
      gameState.agentColor = el.dataset.color;
      applyAgentColor(gameState.agentColor);
      saveGame();
    });
  });

  // Configurar botões de adicionar tarefa no Kanban
  document.querySelectorAll(".btn-add-task").forEach((btn) => {
    btn.addEventListener("click", () => {
      const priority = btn.getAttribute("data-priority");
      const listEl = document.getElementById(`list-${priority}`);
      if (!listEl) return;

      // Impede múltiplos inputs abertos simultaneamente
      if (listEl.querySelector(".new-task-input")) return;

      const inputWrap = document.createElement("div");
      inputWrap.className = "new-task-input";
      inputWrap.innerHTML = `<input type="text" class="task-input-field" placeholder="Nova tarefa..." autofocus />`;
      listEl.prepend(inputWrap);

      const input = inputWrap.querySelector("input");
      input.focus();

      let committed = false;
      const commit = () => {
        if (committed) return;
        committed = true;
        const text = input.value.trim();
        if (text) {
          addTask(text, priority);
        }
        inputWrap.remove();
      };

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          committed = true;
          inputWrap.remove();
        }
      });
      input.addEventListener("blur", commit);
    });
  });

  // History UI listeners
  updateHistoryCountUI();

  const btnExportHistory = document.getElementById("btn-export-history");
  if (btnExportHistory) {
    btnExportHistory.addEventListener("click", () => {
      const historyStr = localStorage.getItem("doroapp_history_log") || "[]";
      const blob = new Blob([historyStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const today = new Date().toISOString().slice(0, 10);
      a.download = `doroapp-historico-${today}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  const btnImportHistory = document.getElementById("btn-import-history");
  const inputImportHistory = document.getElementById("input-import-history");
  if (btnImportHistory && inputImportHistory) {
    btnImportHistory.addEventListener("click", () => {
      inputImportHistory.click();
    });

    inputImportHistory.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const importedData = JSON.parse(content);

          if (!Array.isArray(importedData)) {
            alert("Erro: O arquivo de log deve ser um array JSON válido.");
            return;
          }

          if (confirm(`Deseja realmente importar ${importedData.length} registros de histórico? Isso irá substituir o histórico atual deste navegador.`)) {
            localStorage.setItem("doroapp_history_log", JSON.stringify(importedData));
            updateHistoryCountUI();
            alert("Histórico de logs importado com sucesso!");
            backupLogLocalmente();
            renderStatsGraph();
          }
        } catch (err) {
          alert("Erro ao ler o arquivo JSON: " + err.message);
        }
        inputImportHistory.value = "";
      };
      reader.readAsText(file);
    });
  }

  // Expose clear history functionality only via browser console
  window.clearDoroappHistory = function() {
    if (confirm("Deseja realmente limpar todo o histórico de logs salvos? Esta ação não pode ser desfeita.")) {
      localStorage.setItem("doroapp_history_log", "[]");
      updateHistoryCountUI();
      renderStatsGraph();
      alert("Histórico de logs limpo com sucesso.");
    }
  };

  // Configurar lembrete de água a cada hora (das 08:00 às 21:00)
  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    Notification.requestPermission();
  }

  // Verifica a cada 15s se deve disparar alerta de água nos checkpoints
  setInterval(() => {
    const now = new Date();
    const todayStr = now.toLocaleDateString('sv');
    const hhmm = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const CHECKPOINTS = ["07:00","10:00","11:30","16:00"];

    if (!CHECKPOINTS.includes(hhmm)) return;

    const mission = gameState.missions.find(m => m.id === 4);
    if (!mission || mission.completed || !isWaterAlertActive(mission)) return;

    let waterAlerts = { date: "", alerted: [] };
    try {
      const saved = localStorage.getItem("doroapp_water_alerts");
      if (saved) waterAlerts = JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao ler doroapp_water_alerts:", e);
    }

    if (waterAlerts.date !== todayStr) {
      waterAlerts.date = todayStr;
      waterAlerts.alerted = [];
    }

    if (!waterAlerts.alerted.includes(hhmm)) {
      waterAlerts.alerted.push(hhmm);
      localStorage.setItem("doroapp_water_alerts", JSON.stringify(waterAlerts));
      showWaterNotification();
    }
  }, 15000);
});

// Função para exibir a notificação visual (modal) e do sistema para hidratação
function showWaterNotification() {
  // 1. Tocar som de alerta
  playSound("finish");

  // 2. Disparar notificação nativa do sistema, se permitido
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    new Notification("Protocolo Hidratação", {
      body: "Hora de beber água! 💧",
      icon: "imagens/doroapp_favicon.svg"
    });
  }

  // 3. Criar e injetar o modal Cyberpunk não-bloqueante
  const modalId = "water-alert-modal";
  if (document.getElementById(modalId)) return; // Evita modais duplicados

  const modal = document.createElement("div");
  modal.id = modalId;
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(2, 2, 3, 0.85)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "10000";
  modal.style.backdropFilter = "blur(4px)";

  const content = document.createElement("div");
  content.style.backgroundColor = "var(--matrix-dark)";
  content.style.border = "2px solid var(--matrix-green)";
  content.style.boxShadow = "0 0 20px var(--matrix-glow)";
  content.style.padding = "2rem";
  content.style.borderRadius = "var(--radius)";
  content.style.maxWidth = "400px";
  content.style.width = "90%";
  content.style.textAlign = "center";
  content.style.fontFamily = "var(--font-mono)";
  content.style.color = "var(--matrix-green)";
  content.style.animation = "glitch-alert 0.3s ease";

  content.innerHTML = `
    <h2 style="font-family: var(--font-terminal); font-size: 2rem; margin-bottom: 1rem; color: var(--matrix-green); text-shadow: 0 0 5px var(--matrix-glow);">⚠️ PROTOCOLO HIDRATAÇÃO ⚠️</h2>
    <p style="font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.4;">Está na hora de tomar água! 💧 Mantenha o sistema biológico em alta performance.</p>
    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button id="btn-water-confirm" style="background-color: var(--matrix-green); color: var(--matrix-bg); border: none; padding: 10px 20px; font-family: var(--font-mono); font-weight: bold; cursor: pointer; border-radius: var(--radius); text-shadow: none; box-shadow: 0 0 10px var(--matrix-glow); transition: all 0.2s;">BEBER ÁGUA (+XP)</button>
      <button id="btn-water-close" style="background-color: transparent; color: var(--matrix-green); border: 1px solid var(--matrix-green); padding: 10px 20px; font-family: var(--font-mono); cursor: pointer; border-radius: var(--radius); transition: all 0.2s;">IGNORAR</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Injetar estilos css específicos se ainda não existirem
  if (!document.getElementById("water-modal-styles")) {
    const style = document.createElement("style");
    style.id = "water-modal-styles";
    style.textContent = `
      @keyframes glitch-alert {
        0% { transform: scale(0.9) rotate(-1deg); filter: hue-rotate(90deg); }
        50% { transform: scale(1.02) rotate(1deg); filter: hue-rotate(-90deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      #btn-water-confirm:hover {
        background-color: var(--matrix-bg) !important;
        color: var(--matrix-green) !important;
        border: 1px solid var(--matrix-green) !important;
        box-shadow: 0 0 15px var(--matrix-glow) !important;
      }
      #btn-water-close:hover {
        background-color: rgba(0, 255, 65, 0.1) !important;
        box-shadow: 0 0 10px var(--matrix-glow) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Configurar ações dos botões do modal
  document.getElementById("btn-water-confirm").onclick = () => {
    // Incrementa a missão de água (ID 4) em 1 passo
    incrementMissionProgress(4, 1);
    document.body.removeChild(modal);
  };

  document.getElementById("btn-water-close").onclick = () => {
    document.body.removeChild(modal);
  };
}
