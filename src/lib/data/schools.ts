export interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  emoji: string;
  rating: number;
}

export const schools: School[] = [
  { id: "1", name: "Prezident maktabi", city: "Toshkent", description: "Iqtidorli o'quvchilar uchun davlat maktabi, IB dasturi.", emoji: "⭐", rating: 4.9 },
  { id: "2", name: "BMB (Beruniy Maxsus Bolalar)", city: "Toshkent", description: "Ilmiy-texnik yo'nalishdagi nufuzli maktab.", emoji: "🔬", rating: 4.8 },
  { id: "3", name: "Anhor Lokomotiv litseyi", city: "Toshkent", description: "Aniq fanlar bo'yicha mukammal litsey.", emoji: "🚂", rating: 4.7 },
  { id: "4", name: "Tamaddun maktabi", city: "Samarqand", description: "Klassik ta'lim va madaniyatga urg'u.", emoji: "🕌", rating: 4.6 },
  { id: "5", name: "Imam al-Buxoriy maktabi", city: "Buxoro", description: "Tarixiy meros va zamonaviy ta'lim uyg'unligi.", emoji: "📖", rating: 4.5 },
  { id: "6", name: "Fergana FizMat litseyi", city: "Farg'ona", description: "Matematika va fizika bo'yicha kuchli tayyorgarlik.", emoji: "📐", rating: 4.7 },
  { id: "7", name: "International School of Tashkent", city: "Toshkent", description: "Britaniya o'quv dasturi, A-level imtihonlari.", emoji: "🌐", rating: 4.9 },
  { id: "8", name: "Mirzo Ulug'bek litseyi", city: "Toshkent", description: "Astronomiya va aniq fanlar.", emoji: "🔭", rating: 4.6 },
];