import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code2, 
  Copy, 
  Check, 
  Trash2, 
  Zap, 
  CornerDownLeft, 
  Terminal,
  Paperclip,
  CheckCircle2
} from 'lucide-react';

interface AiMentorPageProps {
  initialPrompt?: string;
  onOpenPlaygroundWithCode?: (code: string) => void;
}

const QUICK_SUGGESTIONS = [
  'React useEffect nima va u qachon ishlatiladi?',
  'Python-da ma\'lumotlar turlari va ro\'yxatlar bilan ishlash',
  'JavaScriptda Promise va async/await farqi nima?',
  'SQLda JOIN turlarini misollar bilan tushuntirib ber',
  'Full-Stack dasturchi bo‘lish uchun qanday qadamlar kerak?'
];

export const AiMentorPage: React.FC<AiMentorPageProps> = ({
  initialPrompt,
  onOpenPlaygroundWithCode,
}) => {
  const { unlockAchievement } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Assalomu alaykum! Men **VELORA AI Ustozi**man. 🤖

Dasturlash bo‘yicha har qanday savolingizga javob berishga, kodlaringizdagi xatolarni topishga va yangi texnologiyalarni o‘rganishingizga yordam berishga tayyorman. 

Quyidagi tezkor savollardan birini tanlang yoki o‘z kodingizni yozib yuboring!`,
      timestamp: 'Hozirgina'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [codeAttachment, setCodeAttachment] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt;
    if (!textToSend.trim() && !codeAttachment.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      codeSnippet: codeAttachment ? { code: codeAttachment, language: 'dasturlash' } : undefined,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    const sentCode = codeAttachment;
    setCodeAttachment('');
    setShowCodeInput(false);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          code: sentCode || undefined,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "Savolingizga javob tayyorlashda xatolik yuz berdi.";

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      unlockAchievement('ach-ai-chat');
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: "Kechirasiz, tarmoq xatosi yuz berdi. Iltimos, yana bir bor so‘rab ko‘ring.",
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: "Suhbat tozalandi. Qanday dasturlash mavzusida yordam bera olaman?",
        timestamp: 'Hozirgina'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <div className="w-full h-full rounded-[14px] bg-[#090914] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>VELORA AI Ustoz</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-cyan-300 border border-cyan-500/30">
                Google Gemini Flash
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              O‘zbek tilida 24/7 ishlovchi shaxsiy dasturlash mentori
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-red-500/40 transition-colors"
          title="Tarixni tozalash"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tozalash</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                  : 'glass-panel-elevated text-slate-200 border border-purple-500/20 rounded-tl-none'
              }`}
            >
              {/* If user attached code */}
              {msg.codeSnippet && (
                <div className="mb-3 p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-400 mb-1">Biriktirilgan kod:</div>
                  <pre><code>{msg.codeSnippet.code}</code></pre>
                </div>
              )}

              {/* Message Body */}
              <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                {msg.text}
              </div>

              {/* Message Footer */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => handleCopyMessage(msg.text, msg.id)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Nusxalandi</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Nusxa olish</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-cyan-400 shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass-panel-elevated p-4 rounded-2xl rounded-tl-none border border-purple-500/20 text-xs text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AI Ustoz o‘zbek tilida javob tayyorlamoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Pills */}
      {messages.length <= 2 && (
        <div className="pb-3 flex items-center gap-2 overflow-x-auto shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          {QUICK_SUGGESTIONS.map((sug, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSend(sug)}
              className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[11px] text-slate-300 hover:text-white hover:border-purple-500/50 whitespace-nowrap transition-all"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Code Attachment Drawer */}
      {showCodeInput && (
        <div className="mb-2 p-3 rounded-2xl bg-slate-950 border border-purple-500/40 shrink-0 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>KODINGIZNI BU YERGA QO‘YING:</span>
            <button onClick={() => setShowCodeInput(false)} className="text-slate-400 hover:text-white">
              Yopish
            </button>
          </div>
          <textarea
            value={codeAttachment}
            onChange={(e) => setCodeAttachment(e.target.value)}
            rows={4}
            placeholder="Tekshirish yoki tushuntirish kerak bo'lgan kodingizni bu yerga kiriting..."
            className="w-full bg-slate-900/80 p-3 rounded-xl border border-white/10 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>
      )}

      {/* Input Form Bar */}
      <div className="relative rounded-2xl glass-panel-elevated border border-purple-500/30 p-2 shrink-0 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Attach Code Toggle */}
          <button
            type="button"
            onClick={() => setShowCodeInput(!showCodeInput)}
            className={`p-2.5 rounded-xl border transition-all ${
              showCodeInput || codeAttachment
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Kod biriktirish"
          >
            <Code2 className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Dasturlash bo‘yicha savolingizni yozing..."
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading || (!inputPrompt.trim() && !codeAttachment.trim())}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-40 flex items-center gap-1.5"
          >
            <span>Yuborish</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
