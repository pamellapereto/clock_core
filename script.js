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
