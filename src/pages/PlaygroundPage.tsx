import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Download, 
  Maximize2, 
  Minimize2, 
  Bot, 
  Terminal, 
  Check, 
  Sparkles, 
  FileCode, 
  Layers, 
  AlertCircle,
  HelpCircle,
  ChevronDown,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PlaygroundPreset {
  id: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

const PRESETS: PlaygroundPreset[] = [
  {
    id: 'preset-velora-card',
    name: '1. Neon Velora Karta',
    description: '3D neon nurlanuvchi va animatsiyali interaktiv karta',
    html: `<div class="container">
  <div class="card">
    <div class="badge">VELORA INTERACTIVE</div>
    <h2>Kelajak shu yerdan boshlanadi</h2>
    <p>Ushbu kartani ustiga sichqonchani olib keling va neon nur effektini his eting.</p>
    <button id="glowBtn">Bosib ko'ring ✨</button>
    <div id="counter" class="counter">Bosishlar: 0</div>
  </div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #06060c;
  color: #f1f5f9;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  padding: 20px;
}

.card {
  background: rgba(18, 18, 35, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 24px;
  padding: 32px;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  transition: all 0.4s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 0 45px rgba(6, 182, 212, 0.45);
  border-color: #22d3ee;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid #8b5cf6;
  color: #c084fc;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #fff, #c084fc, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

button {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  transition: all 0.2s;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.7);
}

.counter {
  margin-top: 16px;
  font-size: 12px;
  font-family: monospace;
  color: #38bdf8;
}`,
    js: `const btn = document.getElementById('glowBtn');
const counterDisplay = document.getElementById('counter');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  counterDisplay.textContent = 'Bosishlar soni: ' + count + ' 🚀';
  
  // Random color flash
  const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  btn.style.boxShadow = '0 0 35px ' + randomColor;
  console.log('Tugma bosildi! Yangi qiymat:', count);
});`
  },
  {
    id: 'preset-cyber-clock',
    name: '2. Kiber Raqamli Soat',
    description: 'Neon elektr ko‘k rangli real vaqtli futuristik soat',
    html: `<div class="clock-wrap">
  <div class="logo">VELORA TIME SYSTEM</div>
  <div id="clock" class="digits">00:00:00</div>
  <div id="date" class="date-str">...</div>
  <div class="pulse-ring"></div>
</div>`,
    css: `body {
  background: #030308;
  color: #06b6d4;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.clock-wrap {
  text-align: center;
  padding: 40px;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 30px;
  background: rgba(8, 12, 28, 0.8);
  box-shadow: 0 0 50px rgba(6, 182, 212, 0.25);
  position: relative;
}

.logo {
  font-size: 11px;
  letter-spacing: 4px;
  color: #a855f7;
  font-weight: 800;
  margin-bottom: 16px;
}

.digits {
  font-size: 48px;
  font-weight: 800;
  text-shadow: 0 0 20px #06b6d4, 0 0 40px #06b6d4;
  color: #ffffff;
}

.date-str {
  margin-top: 14px;
  font-size: 13px;
  color: #94a3b8;
  letter-spacing: 1px;
}`,
    js: `function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('uz-UZ', options);
}

setInterval(updateTime, 1000);
updateTime();
console.log('Kiber soat ishga tushdi!');`
  },
  {
    id: 'preset-calculator',
    name: '3. Interaktiv Kalkulyator',
    description: 'Glassmorphism uslubidagi to‘liq ishlovchi hisoblagich',
    html: `<div class="calc">
  <div id="screen" class="screen">0</div>
  <div class="grid">
    <button class="btn op" onclick="clearScreen()">C</button>
    <button class="btn op" onclick="append('/')">/</button>
    <button class="btn op" onclick="append('*')">*</button>
    <button class="btn op" onclick="append('-')">-</button>
    <button class="btn" onclick="append('7')">7</button>
    <button class="btn" onclick="append('8')">8</button>
    <button class="btn" onclick="append('9')">9</button>
    <button class="btn op" onclick="append('+')">+</button>
    <button class="btn" onclick="append('4')">4</button>
    <button class="btn" onclick="append('5')">5</button>
    <button class="btn" onclick="append('6')">6</button>
    <button class="btn equal" onclick="compute()">=</button>
    <button class="btn" onclick="append('1')">1</button>
    <button class="btn" onclick="append('2')">2</button>
    <button class="btn" onclick="append('3')">3</button>
    <button class="btn" onclick="append('0')">0</button>
  </div>
</div>`,
    css: `body {
  background: #090914;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: sans-serif;
}

.calc {
  background: rgba(22, 22, 42, 0.9);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 35px rgba(139, 92, 246, 0.2);
  width: 280px;
}

.screen {
  background: #05050b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 14px;
  text-align: right;
  font-size: 26px;
  font-family: monospace;
  color: #38bdf8;
  margin-bottom: 18px;
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: rgba(139, 92, 246, 0.3);
}

.btn.op {
  color: #c084fc;
}

.btn.equal {
  background: #8b5cf6;
  grid-row: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}`,
    js: `let currentInput = '';
const screen = document.getElementById('screen');

function append(val) {
  if (currentInput === '0' && val !== '.') currentInput = '';
  currentInput += val;
  screen.textContent = currentInput;
}

function clearScreen() {
  currentInput = '0';
  screen.textContent = currentInput;
}

function compute() {
  try {
    const res = eval(currentInput);
    screen.textContent = res;
    currentInput = String(res);
  } catch (err) {
    screen.textContent = 'Xato';
    currentInput = '';
  }
}`
  },
  {
    id: 'preset-canvas-stars',
    name: '4. Galaktika Yulduzlar Maydoni',
    description: 'HTML5 Canvas bilan animatsion fazo zarralari',
    html: `<canvas id="canvas"></canvas>
<div class="overlay">VELORA SPACE RUNTIME</div>`,
    css: `body {
  margin: 0;
  overflow: hidden;
  background: #000;
  font-family: monospace;
}

canvas {
  display: block;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
  letter-spacing: 5px;
  font-weight: bold;
  pointer-events: none;
  text-shadow: 0 0 20px #8b5cf6, 0 0 40px #06b6d4;
}`,
    js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 1.5 + 0.2
  });
}

