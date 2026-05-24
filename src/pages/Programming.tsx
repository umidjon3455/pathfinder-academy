import LevelGrid from "./LevelGrid";
import { programmingQuestions } from "@/lib/data/programming";
export default function Programming() {
  return <LevelGrid category="programming" total={programmingQuestions.length} title="Dasturlash" emoji="💻" description="Web, algoritmlar, ma'lumotlar bazasi — 50 ta amaliy savol." gradient="from-violet-500 via-fuchsia-500 to-pink-500" />;
}