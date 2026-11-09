import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini API client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback intelligent responses in Uzbek when no API key or offline
function getIntelligentUzbekFallback(prompt: string, code?: string): string {
  const p = prompt.toLowerCase();
  
  if (p.includes('react') || p.includes('useeffect') || p.includes('usestate') || p.includes('hook')) {
    return `### 🚀 VELORA AI Mentor: React bo'yicha tushuntirish

React-da **Hooklar** funksional komponentlarda holat (state) va hayotiy sikl (lifecycle) jarayonlarini boshqarishga imkon beradi.

#### Asosiy Hooklar:
1. \`useState\`: Komponentda o'zgaruvchan ma'lumotlarni saqlash va yangilash.
\`\`\`jsx
const [count, setCount] = useState(0);
// setCount(count + 1) orqali yangilanadi
\`\`\`

2. \`useEffect\`: Nojo'ya ta'sirlarni (API so'rovlari, hodisa tinglovchilari, taymerlar) boshqarish:
\`\`\`jsx
useEffect(() => {
  console.log("Komponent yuklandi yoki count o'zgardi");
  return () => {
    // Tozalash (cleanup) kodi
  };
}, [count]); // Bog'liqliklar massivi
\`\`\`

💡 **Maslahat:** Har doim dependency arrayga e'tibor bering. Bo'sh \`[]\` massiv komponent faqat bir marta mount bo'lganda ishga tushishini bildiradi!`;
  }

  if (p.includes('python') || p.includes('ai') || p.includes('sun\'iy intellekt')) {
    return `### 🐍 VELORA AI Mentor: Python va Sun'iy Intellekt

Python — sun'iy intellekt (AI) va mashinali o'rganish (Machine Learning) uchun dunyodagi eng ommabop dasturlash tilidir!

#### Nima uchun Python?
* **O'qilishi oson sintaksis**: Kod yozish insoniy tilga yaqin.
* **Boy kutubxonalar**: \`NumPy\`, \`Pandas\`, \`TensorFlow\`, \`PyTorch\`, \`Scikit-Learn\`.

#### Oddiy misol:
\`\`\`python
# Foydalanuvchini salomlash va ma'lumot tahlili
def ai_greeting(name, skill_level):
    skills = {"boshlangich": "Asosiy sintaksis", "orta": "OOP va Funksiyalar", "yuqori": "Neyron to'rlar"}
    recom = skills.get(skill_level.lower(), "Algoritmlar")
    return f"Salom {name}! Sizga tavsiya etilgan yo'nalish: {recom}"

print(ai_greeting("Ibrohim", "orta"))
\`\`\`

🎯 **Keyingi qadam:** VELORA Python kursimizning 4-modulida siz sun'iy intellekt asoslarini to'liq o'rganasiz!`;
  }

  if (p.includes('javascript') || p.includes('closure') || p.includes('promise') || p.includes('async')) {
    return `### ⚡ VELORA AI Mentor: JavaScript Asoslari

JavaScriptda **Async/Await** asinxron operatsiyalarni (masalan, serverdan ma'lumot olish) qulay boshqarish usulidir:

\`\`\`javascript
async function fetchVeloraData() {
  try {
    const res = await fetch('/api/courses');
    if (!res.ok) throw new Error("Tarmoq xatosi!");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
}
\`\`\`

#### Closure (Yopiq muhit):
Funksiya o'zi e'lon qilingan tashqi doiradagi o'zgaruvchilarni eslab qolishi:
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\``;
  }

  if (p.includes('sql') || p.includes('database') || p.includes('baza') || p.includes('join')) {
    return `### 🗄️ VELORA AI Mentor: SQL va Relyatsion Ma'lumotlar Bazasi

SQL ma'lumotlarni saqlash, boshqarish va murakkab so'rovlarni bajarishda standart hisoblanadi.

#### SQL JOIN Turlari:
* **INNER JOIN**: Har ikki jadvalda ham mos keluvchi qatorlarni tanlaydi.
* **LEFT JOIN**: Chap jadvaldagi barcha qatorlarni va o'ng jadvaldagi mos qatorlarni oladi.
* **RIGHT JOIN**: O'ng jadvaldagi barcha qatorlarni va chap jadvaldagi mos qatorlarni oladi.

\`\`\`sql
-- Foydalanuvchilar va ularning kurslarini bog'lash
SELECT 
    users.name,
    courses.title,
    users.xp_points
FROM users
INNER JOIN enrollments ON users.id = enrollments.user_id
INNER JOIN courses ON enrollments.course_id = courses.id
WHERE users.xp_points > 500
ORDER BY users.xp_points DESC;
\`\`\``;
  }

  return `### 🔮 VELORA AI Mentor: Savolingizga javob

Salom! Sizning savolingizni qabul qildim: **"${prompt}"**

Dasturlashda muvaffaqiyatga erishishning asosiy qoidasi:
1. **Muammoni mayda qismlarga bo'ling** (Dekompozitsiya).
2. **Kodni bosqichma-bosqich yozing** va konsol orqali tekshiring.
3. **Xatolardan qo'rqmang** — xato bu kompyuter sizga nima kerakligini ko'rsatayotgan maslahatdir!

\`\`\`javascript
// Har qanday yangi dastur intizom va amaliyotdan boshlanadi
const student = {
  name: "Kelajak Dasturchisi",
  platform: "VELORA",
  status: "O'rganmoqda",
  motto: "Kelajak shu yerdan boshlanadi!"
};

console.log(\`\${student.name} \${student.platform}da faol o'rganmoqda!\`);
\`\`\`

Agar sizda aniq kod xatosi bo'lsa, kodni bu yerga yoki **Playground** muhitiga kiriting va men uni qatorma-qator tekshirib beraman!`;
}

