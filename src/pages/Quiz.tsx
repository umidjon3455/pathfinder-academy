import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { englishQuestions } from "@/lib/data/english";
import { programmingQuestions } from "@/lib/data/programming";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Quiz() {
  const { category, levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cat = category as "english" | "programming";
  const id = parseInt(levelId || "1", 10);
  const all = cat === "english" ? englishQuestions : programmingQuestions;
  const q = all.find((x) => x.id === id);

  const [picked, setPicked] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!q) return <div className="p-10">Savol topilmadi</div>;

  const correct = picked === q.answer;

  const submit = async () => {
    if (picked === null) return;
    setSubmitted(true);
    if (correct && user && !saved) {
      setSaved(true);
      const score = 10;
      await supabase.from("user_progress").upsert(
        { user_id: user.id, category: cat, level_id: id, score },
        { onConflict: "user_id,category,level_id" }
      );
      // Update profile points
      const { data: p } = await supabase.from("profiles").select("total_points,level").eq("id", user.id).maybeSingle();
      if (p) {
        const newPoints = (p.total_points || 0) + score;
        const newLevel = Math.max(1, Math.floor(newPoints / 100) + 1);
        await supabase.from("profiles").update({ total_points: newPoints, level: newLevel }).eq("id", user.id);
      }
      toast.success(`+${score} ball! 🎉`);
    }
  };

  const next = () => navigate(`/quiz/${cat}/${id + 1}`, { replace: true });
  const back = () => navigate(cat === "english" ? "/english" : "/programming");

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={back} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Orqaga
      </Button>

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-bold text-muted-foreground">Daraja {id} / {all.length}</div>
        <div className="flex items-center gap-1 text-sm font-bold text-primary">
          <Sparkles className="h-4 w-4" /> {q.id * 1} XP
        </div>
      </div>

      <motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 md:p-8 shadow-card border-0 mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-6">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.answer;
              const showCorrect = submitted && isCorrect;
              const showWrong = submitted && isPicked && !isCorrect;
              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setPicked(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-bounce flex items-center justify-between
                    ${showCorrect ? "border-success bg-success/10 text-success" : ""}
                    ${showWrong ? "border-destructive bg-destructive/10 text-destructive" : ""}
                    ${!submitted && isPicked ? "border-primary bg-primary/5" : ""}
                    ${!submitted && !isPicked ? "border-border hover:border-primary/50 hover:bg-muted" : ""}
                  `}
                >
                  <span>{opt}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5" />}
                  {showWrong && <XCircle className="h-5 w-5" />}
                </button>
              );
            })}
          </div>
        </Card>

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className={`p-5 border-0 mb-6 ${correct ? "bg-success/10" : "bg-destructive/10"}`}>
                <div className="font-extrabold text-lg mb-1 flex items-center gap-2">
                  {correct ? "🎉 To'g'ri!" : "❌ Noto'g'ri"}
                </div>
                {q.explanation && <p className="text-sm">{q.explanation}</p>}
                {!correct && <p className="text-sm">To'g'ri javob: <strong>{q.options[q.answer]}</strong></p>}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!submitted ? (
          <Button onClick={submit} disabled={picked === null} className="w-full h-12 bg-gradient-primary text-primary-foreground font-extrabold text-lg shadow-glow">
            Tekshirish
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={back} variant="outline" className="flex-1 h-12 font-bold">Yakunlash</Button>
            {id < all.length && (
              <Button onClick={next} className="flex-1 h-12 bg-gradient-primary text-primary-foreground font-bold shadow-glow">
                Keyingi daraja →
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}