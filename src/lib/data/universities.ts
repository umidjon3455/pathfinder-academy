export interface University {
  id: string;
  name: string;
  location: string;
  rank: number;
  description: string;
  emoji: string;
  founded: number;
  students: string;
}

export const universities: University[] = [
  { id: "mit", name: "MIT", location: "Cambridge, AQSh", rank: 1, description: "Massachusetts Institute of Technology — texnologiya va muhandislikda yetakchi.", emoji: "🏛️", founded: 1861, students: "11,500+" },
  { id: "stanford", name: "Stanford University", location: "Kaliforniya, AQSh", rank: 2, description: "Silicon Valley markazidagi innovatsion universitet.", emoji: "🌲", founded: 1885, students: "17,000+" },
  { id: "harvard", name: "Harvard University", location: "Cambridge, AQSh", rank: 3, description: "AQShdagi eng qadimgi va nufuzli universitet.", emoji: "🎓", founded: 1636, students: "23,000+" },
  { id: "oxford", name: "University of Oxford", location: "Oksford, Buyuk Britaniya", rank: 4, description: "Ingliz tilidagi eng qadimgi universitet.", emoji: "🏰", founded: 1096, students: "24,000+" },
  { id: "cambridge", name: "University of Cambridge", location: "Kembrij, Buyuk Britaniya", rank: 5, description: "Tarixiy va akademik mukammallik markazi.", emoji: "📚", founded: 1209, students: "21,000+" },
  { id: "ethz", name: "ETH Zurich", location: "Sürix, Shveysariya", rank: 6, description: "Yevropadagi yetakchi texnik universitet.", emoji: "⚙️", founded: 1855, students: "22,000+" },
  { id: "nus", name: "National University of Singapore", location: "Singapur", rank: 7, description: "Osiyodagi yetakchi tadqiqot universiteti.", emoji: "🌏", founded: 1905, students: "38,000+" },
  { id: "tokyo", name: "University of Tokyo", location: "Tokio, Yaponiya", rank: 8, description: "Yaponiyaning eng nufuzli universiteti.", emoji: "🗼", founded: 1877, students: "28,000+" },
  { id: "tsinghua", name: "Tsinghua University", location: "Pekin, Xitoy", rank: 9, description: "Xitoyning yetakchi muhandislik universiteti.", emoji: "🐉", founded: 1911, students: "50,000+" },
  { id: "tum", name: "Technical University of Munich", location: "Myunxen, Germaniya", rank: 10, description: "Germaniyaning eng yaxshi texnik universiteti.", emoji: "🦁", founded: 1868, students: "45,000+" },
  { id: "uzbnu", name: "O'zbekiston Milliy Universiteti", location: "Toshkent, O'zbekiston", rank: 50, description: "O'zbekistondagi eng yirik klassik universitet.", emoji: "🇺🇿", founded: 1918, students: "20,000+" },
  { id: "iut", name: "Inha University in Tashkent", location: "Toshkent, O'zbekiston", rank: 75, description: "IT va muhandislik bo'yicha xalqaro filial.", emoji: "💻", founded: 2014, students: "3,000+" },
];