function animate() {
  ctx.fillStyle = 'rgba(5, 5, 12, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#c084fc';
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > canvas.height) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();`
  },
  {
    id: 'preset-blank',
    name: '5. Bo‘sh Shablon',
    description: 'Noldan o‘z g‘oyangizni yozish uchun toza sahifa',
    html: `<h1>Salom Dunyo!</h1>\n<p>Kodingizni bu yerga yozing.</p>`,
    css: `body {\n  background: #05050b;\n  color: #fff;\n  padding: 40px;\n  font-family: sans-serif;\n}`,
    js: `console.log("Playground faol!");`
  }
];

export const PlaygroundPage: React.FC = () => {
  const { unlockAchievement } = useAuth();
  const [activeLang, setActiveLang] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(PRESETS[0].html);
  const [cssCode, setCssCode] = useState(PRESETS[0].css);
  const [jsCode, setJsCode] = useState(PRESETS[0].js);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[0].id);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<{ type: 'log' | 'error'; message: string; time: string }[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  // AI Mentor explanation drawer
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate iframe srcDoc
  const compileAndRun = () => {
    setConsoleLogs([]);

    const combinedDoc = `
<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8">
    <style>
      ${cssCode}
    </style>
  </head>
  <body>
    ${htmlCode}
    <script>
      (function() {
        const _log = console.log;
        const _error = console.error;
        console.log = function(...args) {
          window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
          _log.apply(console, args);
        };
        console.error = function(...args) {
          window.parent.postMessage({ type: 'CONSOLE_ERROR', message: args.join(' ') }, '*');
          _error.apply(console, args);
        };
        window.onerror = function(msg, url, line) {
          window.parent.postMessage({ type: 'CONSOLE_ERROR', message: msg + ' (Qator: ' + line + ')' }, '*');
        };
      })();

      try {
        ${jsCode}
      } catch (e) {
        console.error("Xatolik: " + e.message);
      }
    </script>
  </body>
</html>`;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = combinedDoc;
    }

    unlockAchievement('ach-playground-pro');
  };

  useEffect(() => {
    compileAndRun();

    const handleMessage = (e: MessageEvent) => {
      if (e.data && (e.data.type === 'CONSOLE_LOG' || e.data.type === 'CONSOLE_ERROR')) {
        const timeStr = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setConsoleLogs(prev => [
          ...prev, 
          { 
            type: e.data.type === 'CONSOLE_LOG' ? 'log' : 'error', 
            message: e.data.message, 
            time: timeStr 
          }
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSelectPreset = (pId: string) => {
    setSelectedPresetId(pId);
    const p = PRESETS.find(item => item.id === pId);
    if (p) {
      setHtmlCode(p.html);
      setCssCode(p.css);
      setJsCode(p.js);
      setTimeout(() => compileAndRun(), 100);
    }
  };

  const handleReset = () => {
    const p = PRESETS.find(item => item.id === selectedPresetId);
    if (p) {
      setHtmlCode(p.html);
      setCssCode(p.css);
      setJsCode(p.js);
      setConsoleLogs([]);
      setTimeout(() => compileAndRun(), 100);
    }
  };

  const handleCopy = () => {
    const currentCode = activeLang === 'html' ? htmlCode : activeLang === 'css' ? cssCode : jsCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>VELORA Playground Loyihasi</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'velora-project.html';
    a.click();
  };

  // Ask AI to review code
  const handleAskAiToExplain = async () => {
    setAiDrawerOpen(true);
    setAiLoading(true);
    setAiExplanation(null);

    const fullCode = `=== HTML ===\n${htmlCode}\n\n=== CSS ===\n${cssCode}\n\n=== JAVASCRIPT ===\n${jsCode}`;

    try {
      const response = await fetch('/api/ai/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: fullCode,
          language: 'HTML/CSS/JS Web Stack',
        }),
      });

      const data = await response.json();
      setAiExplanation(data.explanation || data.reply || "Kod muvaffaqiyatli tahlil qilindi.");
    } catch (e) {
      setAiExplanation("AI Mentor serveriga ulanishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#05050a] text-slate-100 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 p-4' : 'py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}`}>
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-950 flex items-center justify-center border border-purple-500/40 text-purple-300">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>VELORA Kod Playground</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Jonli
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              HTML, CSS va JavaScript kodlarini yozing, sinang va tahlil qiling.
            </p>
          </div>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Selector */}
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-purple-500"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Run Button */}
          <button
            onClick={compileAndRun}
            className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            title="Kodni ishga tushirish (Run)"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Ishga tushirish</span>
          </button>

          {/* AI Explain Button */}
          <button
            onClick={handleAskAiToExplain}
            className="px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-900 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="AI Mentor yordamida tahlil qilish"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AI Tahlil</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Boshlang'ich holatga qaytarish"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Kodni nusxalash"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="HTML fayl qilib yuklab olish"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Kichraytirish' : 'To‘liq ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Workspace (Grid 2 Cols: Editor & Live Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[580px]">
        
        {/* Left Column: Multi-tab Code Editor */}
        <div className="rounded-3xl glass-panel-elevated border border-purple-500/30 flex flex-col overflow-hidden shadow-2xl">
          {/* Tabs bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#090914] border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveLang('html')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeLang === 'html'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setActiveLang('css')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeLang === 'css'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setActiveLang('js')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeLang === 'js'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                script.js
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              {activeLang.toUpperCase()}
            </span>
          </div>

          {/* Active Editor Textarea */}
          <div className="relative flex-1 bg-[#06060f] p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-hidden">
            {activeLang === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-orange-300 resize-none focus:outline-none font-mono"
              />
            )}
            {activeLang === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-cyan-300 resize-none focus:outline-none font-mono"
              />
            )}
            {activeLang === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-yellow-300 resize-none focus:outline-none font-mono"
              />
            )}
          </div>
        </div>

        {/* Right Column: Live Iframe Preview & Console */}
        <div className="rounded-3xl glass-panel-elevated border border-purple-500/30 flex flex-col overflow-hidden shadow-2xl">
          {/* Preview Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#090914] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white">Jonli Natija (Live Preview)</span>
            </div>
            
            <button
              onClick={() => setShowConsole(!showConsole)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                showConsole ? 'bg-purple-900 text-purple-200' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Konsol ({consoleLogs.length})</span>
            </button>
          </div>

          {/* Sandboxed iframe */}
          <div className="flex-1 bg-white relative">
            <iframe
              ref={iframeRef}
              title="VELORA Sandbox Preview"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0"
            />
          </div>

          {/* Console Drawer */}
          {showConsole && (
            <div className="h-44 bg-[#090914] border-t border-white/10 p-3 font-mono text-xs overflow-y-auto space-y-1.5 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between pb-1 text-[11px] text-slate-500 border-b border-white/5">
                <span>KONSOL XABARLARI</span>
                <button onClick={() => setConsoleLogs([])} className="text-purple-400 hover:underline">
                  Tozalash
                </button>
              </div>
              {consoleLogs.length === 0 ? (
                <p className="text-slate-500 italic pt-2">Konsol bo‘sh. JavaScript orqali console.log(...) qiling.</p>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-start gap-2 ${
                      log.type === 'error' ? 'text-red-400 bg-red-950/30 p-1 rounded' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 shrink-0">[{log.time}]</span>
                    <span className="break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

      {/* AI Mentor Code Analysis Modal / Side Drawer */}
      {aiDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel-elevated p-6 sm:p-8 shadow-2xl border border-purple-500/40 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-purple-300 border border-purple-500/30">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">VELORA AI Ustoz Tahlili</h3>
                  <p className="text-[11px] text-slate-400">Playground kodingizning qatorma-qator tekshiruvi</p>
                </div>
              </div>
              <button
                onClick={() => setAiDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-cyan-300 font-mono">Sun'iy intellekt kodingizni o‘rganmoqda...</p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {aiExplanation}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex justify-end">
              <button
                onClick={() => setAiDrawerOpen(false)}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
              >
                Tushundim
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
