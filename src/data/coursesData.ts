import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'course-html',
    slug: 'html-asoslari',
    title: 'HTML: Veb Asoslari va Gipermatn',
    tagline: 'Internet olamiga ilk professional qadamingiz',
    description: 'Veb-saytlarning skeleti va semantik tuzilishini noldan professional darajagacha o‘rganing.',
    longDescription: 'HTML (HyperText Markup Language) — barcha veb-sahifalarning asosi hisoblanadi. Ushbu kursda siz zamonaviy HTML5 standartlari, semantik teglar, SEO uchun to‘g‘ri struktura, multimedia elementlari, audio/video qo‘shish va formalar yaratishni to‘liq o‘zbek tilida amaliy mashg‘ulotlar orqali o‘rganasiz.',
    category: 'Frontend',
    iconName: 'FileCode2',
    level: 'Boshlang\'ich',
    durationHours: 12,
    totalLessons: 8,
    totalXp: 850,
    accentColor: '#f97316',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    badge: 'Veb Asosi',
    enrolledStudentsCount: 3420,
    rating: 4.9,
    modules: [
      {
        id: 'mod-html-1',
        title: '1-Modul: HTML Asoslari va Birinchi Sahifa',
        description: 'Veb brauzerlar qanday ishlashi, HTML fayl strukturasi va asosiy teglar.',
        lessons: [
          {
            id: 'lesson-html-1',
            courseId: 'course-html',
            title: 'HTML nima va birinchi veb-sahifangizni yaratish',
            durationMinutes: 18,
            videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
            summary: 'HTML tili tarixi, veb brauzerlarning ishlash mexanizmi va <!DOCTYPE html> siri.',
            contentMarkdown: `### 🌐 HTML nima?
**HTML** — bu inglizcha *HyperText Markup Language* so‘zlarining qisqartmasi bo‘lib, o‘zbek tilida **Gipermatnli belgilash tili** degan ma'noni anglatadi.

Dasturlash dunyosida veb-saytni bino deb tasavvur qilsak:
* **HTML** — binoning fundamenti va g‘ishtlari (skeleti).
* **CSS** — binoning pardozlash ishlari, bo‘yoqlari va dizayni.
* **JavaScript** — bino ichidagi elektr ta'minoti, liftlar va aqlli tizimlar.

#### HTML Hujjatining standart tuzilishi:
Har bir HTML sahifa quyidagi standart skeletga ega bo‘ladi:
* \`<!DOCTYPE html>\` — brauzerga ushbu fayl eng so‘nggi HTML5 formatida ekanligini ma'lum qiladi.
* \`<html>\` — sahifaning ildiz (root) tegi.
* \`<head>\` — sahifa haqidagi metama'lumotlar (sarlavha, shriftlar, kodlash turi).
* \`<body>\` — foydalanuvchi ko‘radigan butun asosiy kontent.`,
            codeSnippets: [
              {
                title: 'Birinchi HTML kodi',
                language: 'html',
                code: `<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8">
    <title>Mening Birinchi Sahifam</title>
  </head>
  <body>
    <h1>Salom, Velora!</h1>
    <p>Men dasturlashni noldan o'rganishni boshladim.</p>
    <a href="https://velora.uz">Velora platformasiga o'tish</a>
  </body>
</html>`,
                explanation: 'Sarlavha h1 va paragraf p teglari yordamida oddiy sahifa.'
              }
            ],
            exercises: [
              {
                id: 'ex-html-1',
                title: 'Shaxsiy portfio bosh sahifasini tuzing',
                instructions: 'Quyidagi kodga o‘z ismingiz yozilgan <h1> sarlavhasi va qiziqishingiz haqida <p> matni qo‘shing.',
                starterCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Ismingizni h1 tegi ichiga yozing -->
    
  </body>
</html>`,
                solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <h1>Ali Valiyev</h1>
    <p>Men kelajak Full-Stack dasturchisiman.</p>
  </body>
</html>`,
                hint: '<h1> va <p> teglarini to‘g‘ri yopishni unutmang: <h1>...</h1>'
              }
            ],
            quiz: [
              {
                id: 'q-html-1',
                question: 'HTML nima va uning asosiy vazifasi qaysi?',
                options: [
                  'Dasturiy algoritmlarni hisoblash tili',
                  'Veb-sahifaning mazmuni va strukturasini belgilovchi til',
                  'Faqat ma\'lumotlar bazasini boshqarish vositasi',
                  'Operatsion tizim yadrosi'
                ],
                correctIndex: 1,
                explanation: 'HTML — veb-sahifalarning strukturasi va kontentini belgilash uchun xizmat qiladi.'
              },
              {
                id: 'q-html-2',
                question: 'HTML5 standartini brauzerga qaysi teg orqali e\'lon qilamiz?',
                options: [
                  '<doctype html5>',
                  '<!DOCTYPE html>',
                  '<version html="5">',
                  '<html>'
                ],
                correctIndex: 1,
                explanation: '<!DOCTYPE html> — HTML5 deklaratsiyasining to‘g‘ri standartidir.'
              }
            ],
            xp: 100
          },
          {
            id: 'lesson-html-2',
            courseId: 'course-html',
            title: 'Semantik HTML5 teglari va SEO',
            durationMinutes: 22,
            videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
            summary: 'header, nav, main, section, article, aside va footer orqali toza arxitektura.',
            contentMarkdown: `### 🎯 Semantik HTML nima va nima uchun u muhim?
**Semantik teglar** o‘z nomidayoq brauzerga ham, qidiruv tizimlariga (Google, Yandex) ham o‘z vazifasini ochiq aytib turadi.

Oddiy \`<div>\` hamma narsaga ishlatilishi mumkin, lekin \`<header>\` yoki \`<nav>\` aniq navigatsiya qismi ekanligini bildiradi.

#### Asosiy semantik teglar:
* \`<header>\` — Sahifaning yuqori shapka qismi (logo, shior).
* \`<nav>\` — Asosiy menyu va navigatsiya havolalari.
* \`<main>\` — Sahifaning yagona asosiy mazmuni.
* \`<section>\` — Mustaqil tematik bo‘lim.
* \`<article>\` — Mustaqil to‘liq maqola yoki post.
* \`<aside>\` — Yon panel yoki qo‘shimcha ma'lumotlar.
* \`<footer>\` — Pastki qism (mualliflik huquqi, ijtimoiy tarmoqlar).`,
            codeSnippets: [
              {
                title: 'Semantik sahifa strukturasi',
                language: 'html',
                code: `<header>
  <h1>VELORA Akademiya</h1>
  <nav>
    <a href="#kurslar">Kurslar</a>
    <a href="#aloqa">Aloqa</a>
  </nav>
</header>
<main>
  <article>
    <h2>Dasturlashni o'rganish sirlari</h2>
    <p>Har kuni amaliyot qiling va xatolardan qo'rqmang.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 VELORA. Barcha huquqlar himoyalangan.</p>
</footer>`,
                explanation: 'Semantik teglar sahifani Google qidiruvida yuqori o‘ringa olib chiqishga yordam beradi.'
              }
            ],
            exercises: [
              {
                id: 'ex-html-2',
                title: 'Semantik navigatsiya menyusi yasang',
                instructions: '<nav> tegi ichida 3 ta havola (Bosh sahifa, Kurslar, Biz haqimizda) yarating.',
                starterCode: `<header>
  <!-- Shu yerga nav va 3 ta havola qo'ying -->
</header>`,
                solutionCode: `<header>
  <nav>
    <a href="/">Bosh sahifa</a>
    <a href="/kurslar">Kurslar</a>
    <a href="/about">Biz haqimizda</a>
  </nav>
</header>`,
                hint: '<nav> tegi ichiga <a> teglari yoziladi.'
              }
            ],
            quiz: [
              {
                id: 'q-html-3',
                question: 'Qaysi teg sahifadagi asosiy navigatsiya menyusi uchun mo‘ljallangan?',
                options: ['<menu-bar>', '<nav>', '<navigation>', '<links>'],
                correctIndex: 1,
                explanation: '<nav> — HTML5 da navigatsiya menyusining rasmiy semantik tegidir.'
              }
            ],
            xp: 120
          }
        ]
      }
    ]
  },
  {
    id: 'course-css',
    slug: 'css-zamonaviy-dizayn',
    title: 'CSS: Zamonaviy Veb Dizayn va Animatsiyalar',
    tagline: 'Veb-saytlarga jon va go‘zallik baxsh eting',
    description: 'Flexbox, Grid, zamonaviy neon effektlar, gradientlar, responsive moslashuvchanlik va CSS animatsiyalar.',
    longDescription: 'CSS (Cascading Style Sheets) — internetdagi har bir go‘zal interfeysning poydevoridir. Ushbu kursda siz matnlarga uslub berish, zamonaviy ranglar palitrasi, Flexbox va CSS Grid arxitekturasi, media-so‘rovlar orqali mobil moslashuvchanlik va silliq animatsiyalarni o‘rganasiz.',
    category: 'Frontend',
    iconName: 'Palette',
    level: 'Boshlang\'ich',
    durationHours: 16,
    totalLessons: 10,
    totalXp: 950,
    accentColor: '#38bdf8',
    gradient: 'from-blue-500 via-indigo-500 to-cyan-400',
    badge: 'Dizayn Ustasi',
    enrolledStudentsCount: 2890,
    rating: 4.95,
    modules: [
      {
        id: 'mod-css-1',
        title: '1-Modul: CSS Asoslari va Box Model',
        description: 'Selektorlar, ranglar, padding, margin va chegaralar sirlari.',
        lessons: [
          {
            id: 'lesson-css-1',
            courseId: 'course-css',
            title: 'CSS Selektorlar va Box Model tushunchasi',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
            summary: 'Margin, border, padding va content o‘rtasidagi farq hamda box-sizing: border-box qoidasi.',
            contentMarkdown: `### 🎨 CSS nima va u qanday ishlaydi?
CSS har qanday HTML elementini rang, o‘lcham, joylashuv va animatsiya bilan boyitadi.

#### CSS Box Model:
Brauzer har bir elementni to‘rtburchak quti deb biladi:
1. **Content**: Matn yoki rasmning o‘zi.
2. **Padding**: Kontent va chegara orasidagi ichki bo‘shliq.
3. **Border**: Elementning tashqi chizig‘i (chegarasi).
4. **Margin**: Elementning qo‘shni elementlar bilan oraliq masofasi.

\`\`\`css
/* Har bir dasturchi bilishi shart bo'lgan universal qoida */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
\`\`\``,
            codeSnippets: [
              {
                title: 'Neon Velora Card Stili',
                language: 'css',
                code: `.neon-card {
  background: rgba(18, 18, 35, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  transition: all 0.3s ease;
}

.neon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 35px rgba(6, 182, 212, 0.4);
}`,
                explanation: 'Futuristik neon karta dizayni va silliq hover animatsiyasi.'
              }
            ],
            exercises: [
              {
                id: 'ex-css-1',
                title: 'Tugmaga neon nur effekti bering',
                instructions: 'Tugmaga fon rangi binafsha (#8b5cf6), matn oqi (#fff) va box-shadow orqali nur qo‘shing.',
                starterCode: `.btn {
  /* O'z kodingizni bu yerga yozing */
}`,
                solutionCode: `.btn {
  background-color: #8b5cf6;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 9999px;
  box-shadow: 0 0 20px #8b5cf6;
}`,
                hint: 'box-shadow: 0 0 20px #8b5cf6; dan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-css-1',
                question: 'Elementning ichki bo‘shlig‘ini belgilash uchun qaysi xususiyat ishlatiladi?',
                options: ['margin', 'padding', 'spacing', 'gap'],
                correctIndex: 1,
                explanation: 'Padding — element ichidagi bo‘shliq, margin esa tashqi bo‘shliqdir.'
              }
            ],
            xp: 110
          }
        ]
      }
    ]
  },
  {
    id: 'course-js',
    slug: 'javascript-dinamik-dasturlash',
    title: 'JavaScript: Interaktiv Veb Dasturlash',
    tagline: 'Veb-saytlarga aql va dinamika bering',
    description: 'Zamonaviy ES6+, DOM manipulyatsiyasi, Hodisalar, Asinxron dasturlash, Promise, Fetch API va LocalStorage.',
    longDescription: 'JavaScript — dunyodagi eng ommabop va qudratli dasturlash tillaridan biri. U veb-sahifalarni jonsiz matndan interaktiv aqlli ilovaga aylantiradi. Kursda siz o‘zgaruvchilar, funksiyalar, massivlar bilan ishlash, server bilan ma\'lumot almashish (AJAX/Fetch) va real loyihalar yaratishni o‘rganasiz.',
    category: 'Frontend',
    iconName: 'Zap',
    level: 'O\'rta',
    durationHours: 24,
    totalLessons: 14,
    totalXp: 1400,
    accentColor: '#eab308',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    badge: 'Kodni Boshqaruvchi',
    enrolledStudentsCount: 4120,
    rating: 4.98,
    modules: [
      {
        id: 'mod-js-1',
        title: '1-Modul: Zamonaviy JS Asoslari (ES6+)',
        description: 'let, const, Arrow Functions, Destructuring va Spread operatorlari.',
        lessons: [
          {
            id: 'lesson-js-1',
            courseId: 'course-js',
            title: 'O‘zgaruvchilar, Funksiyalar va Arrow Functions',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
            summary: 'var, let va const farqi hamda yengil va zamonaviy strelkali funksiyalar.',
            contentMarkdown: `### ⚡ JavaScript Dunyosiga Xush Kelibsiz!
JavaScript brauzer ichida to‘g‘ridan-to‘g‘ri ishlaydigan yagona to‘laqonli dasturlash tilidir.

#### O‘zgaruvchilar:
* \`const\` — qiymati o‘zgarmaydigan doimiy o‘zgaruvchilar uchun.
* \`let\` — qiymati keyinchalik yangilanishi mumkin bo‘lgan o‘zgaruvchilar uchun.
* \`var\` — eski usul, zamonaviy kodda ishlatilmasligi tavsiya etiladi.

#### Arrow Functions (Strelkali funksiyalar):
\`\`\`javascript
// Oddiy funksiya
function hisobla(a, b) {
  return a + b;
}

// Zamonaviy Arrow function
const hisoblaModern = (a, b) => a + b;
console.log(hisoblaModern(10, 25)); // 35
\`\`\``,
            codeSnippets: [
              {
                title: 'Interaktivlik yaratish (DOM)',
                language: 'javascript',
                code: `const btn = document.querySelector('#startBtn');
const display = document.querySelector('#output');

let xpPoints = 0;

btn.addEventListener('click', () => {
  xpPoints += 50;
  display.textContent = \`Sizning yangi XP ballingiz: \${xpPoints}\`;
  display.classList.add('glow-purple');
});`,
                explanation: 'Tugma bosilganda foydalanuvchi XP ballini oshiruvchi kod.'
              }
            ],
            exercises: [
              {
                id: 'ex-js-1',
                title: 'Salomlashuv funksiyasini yozing',
                instructions: 'Foydalanuvchi ismini qabul qilib, "Salom, [ism]! Veloraga xush kelibsiz!" degan xabar qaytaruvchi arrow function tuzing.',
                starterCode: `// greeting arrow funksiyasini yozing:
const greeting = `,
                solutionCode: `const greeting = (name) => \`Salom, \${name}! Veloraga xush kelibsiz!\`;`,
                hint: 'Template literal (baktik `...`) dan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-js-1',
                question: 'Qaysi kalit so‘z qayta o‘zgartirib bo‘lmaydigan o‘zgaruvchi e\'lon qiladi?',
                options: ['var', 'let', 'const', 'static'],
                correctIndex: 2,
                explanation: 'const — o‘zgarmas (constant) o‘zgaruvchilarni e\'lon qilish uchun ishlatiladi.'
              }
            ],
            xp: 130
          }
        ]
      }
    ]
  },
  {
    id: 'course-python',
    slug: 'python-algoritmlar-va-ai',
    title: 'Python: Dasturlash va Sun\'iy Intellekt',
    tagline: 'Kelajak texnologiyalari va ma\'lumotlar tahlili kaliti',
    description: 'Python sintaksisi, Algoritmlar, Ma\'lumotlar tuzilmasi, OOP, Fayllar bilan ishlash va AI/ML asoslari.',
    longDescription: 'Python soddaligi va keng imkoniyatlari bilan butun dunyoni zabt etgan til. Sun\'iy intellekt, neyron to‘rlar, ma\'lumotlar ilmi (Data Science) va backend avtomatlashtirishda 1-o‘rinda turadi. Kursda siz professional dasturchilar kabi fikrlashni va real loyihalar yaratishni o‘rganasiz.',
    category: 'Backend',
    iconName: 'Terminal',
    level: 'Boshlang\'ich',
    durationHours: 28,
    totalLessons: 16,
    totalXp: 1600,
    accentColor: '#3b82f6',
    gradient: 'from-blue-600 via-indigo-600 to-sky-400',
    badge: 'AI Asosi',
    enrolledStudentsCount: 5210,
    rating: 4.97,
    modules: [
      {
        id: 'mod-py-1',
        title: '1-Modul: Python Asoslari va Sintaksis',
        description: 'Tipizatsiya, shartlar, sikllar va qulay ro‘yxatlar.',
        lessons: [
          {
            id: 'lesson-py-1',
            courseId: 'course-python',
            title: 'Python sintaksisi va ma\'lumotlar turlari',
            durationMinutes: 24,
            videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
            summary: 'Pythonda chiroyli kod yozish, indentsiya qoidalari va o‘zgaruvchilar.',
            contentMarkdown: `### 🐍 Python: Dunyodagi eng go‘zal sintaksis
Python dasturlash tili boshqa tillardan farqli ravishda qavslar emas, balki **bo‘shliqlar (indentation)** yordamida kod bloklarini belgilaydi.

#### Ma'lumot turlari:
* \`int\` — butun sonlar (\`42\`, \`-5\`)
* \`float\` — o‘nli kasrlar (\`3.14\`, \`0.5\`)
* \`str\` — matnlar (\`"Velora"\`)
* \`bool\` — mantiqiy qiymatlar (\`True\`, \`False\`)
* \`list\` — tartiblangan ro‘yxatlar (\`["HTML", "CSS", "Python"]\`)
* \`dict\` — kalit-qiymat lug‘atlari (\`{"nomi": "Velora", "reyting": 5.0}\`)`,
            codeSnippets: [
              {
                title: 'Python ro‘yxatlar va filtrlash',
                language: 'python',
                code: `# Ro'yxatdagi eng faol o'quvchilarni topish
students = [
    {"name": "Ibrohim", "xp": 1450},
    {"name": "Malika", "xp": 2100},
    {"name": "Aziz", "xp": 800}
]

top_students = [s["name"] for s in students if s["xp"] > 1000]
print(f"Yetakchi o'quvchilar: {', '.join(top_students)}")`,
                explanation: 'List comprehension orqali tezkor va toza ma\'lumot saralash.'
              }
            ],
            exercises: [
              {
                id: 'ex-py-1',
                title: 'Juft sonlarni topuvchi funksiya',
                instructions: 'Berilgan son juft bo‘lsa True, toq bo‘lsa False qaytaruvchi is_even(num) funksiyasini yozing.',
                starterCode: `def is_even(num):
    # O'z kodingizni yozing
    pass`,
                solutionCode: `def is_even(num):
    return num % 2 == 0`,
                hint: '% qoldiq olish operatoridan foydalaning (num % 2 == 0).'
              }
            ],
            quiz: [
              {
                id: 'q-py-1',
                question: 'Pythonda kod bloklari nima orqali ajratiladi?',
                options: ['Nuqta-vergul (;)', 'Figurali qavslar ({})', 'Bo‘sh joylar (Indentation)', 'Kvadrat qavslar ([])'],
                correctIndex: 2,
                explanation: 'Pythonda qator boshidagi bo‘sh joylar (indentation) bloklarni belgilaydi.'
              }
            ],
            xp: 120
          }
        ]
      }
    ]
  },
  {
    id: 'course-cpp',
    slug: 'cpp-tizimli-dasturlash',
    title: 'C++: Tizimli Dasturlash va Yuqori Tezlik',
    tagline: 'Kompyuter xotirasi va unumdorlikning mutlaq hukmdori',
    description: 'Pointerlar, Xotirani to‘g‘ridan-to‘g‘ri boshqarish, Obyektga yo‘naltirilgan dasturlash (OOP) va STL kutubxonasi.',
    longDescription: 'C++ — o‘yin dvigatellari (Unreal Engine), operatsion tizimlar, yuqori chastotali savdo tizimlari va avtomobil avtopilotlarining asosi. Kursda siz apparat darajasida fikrlashni, xotirani boshqarishni va murakkab algoritmlarni tezkor ishlashini ta\'minlashni o‘rganasiz.',
    category: 'Dasturlash Asoslari',
    iconName: 'Cpu',
    level: 'Yuqori',
    durationHours: 32,
    totalLessons: 18,
    totalXp: 1800,
    accentColor: '#6366f1',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    badge: 'Tizim Ustasi',
    enrolledStudentsCount: 1980,
    rating: 4.92,
    modules: [
      {
        id: 'mod-cpp-1',
        title: '1-Modul: C++ Asoslari va Pointerlar',
        description: 'Xotira manzillari, havola (reference) va ko‘rsatkichlar (pointer).',
        lessons: [
          {
            id: 'lesson-cpp-1',
            courseId: 'course-cpp',
            title: 'Pointerlar va Xotirani Boshqarish',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y',
            summary: 'Kompyuter xotirasiga to‘g‘ridan-to‘g‘ri murojaat qilish va tezlik sirlari.',
            contentMarkdown: `### 🚀 Nega C++ eng tezkor?
C++ tili dasturchiga kompyuterning operativ xotirasi (RAM) ustidan to‘liq nazorat beradi.

#### Pointer (Ko‘rsatkich) nima?
Pointer — bu boshqa o‘zgaruvchining operativ xotiradagi **manzilini (memory address)** saqlovchi maxsus o‘zgaruvchidir.

\`\`\`cpp
#include <iostream>

int main() {
    int ball = 100;
    int* ptr = &ball; // 'ptr' o'zgaruvchisi 'ball'ning xotira manzilini saqlaydi

    std::cout << "Qiymat: " << *ptr << std::endl;
    std::cout << "Xotira manzili: " << ptr << std::endl;

    return 0;
}
\`\`\``,
            codeSnippets: [
              {
                title: 'Klasslar va OOP C++ da',
                language: 'cpp',
                code: `#include <iostream>
#include <string>

class VeloraStudent {
private:
    std::string name;
    int xp;

public:
    VeloraStudent(std::string n, int x) : name(n), xp(x) {}

    void addXp(int points) {
        xp += points;
        std::cout << name << " yangi XP ball oldi: " << xp << std::endl;
    }
};`,
                explanation: 'C++ da inkapsulyatsiya va konstruktor bilan ishlash.'
              }
            ],
            exercises: [
              {
                id: 'ex-cpp-1',
                title: 'Ikki sonni almashtirish (Swap)',
                instructions: 'Pointerlar yordamida ikkita sonning qiymatini almashtiruvchi swap(int* a, int* b) funksiyasini yozing.',
                starterCode: `void swap(int* a, int* b) {
    // Kodingizni yozing
}`,
                solutionCode: `void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
                hint: 'Vaqtinchalik o‘zgaruvchi (temp) ochib, *a qiymatini saqlang.'
              }
            ],
            quiz: [
              {
                id: 'q-cpp-1',
                question: 'O‘zgaruvchining xotira manzilini olish uchun qaysi belgi ishlatiladi?',
                options: ['*', '&', '#', '@'],
                correctIndex: 1,
                explanation: '& (ampersand) operatori o‘zgaruvchining manzilini qaytaradi.'
              }
            ],
            xp: 150
          }
        ]
      }
    ]
  },
  {
    id: 'course-java',
    slug: 'java-korporativ-dasturlash',
    title: 'Java: Korporativ Tizimlar va Android',
    tagline: 'Mustahkam, xavfsiz va global platformalar tili',
    description: 'JVM arxitekturasi, OOP prinsiplari, Kolleksiyalar, Multithreading va Spring Boot asoslari.',
    longDescription: 'Java — dunyodagi eng yirik banklar, korporativ gigantlar va milliardlab Android qurilmalarning tayanchi. "Bir marta yoz, hamma joyda ishlat" tamoyili asosida yaratilgan. Ushbu kursda siz toza arxitektura va mustahkam kod yozishni o‘rganasiz.',
    category: 'Backend',
    iconName: 'Coffee',
    level: 'O\'rta',
    durationHours: 30,
    totalLessons: 16,
    totalXp: 1700,
    accentColor: '#ef4444',
    gradient: 'from-red-600 via-rose-600 to-amber-500',
    badge: 'Enterprise Ustasi',
    enrolledStudentsCount: 2450,
    rating: 4.89,
    modules: [
      {
        id: 'mod-java-1',
        title: '1-Modul: Java va OOP Asoslari',
        description: 'Klasslar, obyektlar, merosxo‘rlik, polimorfizm va JVM.',
        lessons: [
          {
            id: 'lesson-java-1',
            courseId: 'course-java',
            title: 'OOP ning 4 ta asosiy ustuni',
            durationMinutes: 28,
            videoUrl: 'https://www.youtube.com/embed/grEKMHj56Wc',
            summary: 'Inkapsulyatsiya, Merosxo‘rlik, Polimorfizm va Abstraksiya amaliy misollarda.',
            contentMarkdown: `### ☕ Java va Obyektga Yo‘naltirilgan Dasturlash (OOP)
Java sof OOP tilidir. Har bir qator kod ma'lum bir sinf (class) ichida bo‘lishi shart.

#### 4 Asosiy Ustun:
1. **Encapsulation (Inkapsulyatsiya)**: Ma'lumotlarni yashirish va getter/setter orqali boshqarish.
2. **Inheritance (Merosxo‘rlik)**: Mavjud sinfdan yangi xususiyatlar meros olish (\`extends\`).
3. **Polymorphism (Polimorfizm)**: Bir xil interfeysning turli shakllarda harakatlanishi.
4. **Abstraction (Abstraksiya)**: Murakkab ichki detallarni yashirib, faqat zarur metodlarni ko‘rsatish.`,
            codeSnippets: [
              {
                title: 'Java OOP Namunasi',
                language: 'java',
                code: `public class Course {
    private String title;
    private int xp;

    public Course(String title, int xp) {
        this.title = title;
        this.xp = xp;
    }

    public void startLesson() {
        System.out.println("Dars boshlandi: " + title);
    }
}`,
                explanation: 'Java sinfi va konstruktori tuzilishi.'
              }
            ],
            exercises: [
              {
                id: 'ex-java-1',
                title: 'Getter va Setter yarating',
                instructions: 'User sinfiga private String email maydoni uchun getEmail() va setEmail() metodlarini yozing.',
                starterCode: `public class User {
    private String email;
    // getter va setterni yozing
}`,
                solutionCode: `public class User {
    private String email;
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}`,
                hint: 'public String getEmail() va public void setEmail(String email) shaklida bo‘ladi.'
              }
            ],
            quiz: [
              {
                id: 'q-java-1',
                question: 'Java kodini mashina kodiga qaysi virtual mashina o‘giradi?',
                options: ['V8 Engine', 'JVM (Java Virtual Machine)', 'Node Runtime', 'CLR'],
                correctIndex: 1,
                explanation: 'JVM (Java Virtual Machine) Java bayt-kodini turli operatsion tizimlarda bajaradi.'
              }
            ],
            xp: 140
          }
        ]
      }
    ]
  },
  {
    id: 'course-react',
    slug: 'react-zamonaviy-frontend',
    title: 'React: Zamonaviy Web Ilovalar',
    tagline: 'Dunyoning eng ommabop interfeys kutubxonasi',
    description: 'Komponentlar, JSX, useState, useEffect, Custom Hooks, Context API, Router va Redux Toolkit.',
    longDescription: 'React (Meta tomonidan ishlab chiqilgan) — zamonaviy veb ishlab chiqish standarti. Netflix, Instagram, Airbnb va millionlab ilovalar React ustiga qurilgan. Ushbu kursda siz komponentli arxitektura, reaktiv holatni boshqarish va to‘liq Single Page Application (SPA) yaratishni o‘rganasiz.',
    category: 'Frontend',
    iconName: 'Atom',
    level: 'O\'rta',
    durationHours: 26,
    totalLessons: 15,
    totalXp: 1650,
    accentColor: '#06b6d4',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    badge: 'UI Sehrgari',
    enrolledStudentsCount: 6340,
    rating: 4.99,
    modules: [
      {
        id: 'mod-react-1',
        title: '1-Modul: React Komponentlari va State',
        description: 'JSX sintaksisi, Props uzatish va useState hooki.',
        lessons: [
          {
            id: 'lesson-react-1',
            courseId: 'course-react',
            title: 'Komponentlar, Props va useState bilan ishlash',
            durationMinutes: 26,
            videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
            summary: 'Funksional komponentlar va ekranda o‘zgaruvchi ma\'lumotlarni reaktiv yangilash.',
            contentMarkdown: `### ⚛️ Nega aynan React?
React an'anaviy sahifalardan farqli ravishda sahifani qayta yuklamaydi, faqat o‘zgargan qismini Virtual DOM orqali yashin tezligida yangilaydi.

#### Asosiy Tushunchalar:
* **Komponent**: O‘z HTML, CSS va mantiqiy kodiga ega bo‘lgan qayta ishlatiluvchi blok.
* **Props**: Ota komponentdan bola komponentga uzatiladigan parametrlar.
* **State**: Komponentning ichki o‘zgaruvchan xotirasi.`,
            codeSnippets: [
              {
                title: 'Interaktiv Hisoblagich Komponenti',
                language: 'tsx',
                code: `import React, { useState } from 'react';

export const VeloraCounter = () => {
  const [streak, setStreak] = useState(1);

  return (
    <div className="glass-panel p-6 rounded-2xl text-center">
      <h3 className="text-xl font-bold text-white">Kunlik O'qish Seriyasi: {streak} kun 🔥</h3>
      <button 
        onClick={() => setStreak(prev => prev + 1)}
        className="mt-4 px-6 py-2.5 bg-purple-600 text-white rounded-xl shadow-[0_0_15px_#8b5cf6]"
      >
        Bugungi darsni tugatdim!
      </button>
    </div>
  );
};`,
                explanation: 'useState hooki orqali interaktiv seriya (streak) hisoblagichi.'
              }
            ],
            exercises: [
              {
                id: 'ex-react-1',
                title: 'Dark Mode Switcher komponenti',
                instructions: 'useState orqali isDark holatini saqlang va tugma bosilganda qiymatni teskarisiga o‘zgartiring.',
                starterCode: `import React, { useState } from 'react';

export const ThemeToggle = () => {
  // useState orqali isDark yarating
};`,
                solutionCode: `import React, { useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? 'Tungi rejim' : 'Kunduzgi rejim'}
    </button>
  );
};`,
                hint: 'setIsDark(prev => !prev) orqali qiymatni teskari qiling.'
              }
            ],
            quiz: [
              {
                id: 'q-react-1',
                question: 'React komponentida holat (state) yaratish uchun qaysi hook ishlatiladi?',
                options: ['useEffect', 'useState', 'useRef', 'useContext'],
                correctIndex: 1,
                explanation: 'useState — funksional komponentlarda holat yaratish uchun asosiy hookdir.'
              }
            ],
            xp: 150
          }
        ]
      }
    ]
  },
  {
    id: 'course-typescript',
    slug: 'typescript-xavfsiz-kod',
    title: 'TypeScript: Katta Masshtabli Xavfsiz Kod',
    tagline: 'JavaScriptga super-kuch va tiplar xavfsizligini bering',
    description: 'Interfeyslar, Tiplar, Generics, Enums, Type Guards va React bilan professional TypeScript.',
    longDescription: 'TypeScript — JavaScriptning tiplashtirilgan ustqurmasi bo‘lib, Microsoft tomonidan ishlab chiqilgan. U xatolarni kod ishga tushmasidanoq tahrirlovchida aniqlaydi va yirik jamoaviy loyihalarda kodni qayta ishlashni juda osonlashtiradi.',
    category: 'Frontend',
    iconName: 'FileCheck2',
    level: 'O\'rta',
    durationHours: 20,
    totalLessons: 12,
    totalXp: 1350,
    accentColor: '#3b82f6',
    gradient: 'from-blue-600 via-indigo-500 to-sky-400',
    badge: 'Xavfsiz Kod',
    enrolledStudentsCount: 3100,
    rating: 4.96,
    modules: [
      {
        id: 'mod-ts-1',
        title: '1-Modul: Asosiy Tiplar va Interfeyslar',
        description: 'Primitive tiplar, Interface, Type alias va ixtiyoriy maydonlar.',
        lessons: [
          {
            id: 'lesson-ts-1',
            courseId: 'course-typescript',
            title: 'Nima uchun TypeScript va Interface tuzilishi',
            durationMinutes: 22,
            videoUrl: 'https://www.youtube.com/embed/BwuLxPH8IDs',
            summary: 'Tip xatoliklaridan himoyalanish va o‘z ma\'lumot modellarimizni tuzish.',
            contentMarkdown: `### 🛡️ TypeScript Afzalliklari
JavaScriptda dastur ishga tushganda kelib chiqadigan \`undefined is not a function\` yoki noto‘g‘ri ma'lumot uzatish kabi xatolar TypeScript bilan deyarli nolga tushadi!

\`\`\`typescript
interface VeloraUser {
  id: string;
  name: string;
  xp: number;
  isPro?: boolean; // ixtiyoriy maydon
}

function giveBonus(user: VeloraUser, points: number): VeloraUser {
  return {
    ...user,
    xp: user.xp + points
  };
}
\`\`\``,
            codeSnippets: [
              {
                title: 'Generics (Umumiy tiplar)',
                language: 'typescript',
                code: `// Har qanday tipdagi ma'lumot uchun umumiy javob formati
interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  timestamp: string;
}

const courseRes: ApiResponse<{ title: string; level: string }> = {
  status: 'success',
  data: { title: 'TypeScript Asoslari', level: 'O\'rta' },
  timestamp: new Date().toISOString()
};`,
                explanation: 'Generics yordamida qayta ishlatiluvchi va xavfsiz tiplar tuzish.'
              }
            ],
            exercises: [
              {
                id: 'ex-ts-1',
                title: 'Student interfeysini yarating',
                instructions: 'name (string), age (number) va courses (string massivi) bo‘lgan Student interfeysini e\'lon qiling.',
                starterCode: `// Student interfeysini yozing`,
                solutionCode: `interface Student {
  name: string;
  age: number;
  courses: string[];
}`,
                hint: 'Massiv uchun string[] sintaksisidan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-ts-1',
                question: 'Ixtiyoriy (optional) maydonni belgilash uchun qaysi belgi ishlatiladi?',
                options: ['!', '?', '*', '#'],
                correctIndex: 1,
                explanation: 'Maydon nomidan keyin ? qo‘yish uning ixtiyoriy ekanligini bildiradi (masalan, age?: number).'
              }
            ],
            xp: 130
          }
        ]
      }
    ]
  },
  {
    id: 'course-php',
    slug: 'php-backend-va-laravel',
    title: 'PHP: Veb Dvigatellari va Backend',
    tagline: 'Internetning 75% saytlarini harakatga keltiruvchi kuch',
    description: 'PHP 8.3 asoslari, OOP, Formalar, MySQL integratsiyasi, REST API va zamonaviy Laravel freymvorki.',
    longDescription: 'PHP bugungi kunda ham dunyo veb-saytlarining aksariyat qismida, jumladan WordPress, Wikipedia va Laravel ekotizimida xizmat qilmoqda. Kursda siz server-side render, sessiyalar, xavfsizlik (CSRF/XSS) va kuchli REST API lar qurishni o‘rganasiz.',
    category: 'Backend',
    iconName: 'Server',
    level: 'O\'rta',
    durationHours: 24,
    totalLessons: 14,
    totalXp: 1450,
    accentColor: '#818cf8',
    gradient: 'from-indigo-500 via-purple-600 to-violet-700',
    badge: 'Backend Ustasi',
    enrolledStudentsCount: 2200,
    rating: 4.88,
    modules: [
      {
        id: 'mod-php-1',
        title: '1-Modul: PHP 8.x Asoslari va Formalar',
        description: 'Serverda kod bajarish, $_POST, $_GET va xavfsiz validatsiya.',
        lessons: [
          {
            id: 'lesson-php-1',
            courseId: 'course-php',
            title: 'PHP Sintaksisi va Server Mantiqi',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/OK_JCtrrv-c',
            summary: 'PHP kodining serverda bajarilishi va dinamik HTML generatsiyasi.',
            contentMarkdown: `### 🐘 PHP 8 ning yangi davri
Zamonaviy PHP avvalgi eski versiyalaridan tubdan farq qiladi: qat'iy tiplash, JIT kompilyator va kuchli OOP xususiyatlariga ega.

\`\`\`php
<?php
// Foydalanuvchini ro'yxatdan o'tkazish logikasi
class Student {
    public function __construct(
        public string $name,
        public string $email,
        public int $xp = 0
    ) {}

    public function awardXp(int $points): void {
        $this->xp += $points;
    }
}

$user = new Student("Javohir", "javohir@velora.uz");
$user->awardXp(100);
echo "Talaba XP: " . $user->xp;
?>
\`\`\``,
            codeSnippets: [
              {
                title: 'JSON REST API qaytarish',
                language: 'php',
                code: `<?php
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'platform' => 'VELORA',
    'courses_count' => 12
];

echo json_encode($response);
?>`,
                explanation: 'PHP orqali frontend uchun zamonaviy JSON API tayyorlash.'
              }
            ],
            exercises: [
              {
                id: 'ex-php-1',
                title: 'Salomlashuv funksiyasini yozing',
                instructions: 'Berilgan $ism bo‘yicha "Salom, $ism!" matnini qaytaruvchi funksiya yozing.',
                starterCode: `function salom($ism) {
    // Kodingizni yozing
}`,
                solutionCode: `function salom($ism) {
    return "Salom, " . $ism . "!";
}`,
                hint: 'Matnlarni birlashtirish uchun nuqta (.) operatoridan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-php-1',
                question: 'Pythonda va JavaScriptda o‘zgaruvchilar belgisisiz e\'lon qilinsa, PHPda qaysi belgi bilan boshlanadi?',
                options: ['&', '@', '$', '#'],
                correctIndex: 2,
                explanation: 'PHPda barcha o‘zgaruvchilar $ (dollar) belgisi bilan boshlanadi.'
              }
            ],
            xp: 120
          }
        ]
      }
    ]
  },
  {
    id: 'course-sql',
    slug: 'sql-malumotlar-bazasi',
    title: 'SQL: Relyatsion Ma\'lumotlar Bazasi',
    tagline: 'Ma\'lumotlar arxitekturasi va murakkab so‘rovlar san\'ati',
    description: 'PostgreSQL, MySQL, DDL/DML, JOIN turlari, Indekslash, Tranzaksiyalar va ACID qoidalari.',
    longDescription: 'Dunyodagi deyarli har qanday dasturning yuragi ma\'lumotlar bazasidir. Ushbu kursda siz jadvallar loyihalash, millionlab qatorlar ichidan bir zumda ma\'lumot topuvchi so‘rovlar yozish, indekslash orqali tezlikni 100 barobar oshirish va bazani xavfsiz saqlashni o‘rganasiz.',
    category: 'Ma\'lumotlar Bazasi',
    iconName: 'Database',
    level: 'Boshlang\'ich',
    durationHours: 18,
    totalLessons: 12,
    totalXp: 1300,
    accentColor: '#10b981',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'Ma\'lumotlar Me\'mori',
    enrolledStudentsCount: 3780,
    rating: 4.94,
    modules: [
      {
        id: 'mod-sql-1',
        title: '1-Modul: SQL So‘rovlar Asosi',
        description: 'SELECT, WHERE, ORDER BY, GROUP BY va agregat funksiyalar.',
        lessons: [
          {
            id: 'lesson-sql-1',
            courseId: 'course-sql',
            title: 'Ma\'lumotlarni Tanlash va Filtrlash',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
            summary: 'SELECT so‘rovi sintaksisi, shartlar va mantiqiy operatorlar.',
            contentMarkdown: `### 🗄️ SQL: Structured Query Language
Relyatsion ma'lumotlar bazasi jadvallar shaklida saqlanadi va jadvallar bir-biri bilan kalitlar (Primary Key va Foreign Key) orqali bog‘lanadi.

\`\`\`sql
-- Foydalanuvchilar jadvalidan eng ko'p ball to'plagan 5 ta talabani olish
SELECT id, name, email, xp_points
FROM users
WHERE xp_points > 500 AND status = 'active'
ORDER BY xp_points DESC
LIMIT 5;
\`\`\``,
            codeSnippets: [
              {
                title: 'JOIN yordamida jadvallarni bog‘lash',
                language: 'sql',
                code: `SELECT 
    users.name AS talaba_ismi,
    courses.title AS kurs_nomi,
    enrollments.progress_percent AS oqish_foizi
FROM enrollments
JOIN users ON enrollments.user_id = users.id
JOIN courses ON enrollments.course_id = courses.id
WHERE enrollments.progress_percent >= 80;`,
                explanation: 'Talaba va kurs jadvallarini birlashtiruvchi real korporativ so‘rov.'
              }
            ],
            exercises: [
              {
                id: 'ex-sql-1',
                title: 'Yuqori narxdagi mahsulotlarni toping',
                instructions: 'products jadvalidan narxi (price) 100 dan yuqori bo‘lgan barcha ustunlarni tanlang.',
                starterCode: `-- SQL so'rovini yozing:
`,
                solutionCode: `SELECT * FROM products WHERE price > 100;`,
                hint: 'SELECT * FROM products WHERE ... shartidan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-sql-1',
                question: 'Jadvaldagi yozuvlarni saralash (tartiblash) uchun qaysi kalit ibora ishlatiladi?',
                options: ['GROUP BY', 'SORT BY', 'ORDER BY', 'FILTER BY'],
                correctIndex: 2,
                explanation: 'ORDER BY — ma\'lumotlarni o‘sish (ASC) yoki kamayish (DESC) tartibida saralaydi.'
              }
            ],
            xp: 120
          }
        ]
      }
    ]
  },
  {
    id: 'course-uiux',
    slug: 'ui-ux-dizayn-va-figma',
    title: 'UI/UX Design: Zamonaviy Interfeyslar',
    tagline: 'Foydalanuvchilar sevib ishlatadigan mahsulotlar yarating',
    description: 'Figma ustaligi, Rang nazariyasi, Tipografika, Wireframing, Prototplash, Dizayn tizimlari va UX tadqiqot.',
    longDescription: 'Dastur qanchalik kuchli bo‘lmasin, uning interfeysi tushunarsiz bo‘lsa, hech kim foydalanmaydi. Ushbu kursda siz inson psixologiyasi, ranglar uyg‘unligi, qulay UX arxitektura va Figma vositasida xalqaro darajadagi futuristik interfeyslar loyihalashni o‘rganasiz.',
    category: 'Dizayn',
    iconName: 'Layout',
    level: 'Boshlang\'ich',
    durationHours: 20,
    totalLessons: 12,
    totalXp: 1400,
    accentColor: '#ec4899',
    gradient: 'from-pink-500 via-rose-500 to-purple-600',
    badge: 'Mahsulot Dizayneri',
    enrolledStudentsCount: 2950,
    rating: 4.96,
    modules: [
      {
        id: 'mod-ui-1',
        title: '1-Modul: Dizayn Asoslari va Figma',
        description: 'Auto Layout, Components, Variants va zamonaviy Glassmorphism.',
        lessons: [
          {
            id: 'lesson-ui-1',
            courseId: 'course-uiux',
            title: 'UI va UX o‘rtasidagi farq hamda Figma Asoslari',
            durationMinutes: 24,
            videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8',
            summary: 'Foydalanuvchi tajribasi (UX) va vizual joziba (UI) simbiozi.',
            contentMarkdown: `### 🎨 UI va UX nima?
* **UX (User Experience)**: Foydalanuvchining dastur bilan muloqotidagi qulaylik, harakatlar tezligi va mantiqiy yechimlar.
* **UI (User Interface)**: Dasturning tashqi ko‘rinishi, tugmalar rangi, shriftlar, intervallar va estetik go‘zallik.

#### Figma Auto Layout imkoniyatlari:
Auto Layout komponentlarni ekranning turli o‘lchamlariga moslashuvchan (responsive) qilish imkonini beradi.`,
            codeSnippets: [
              {
                title: 'Futuristik Glassmorphism CSS Formulari',
                language: 'css',
                code: `.futuristic-glass {
  background: rgba(13, 13, 24, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(139, 92, 246, 0.2);
}`,
                explanation: 'Figma dizaynini to‘g‘ridan-to‘g‘ri shisha effekti kodi bilan birlashtirish.'
              }
            ],
            exercises: [
              {
                id: 'ex-ui-1',
                title: 'Rang kontrasti qoidasi',
                instructions: 'Qorong‘i fonda (#09090b) o‘qilishi eng qulay bo‘lgan matn rangini tanlang.',
                starterCode: `/* Qaysi rang to'g'ri? */
.card-text {
  color: /* #111 yoki #f1f5f9 */ ;
}`,
                solutionCode: `.card-text {
  color: #f1f5f9;
}`,
                hint: 'Qorong‘i fonda yorqin oq yoki ochiq kulrang (#f1f5f9) eng yaxshi kontrast beradi.'
              }
            ],
            quiz: [
              {
                id: 'q-ui-1',
                question: 'Foydalanuvchining mahsulotdan foydalanishdagi umumiy tajribasi va his-tuyg‘usi nima deyiladi?',
                options: ['UI', 'UX', 'SEO', 'API'],
                correctIndex: 1,
                explanation: 'UX (User Experience) — butun foydalanish tajribasi va qulayligini anglatadi.'
              }
            ],
            xp: 130
          }
        ]
      }
    ]
  },
  {
    id: 'course-fullstack',
    slug: 'full-stack-web-dasturlash',
    title: 'Full Stack: Professional Veb Arxitektura',
    tagline: 'G‘oyadan to‘liq ishga tushirilgan global mahsulotgacha',
    description: 'Frontend (React/TypeScript), Backend (Node.js/Express), Baza (PostgreSQL), Docker va Cloud deploy.',
    longDescription: 'Full Stack dasturchi — loyihaning boshidan oxirigacha barcha qismini mustaqil qurishga qodir bo‘lgan eng yuqori maoshli mutaxassisdir. Ushbu intensiv kursda siz to‘liq arxitektura, xavfsizlik, API integratsiyasi va loyihani internetga (Cloud) joylashtirishni to‘liq o‘rganasiz.',
    category: 'Full Stack',
    iconName: 'Layers',
    level: 'Yuqori',
    durationHours: 40,
    totalLessons: 20,
    totalXp: 2200,
    accentColor: '#a855f7',
    gradient: 'from-purple-600 via-pink-600 to-indigo-600',
    badge: 'To‘liq Arxitektor',
    enrolledStudentsCount: 4620,
    rating: 4.99,
    modules: [
      {
        id: 'mod-fs-1',
        title: '1-Modul: To‘liq Tizim Arxitekturasi',
        description: 'Mijoz-Server munosabati, REST API va ma\'lumotlar oqimi.',
        lessons: [
          {
            id: 'lesson-fs-1',
            courseId: 'course-fullstack',
            title: 'Full Stack Dasturning Ishlash Prinsipi',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
            summary: 'Brauzer, Express server va PostgreSQL o‘rtasidagi xavfsiz ma\'lumot almashinuvi.',
            contentMarkdown: `### 🌐 Full Stack Nima?
Full Stack dasturchi ham mijoz interfeysini (Frontend), ham serverdagi biznes mantig‘i va ma'lumotlar bazasini (Backend) professional boshqara oladi.

#### Klassik Stek:
1. **Frontend**: React + TypeScript + Tailwind CSS
2. **Backend**: Node.js + Express
3. **Database**: PostgreSQL / Supabase
4. **DevOps**: Docker + Cloud Run / Vercel`,
            codeSnippets: [
              {
                title: 'Express REST API server kodi',
                language: 'typescript',
                code: `import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'VELORA Cloud Engine',
    uptime: process.uptime()
  });
});

app.listen(3000, () => console.log('VELORA Server faol!'));`,
                explanation: 'Full-stack ilovaning backend server qismi.'
              }
            ],
            exercises: [
              {
                id: 'ex-fs-1',
                title: 'API Status tekshiruvini yozing',
                instructions: 'Frontenddan /api/health manziliga fetch so‘rov yuborib konsolga chiqaruvchi asinxron funksiya yozing.',
                starterCode: `async function checkStatus() {
  // fetch so'rovini yozing
}`,
                solutionCode: `async function checkStatus() {
  const res = await fetch('/api/health');
  const data = await res.json();
  console.log(data);
}`,
                hint: 'await fetch(...) va await res.json() dan foydalaning.'
              }
            ],
            quiz: [
              {
                id: 'q-fs-1',
                question: 'Full Stack dasturchi qaysi sohalarni birdek bilishi talab etiladi?',
                options: [
                  'Faqat HTML va CSS',
                  'Faqat operatsion tizim o‘rnatishni',
                  'Ham frontend, ham backend va ma\'lumotlar bazasini',
                  'Faqat fotomontaj dasturlarini'
                ],
                correctIndex: 2,
                explanation: 'Full Stack dasturchi mijoz interfeysi, server va ma\'lumotlar bazasining barchasini boshqaradi.'
              }
            ],
            xp: 200
          }
        ]
      }
    ]
  }
];
