import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface Row { id: string; full_name: string | null; username: string | null; avatar_url: string | null; total_points: number; level: number; }

export default function Leaderboard() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("id,full_name,username,avatar_url,total_points,level").order("total_points", { ascending: false }).limit(50);
      setRows((data as Row[]) ?? []);
    })();
  }, []);

  const medal = (i: number) =>
    i === 0 ? <Trophy className="h-5 w-5 text-yellow-500" /> :
    i === 1 ? <Medal className="h-5 w-5 text-zinc-400" /> :
    i === 2 ? <Award className="h-5 w-5 text-amber-700" /> :
    <span className="text-sm font-bold text-muted-foreground w-5 text-center">{i + 1}</span>;

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">🏆 Reyting</h1>
        <p className="text-muted-foreground mt-1">Eng kuchli o'rganuvchilar</p>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => {
          const isMe = r.id === user?.id;
          const name = r.full_name || r.username || "Anonim";
          return (
            <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.02, 0.5) }}>
              <Card className={`p-4 border-0 shadow-soft flex items-center gap-4 ${isMe ? "ring-2 ring-primary bg-primary/5" : ""}`}>
                <div className="w-8 grid place-items-center">{medal(i)}</div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={r.avatar_url ?? undefined} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">{name[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{name} {isMe && <span className="text-xs text-primary">(siz)</span>}</div>
                  <div className="text-xs text-muted-foreground">Daraja {r.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-primary">{r.total_points}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">ball</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
        {rows.length === 0 && <p className="text-center text-muted-foreground py-12">Hali hech kim ball to'plamagan. Birinchi bo'ling! 🚀</p>}
      </div>
    </div>
  );
}