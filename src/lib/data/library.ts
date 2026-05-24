export interface Book {
  id: string;
  title: string;
  author: string;
  category: "english" | "programming";
  description: string;
  emoji: string;
  level: "Boshlang'ich" | "O'rta" | "Yuqori";
}

export interface VideoLesson {
  id: string;
  title: string;
  channel: string;
  category: "english" | "programming";
  youtubeId: string;
  description: string;
}

export const books: Book[] = [
  { id: "b1", title: "English Grammar in Use", author: "Raymond Murphy", category: "english", description: "Inglizcha grammatika bo'yicha jahon bestselleri.", emoji: "📘", level: "O'rta" },
  { id: "b2", title: "Word Power Made Easy", author: "Norman Lewis", category: "english", description: "Lug'at boyitish bo'yicha klassik kitob.", emoji: "📗", level: "Boshlang'ich" },
  { id: "b3", title: "Fluent in 3 Months", author: "Benny Lewis", category: "english", description: "Tilni tez o'rganish strategiyalari.", emoji: "📙", level: "Boshlang'ich" },
  { id: "b4", title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "programming", description: "JavaScript'ni chuqur o'rganish uchun bepul kitob.", emoji: "💛", level: "O'rta" },
  { id: "b5", title: "Clean Code", author: "Robert C. Martin", category: "programming", description: "Sifatli kod yozish bo'yicha mumtoz asar.", emoji: "🧹", level: "Yuqori" },
  { id: "b6", title: "Python Crash Course", author: "Eric Matthes", category: "programming", description: "Python'ni noldan o'rganish.", emoji: "🐍", level: "Boshlang'ich" },
  { id: "b7", title: "Cracking the Coding Interview", author: "Gayle Laakmann", category: "programming", description: "Ish suhbati uchun algoritm masalalari.", emoji: "🎯", level: "Yuqori" },
  { id: "b8", title: "The 4-Hour Workweek (English Edition)", author: "Tim Ferriss", category: "english", description: "Ingliz tilidagi mashhur biznes kitob.", emoji: "⏱️", level: "Yuqori" },
];

export const videos: VideoLesson[] = [
  { id: "v1", title: "Learn English in 30 Minutes", channel: "Learn English with EnglishClass101", category: "english", youtubeId: "juKd26qkNAw", description: "Kundalik inglizcha so'zlashuv asoslari." },
  { id: "v2", title: "English Conversation Practice", channel: "Daily English Conversation", category: "english", youtubeId: "yp6T9_FsUv8", description: "Real hayotiy suhbatlar bilan mashq." },
  { id: "v3", title: "1000 Most Common English Words", channel: "Learn English Online", category: "english", youtubeId: "9aPqBvkbinQ", description: "Eng ko'p ishlatiladigan 1000 ta so'z." },
  { id: "v4", title: "JavaScript Crash Course", channel: "Traversy Media", category: "programming", youtubeId: "hdI2bqOjy3c", description: "JavaScript'ning asosiy qismi 1 soatda." },
  { id: "v5", title: "Python for Beginners (Full Course)", channel: "freeCodeCamp", category: "programming", youtubeId: "rfscVS0vtbw", description: "Python bo'yicha to'liq kurs." },
  { id: "v6", title: "HTML & CSS Full Course", channel: "SuperSimpleDev", category: "programming", youtubeId: "G3e-cpL7ofc", description: "Veb dasturlash asoslari." },
  { id: "v7", title: "React JS Course for Beginners", channel: "freeCodeCamp", category: "programming", youtubeId: "bMknfKXIFA8", description: "React bo'yicha to'liq kurs." },
];