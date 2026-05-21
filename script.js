const clockRange = document.getElementById('clockRange');
const coreRange = document.getElementById('coreRange');
const clockValue = document.getElementById('clockValue');
const coreValue = document.getElementById('coreValue');
const rhythmText = document.getElementById('rhythmText');
const beatIcon = document.getElementById('beatIcon');
const coreOutput = document.getElementById('coreOutput');
const performanceText = document.getElementById('performanceText');
const heartBtn = document.getElementById('heartBtn');
const flowElements = document.querySelectorAll('.artery, .vein');

function classifyRhythm(clock) {
  if (clock < 2) return 'baixo';
  if (clock < 3.5) return 'moderado';
  if (clock < 4.5) return 'alto';
  return 'muito alto';
}

function updateSimulation() {
  const clock = Number(clockRange.value);
  const cores = Number(coreRange.value);

  clockValue.textContent = clock.toFixed(1);
  coreValue.textContent = cores;

  const rhythm = classifyRhythm(clock);
  rhythmText.textContent = rhythm;

  const duration = Math.max(0.28, 1.35 - clock * 0.18);
  beatIcon.style.animationDuration = `${duration}s`;
  heartBtn.style.animationDuration = `${duration}s`;
  flowElements.forEach(el => {
    el.style.animationDuration = `${duration + 0.25}s`;
  });

  coreOutput.innerHTML = '';
  for (let i = 1; i <= cores; i++) {
    const dot = document.createElement('div');
    dot.className = 'core-dot';
    dot.textContent = `Core ${i}`;
    coreOutput.appendChild(dot);
  }

  performanceText.textContent = `Com ${clock.toFixed(1)} GHz, a CPU possui um ritmo de ciclos ${rhythm}. Com ${cores} core(s), ela consegue distribuir melhor as tarefas simultâneas. Na analogia, seria como um coração batendo em uma frequência específica, enquanto mais núcleos aumentam a quantidade de frentes de trabalho acontecendo ao mesmo tempo.`;
}

clockRange.addEventListener('input', updateSimulation);
coreRange.addEventListener('input', updateSimulation);

heartBtn.addEventListener('click', () => {
  heartBtn.classList.toggle('paused');
  const paused = heartBtn.classList.contains('paused');
  flowElements.forEach(el => {
    el.style.animationPlayState = paused ? 'paused' : 'running';
  });
});

updateSimulation();

// Simulador da página de Threads
const threadCoreRange = document.getElementById('threadCoreRange');
const logicalThreadRange = document.getElementById('logicalThreadRange');
const taskRange = document.getElementById('taskRange');

if (threadCoreRange && logicalThreadRange && taskRange) {
  const threadCoreValue = document.getElementById('threadCoreValue');
  const logicalThreadValue = document.getElementById('logicalThreadValue');
  const taskValue = document.getElementById('taskValue');
  const capacityText = document.getElementById('capacityText');
  const threadLoadBar = document.getElementById('threadLoadBar');
  const threadStatusText = document.getElementById('threadStatusText');
  const threadOutput = document.getElementById('threadOutput');
  const threadPerformanceText = document.getElementById('threadPerformanceText');

  function updateThreadSimulation() {
    const physicalCores = Number(threadCoreRange.value);
    const logicalPerCore = Number(logicalThreadRange.value);
    const tasks = Number(taskRange.value);
    const capacity = physicalCores * logicalPerCore;
    const load = Math.min(100, Math.round((tasks / capacity) * 100));

    threadCoreValue.textContent = physicalCores;
    logicalThreadValue.textContent = logicalPerCore;
    taskValue.textContent = tasks;
    capacityText.textContent = capacity;
    threadLoadBar.style.width = `${load}%`;

    let status = 'Carga equilibrada.';
    if (tasks > capacity) status = 'Sobrecarga: há mais tarefas do que threads lógicas disponíveis.';
    else if (tasks === capacity) status = 'Uso total: todas as threads lógicas estão ocupadas.';
    else if (tasks < physicalCores) status = 'Baixa carga: nem todos os cores físicos precisam trabalhar.';
    threadStatusText.textContent = status;

    threadOutput.innerHTML = '';
    const slotsToShow = Math.max(capacity, tasks);
    for (let i = 1; i <= slotsToShow; i++) {
      const slot = document.createElement('div');
      slot.className = 'thread-slot';
      if (i > capacity) slot.classList.add('overloaded');
      slot.textContent = i <= capacity ? `Thread lógica ${i}` : `Fila ${i - capacity}`;
      threadOutput.appendChild(slot);
    }

    const smtText = logicalPerCore === 2
      ? 'Com 2 threads lógicas por core, o processador tenta aproveitar espaços ociosos de cada núcleo físico, mas essas threads ainda compartilham recursos internos.'
      : 'Com 1 thread lógica por core, cada núcleo físico executa uma linha principal de trabalho por vez.';

    threadPerformanceText.textContent = `Com ${physicalCores} core(s) físico(s) e ${logicalPerCore} thread(s) lógica(s) por core, a capacidade aparente é de ${capacity} thread(s). Existem ${tasks} tarefa(s) abertas. ${smtText}`;
  }

  threadCoreRange.addEventListener('input', updateThreadSimulation);
  logicalThreadRange.addEventListener('input', updateThreadSimulation);
  taskRange.addEventListener('input', updateThreadSimulation);
  updateThreadSimulation();
}
