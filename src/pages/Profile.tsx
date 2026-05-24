import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Sparkles, Flame, LogOut } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(p);
      setBio(p?.bio ?? "");
      setFullName(p?.full_name ?? "");
      const { data: pr } = await supabase.from("user_progress").select("*").eq("user_id", user.id).order("completed_at", { ascending: false });
      setProgress(pr ?? []);
    })();
  }, [user]);

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ bio, full_name: fullName }).eq("id", user.id);
    if (error) toast.error(error.message);
    else toast.success("Profil yangilandi ✨");
  };

  const stats = [
    { icon: Trophy, label: "Jami ballar", value: profile?.total_points ?? 0, gradient: "bg-gradient-primary" },
    { icon: Sparkles, label: "Daraja", value: profile?.level ?? 1, gradient: "bg-gradient-secondary" },
    { icon: Flame, label: "Yakunlangan darslar", value: progress.length, gradient: "bg-gradient-accent" },
  ];
  const name = fullName || user?.email?.split("@")[0] || "User";

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 md:p-8 border-0 shadow-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-glow">
              <AvatarImage src={profile?.avatar_url ?? undefined} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-extrabold text-3xl">{name[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold">{name}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {profile?.bio && <p className="text-sm mt-2">{profile.bio}</p>}
            </div>
            <Button variant="outline" onClick={() => { signOut(); }}><LogOut className="h-4 w-4 mr-2" /> Chiqish</Button>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl ${s.gradient} grid place-items-center text-white`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                <div className="text-2xl font-extrabold">{s.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-0 shadow-soft">
        <h2 className="font-extrabold text-lg mb-4">Profilni tahrirlash</h2>
        <div className="space-y-4">
          <div>
            <Label>To'liq ism</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <Label>Bio</Label>
            <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="O'zingiz haqida bir necha so'z..." />
          </div>
          <Button onClick={save} className="bg-gradient-primary text-primary-foreground font-bold shadow-glow">Saqlash</Button>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-soft">
        <h2 className="font-extrabold text-lg mb-4">Yaqinda yakunlangan ({progress.length})</h2>
        {progress.length === 0 ? (
          <p className="text-sm text-muted-foreground">Hali darslar yakunlanmagan. Boshlang! 🚀</p>
        ) : (
          <div className="space-y-2">
            {progress.slice(0, 10).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="font-bold capitalize">{p.category === "english" ? "🇬🇧 Ingliz tili" : "💻 Dasturlash"} — Daraja {p.level_id}</div>
                <div className="text-sm font-bold text-primary">+{p.score} XP</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}