// 1. AI Chat Endpoint
app.post('/api/ai/ask', async (req: Request, res: Response) => {
  try {
    const { prompt, context, code, language } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: "Savol (prompt) kiritilishi shart." });
    }

    if (aiClient) {
      try {
        const systemInstruction = `Siz VELORA futuristik dasturlash ta'lim platformasining yetakchi sun'iy intellekt ustozi (AI Mentor)siz.
Platforma shiori: "Kelajak shu yerdan boshlanadi." (THE FUTURE STARTS WITH CODE).
Siz talabalar va dasturchilarga faqat o'zbek tilida (lotin yozuvida), juda do'stona, aniq, ilmiy va motivatsion ruhda tushuntirasiz.
Dasturlash tillari: HTML, CSS, JavaScript, TypeScript, Python, C++, Java, React, PHP, SQL, UI/UX, Full Stack.
Javobingizda:
1. Mavzuni oddiy hayotiy misol bilan tushuntiring.
2. Ishlaydigan va toza kod namunasi (Markdown sintaksisida) keltiring.
3. Keng tarqalgan xatoliklar va ularning yechimini ko'rsating.
4. Talabaga amaliy maslahat bering.`;

        let contents = prompt;
        if (code) {
          contents = `Talaba kodi (${language || 'kod'}):
\`\`\`${language || ''}
${code}
\`\`\`
Savol/Mavzu: ${prompt}`;
        }
        if (context) {
          contents = `Kontekst: ${context}\n\n${contents}`;
        }

        // 8 second safety timeout so user never experiences hanging
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Gemini API timeout')), 8000)
        );

        const aiResponse = await Promise.race([
          aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
            },
          }),
          timeoutPromise
        ]);

        const textOutput = aiResponse.text;
        if (textOutput) {
          return res.json({
            reply: textOutput,
            source: 'gemini',
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to intelligent demo mentor:', geminiError?.message || geminiError);
      }
    }

    // Fallback response in Uzbek
    const fallbackReply = getIntelligentUzbekFallback(prompt, code);
    return res.json({
      reply: fallbackReply,
      source: 'velora-engine',
    });
  } catch (error: any) {
    console.error('Error handling /api/ai/ask:', error);
    res.status(500).json({ error: "Serverda kutilmagan xatolik yuz berdi." });
  }
});

// 2. Code Explanation & Debugging Endpoint
app.post('/api/ai/explain-code', async (req: Request, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Kod matni kiritilishi shart." });
    }

    if (aiClient) {
      try {
        const prompt = `Ushbu ${language || 'dasturlash'} kodini tahlil qiling va o'zbek tilida tushuntirib bering:
\`\`\`${language || ''}
${code}
\`\`\`
Iltimos, quyidagi tuzilishda javob bering:
1. **Kodni vazifasi**: Bu kod nima qiladi?
2. **Qatorma-qator tahlil**: Asosiy qismlar qanday ishlaydi?
3. **Ehtimoliy kamchilik yoki xatolar**: Kodda qanday muammo bo'lishi mumkin?
4. **Takomillashtirilgan versiya**: Optimal kod varianti.`;

        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Gemini API timeout')), 8000)
        );

        const aiResponse = await Promise.race([
          aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
          }),
          timeoutPromise
        ]);

        if (aiResponse.text) {
          return res.json({
            explanation: aiResponse.text,
            source: 'gemini',
          });
        }
      } catch (err: any) {
        console.warn('Explain code Gemini error, falling back:', err?.message);
      }
    }

    const fallbackExplanation = `### 🔍 VELORA Kod Tahlili (${language?.toUpperCase() || 'KOD'})

**1. Kodning asosiy maqsadi:**
Ushbu kod parchasi dasturiy mantiqni shakllantirish, qiymatlarni hisoblash yoki interfeys elementlarini boshqarish uchun mo'ljallangan.

**2. Asosiy e'tibor qaratilishi lozim bo'lgan jihatlar:**
* O'zgaruvchilar doirasi (Scope) va ularning to'g'ri e'lon qilinishi (\`let\`, \`const\` yoki mos tip).
* Xatoliklarni ushlash (\`try...catch\` yoki shart operatorlari orqali tekshirish).
* Algoritm tezligi va xotira sarfi.

**3. Tavsiya etilgan takomillashtirish:**
Kodni modullarga ajrating va har bir funksiyaga faqat bitta aniq vazifa yuklang (Single Responsibility Principle).`;

    return res.json({
      explanation: fallbackExplanation,
      source: 'velora-engine',
    });
  } catch (error) {
    res.status(500).json({ error: "Kod tahlili paytida xatolik yuz berdi." });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    brand: 'VELORA',
    slogan: 'Kelajak shu yerdan boshlanadi.',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`⚡ VELORA platform server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server start error:', err);
});
