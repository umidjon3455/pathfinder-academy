export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  emoji: string;
  highlights: string[];
}

export const cities: City[] = [
  { id: "tashkent", name: "Toshkent", country: "O'zbekiston", emoji: "🇺🇿", description: "O'zbekistonning poytaxti, eng yirik talabalar shahri.", highlights: ["O'zMU", "Inha University", "Westminster", "TUIT"] },
  { id: "samarkand", name: "Samarqand", country: "O'zbekiston", emoji: "🕌", description: "Tarixiy ipak yo'li markazi, ko'plab xalqaro universitetlar.", highlights: ["Silk Road International", "SamDU"] },
  { id: "boston", name: "Boston", country: "AQSh", emoji: "🇺🇸", description: "Harvard va MIT joylashgan AQShning ta'lim poytaxti.", highlights: ["Harvard", "MIT", "BU", "Northeastern"] },
  { id: "london", name: "London", country: "Buyuk Britaniya", emoji: "🇬🇧", description: "Dunyodagi eng nufuzli universitetlar shahri.", highlights: ["UCL", "Imperial", "King's College", "LSE"] },
  { id: "tokyo", name: "Tokio", country: "Yaponiya", emoji: "🇯🇵", description: "Texnologiya va innovatsiya markazi.", highlights: ["University of Tokyo", "Waseda", "Keio"] },
  { id: "berlin", name: "Berlin", country: "Germaniya", emoji: "🇩🇪", description: "Bepul oliy ta'lim va boy madaniyat.", highlights: ["TU Berlin", "Humboldt", "FU Berlin"] },
  { id: "seoul", name: "Seul", country: "Janubiy Koreya", emoji: "🇰🇷", description: "Texnologik gigantlar va kuchli ta'lim tizimi.", highlights: ["SNU", "KAIST", "Yonsei"] },
  { id: "singapore", name: "Singapur", country: "Singapur", emoji: "🇸🇬", description: "Osiyodagi global ta'lim huba.", highlights: ["NUS", "NTU", "SMU"] },
];