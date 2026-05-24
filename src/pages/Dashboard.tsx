import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { BookOpen, Code2, Trophy, Flame, Sparkles, ArrowRight, Library, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface Profile { full_name: string | null; total_points: number; level: number; streak_days: number; }

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enCount, setEnCount] = useState(0);
  const [pgCount, setPgCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase.from("profiles").select("full_name,total_points,level,streak_days").eq("id", user.id).maybeSingle();
      setProfile(p as Profile);
      const { data: progress } = await supabase.from("user_progress").select("category").eq("user_id", user.id);
      setEnCount(progress?.filter(p => p.category === "english").length ?? 0);
      setPgCount(progress?.filter(p => p.category === "programming").length ?? 0);
    })();
  }, [user]);

  const name = profile?.full_name || user?.email?.split("@")[0] || "do'stim";
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Xayrli tong" : hour < 18 ? "Xayrli kun" : "Xayrli kech";

  const stats = [
    { label: "Jami ballar", value: profile?.total_points ?? 0, icon: Trophy, gradient: "bg-gradient-primary" },
    { label: "Daraja", value: profile?.level ?? 1, icon: Sparkles, gradient: "bg-gradient-secondary" },
    { label: "Kunlik streak", value: `${profile?.streak_days ?? 0} kun`, icon: Flame, gradient: "bg-gradient-accent" },
  ];

  const sections = [
    { to: "/english", title: "Ingliz tili", desc: "50 ta interaktiv test", count: `${enCount}/50`, icon: BookOpen, gradient: "from-emerald-500 to-cyan-500", emoji: "🇬🇧" },
    { to: "/programming", title: "Dasturlash", desc: "Algoritmlar va kod", count: `${pgCount}/50`, icon: Code2, gradient: "from-violet-500 to-fuchsia-500", emoji: "💻" },
    { to: "/library", title: "Kutubxona", desc: "Kitoblar + video darslar", count: "15+", icon: Library, gradient: "from-orange-500 to-pink-500", emoji: "📚" },
    { to: "/universities", title: "Universitetlar", desc: "Top dunyo universitetlari", count: "12+", icon: GraduationCap, gradient: "from-blue-500 to-indigo-600", emoji: "🎓" },
  ];

  const total = enCount + pgCount;
  const totalProgress = (total / 100) * 100;

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-extrabold">{greet}, <span className="text-gradient-hero">{name}</span>! 👋</h1>
        <p className="text-muted-foreground mt-1">Bugun nimani o'rganamiz?</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-5 border-0 shadow-soft hover:shadow-card transition-smooth overflow-hidden relative">
              <div className={`${s.gradient} absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-xl`} />
              <div className="flex items-center gap-3 relative">
                <div className={`h-11 w-11 rounded-xl ${s.gradient} grid place-items-center text-white shadow-soft`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                  <div className="text-2xl font-extrabold">{s.value}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6 border-0 shadow-soft bg-gradient-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg">Umumiy progress</h3>
            <p className="text-sm text-muted-foreground">{total} / 100 dars yakunlandi</p>
          </div>
          <span className="text-3xl font-extrabold text-gradient-hero">{Math.round(totalProgress)}%</span>
        </div>
        <Progress value={totalProgress} className="h-3" />
      </Card>

      <div>
        <h2 className="text-xl font-extrabold mb-4">Tezkor kirish</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s, i) => (
            <motion.div key={s.to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
              <Link to={s.to}>
                <Card className="p-6 border-0 shadow-soft hover:shadow-card hover:-translate-y-1 transition-bounce group cursor-pointer overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-5 group-hover:opacity-10 transition-smooth`} />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-3xl mb-3">{s.emoji}</div>
                      <h3 className="font-extrabold text-lg">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                      <div className="text-xs font-bold mt-3 inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">{s.count}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}