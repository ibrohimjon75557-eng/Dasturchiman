import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    category: 'Kurslar',
    question: 'Dasturlashni mutlaqo noldan o‘rganish mumkinmi?',
    answer: 'Albatta! Kurslarimiz aynan kompyuter va dasturlash olamiga endi kirib kelayotgan boshlovchilar uchun moslashtirilgan. HTML va CSS kurslarimiz orqali hech qanday tajribasiz ilk veb-sahifangizni yaratishdan boshlaysiz.'
  },
  {
    category: 'AI Mentor',
    question: 'VELORA AI Ustozi qanday yordam bera oladi?',
    answer: 'Bizning sun\'iy intellekt mentorimiz Google Gemini ilg‘or modeli asosida ishlaydi. U o‘zbek tilida kodlaringizdagi xatolarni topadi, sintaksisni tushuntiradi, amaliy topshiriqlar uchun maslahat beradi va kunu tun 24/7 rejimida xizmatingizda bo‘ladi.'
  },
  {
    category: 'Playground',
    question: 'Kodni sinash uchun kompyuterga maxsus dasturlar o‘rnatish kerakmi?',
    answer: 'Yo‘q, shart emas! VELORA ichida to‘liq ishlovchi HTML, CSS va JavaScript Playground muhiti mavjud. Siz to‘g‘ridan-to‘g‘ri brauzerda kod yozishingiz, jonli natijasini ko‘rishingiz va konsol xabarlarini tahlil qilishingiz mumkin.'
  },
  {
    category: 'Sertifikat',
    question: 'Beriladigan sertifikatlar rasmiymi va ular qanday tekshiriladi?',
    answer: 'Ha! Har bir kursni to‘liq (barcha darslar va viktorinalarni) bajarganingizdan so‘ng sizga maxsus individual seriya raqami va QR kodga ega rasmiy VELORA sertifikati taqdim etiladi. Ushbu sertifikatni PDF shaklida yuklab olish va rezyumeingizga qo‘shish mumkin.'
  },
  {
    category: 'Platforma',
    question: 'XP ballari va Kunlik Seriya (Streak) tizimi nima beradi?',
    answer: 'Bu o‘qish jarayonini qiziqarli qiluvchi gamifikatsiya tizimidir. Har bir tugatilgan dars, to‘g‘ri bajarilgan mashq va viktorina uchun sizga XP beriladi. Kunlik o‘qishni uzmaslik esa yangi yutuqlar (achievements) va reytingdagi yuqori o‘rinlarni taqdim etadi.'
  },
  {
    category: 'Narxlar',
    question: 'Kurslar bepulmi yoki to‘lov talab etiladimi?',
    answer: 'VELORA missiyasi dasturlash ta\'limini barchaga ochiq qilishdir. Asosiy darslarimiz, kod muhiti va AI maslahatchi xizmatlari mutlaqo bepul taqdim etiladi.'
  }
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
          FAQ
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Ko‘p Beriladigan Savollar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Platforma, darslar va sertifikatlash bo‘yicha eng ko‘p beriladigan savollarga aniq javoblar.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_LIST.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl transition-all border ${
                isOpen 
                  ? 'glass-panel-elevated border-purple-500/40 shadow-lg' 
                  : 'glass-panel border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-cyan-500/30 shrink-0">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-8 border-t border-white/10 text-xs text-slate-400">
        <p>Boshqa savollaringiz bormi?</p>
        <p className="mt-1">
          Bizning <span className="text-cyan-400 font-bold">24/7 AI Mentorimiz</span> yoki qo‘llab-quvvatlash xizmati bilan bog‘laning.
        </p>
      </div>

    </div>
  );
};
