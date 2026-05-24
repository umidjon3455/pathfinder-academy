import LevelGrid from "./LevelGrid";
import { englishQuestions } from "@/lib/data/english";
export default function English() {
  return <LevelGrid category="english" total={englishQuestions.length} title="Ingliz tili" emoji="🇬🇧" description="Grammatika, lug'at va tarjima — 50 ta interaktiv darajada o'rganing." gradient="from-emerald-500 via-teal-500 to-cyan-500" />;
}