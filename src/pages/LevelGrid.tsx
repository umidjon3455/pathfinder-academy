import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { CheckCircle2, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";

interface LevelGridProps {
  category: "english" | "programming";
  total: number;
  title: string;
  emoji: string;
  description: string;
  gradient: string;
}

export default function LevelGrid({ category, total, title, emoji, description, gradient }: LevelGridProps) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("user_progress").select("level_id,score").eq("user_id", user.id).eq("category", category);
      const map: Record<number, number> = {};
      data?.forEach(d => { map[d.level_id] = d.score; });
      setCompleted(map);
    })();
  }, [user, category]);

  const levels = Array.from({ length: total }, (_, i) => i + 1);
  const doneCount = Object.keys(completed).length;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl p-8 mb-8 bg-gradient-to-br ${gradient} text-white shadow-card relative overflow-hidden`}>
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="relative">
          <div className="text-5xl mb-3">{emoji}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
          <p className="mt-2 text-white/90">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full font-bold">
            <Star className="h-4 w-4" /> {doneCount} / {total} bajarildi
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
        {levels.map((n, i) => {
          const score = completed[n];
          const done = score !== undefined;
          const prev = n === 1 || completed[n - 1] !== undefined;
          return (
            <motion.div key={n} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.01, 0.3) }}>
              {prev ? (
                <Link to={`/quiz/${category}/${n}`}>
                  <Card className={`aspect-square grid place-items-center font-extrabold text-lg cursor-pointer transition-bounce hover:scale-110 hover:-translate-y-1 border-2 ${done ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow" : "border-border hover:border-primary"}`}>
                    {done ? <CheckCircle2 className="h-6 w-6" /> : n}
                  </Card>
                </Link>
              ) : (
                <Card className="aspect-square grid place-items-center bg-muted text-muted-foreground border-2 border-dashed">
                  <Lock className="h-4 w-4" />
                </Card>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}