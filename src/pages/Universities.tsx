import { universities } from "@/lib/data/universities";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Universities() {
  const [q, setQ] = useState("");
  const filtered = universities.filter((u) =>
    [u.name, u.location].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">🎓 Universitetlar</h1>
        <p className="text-muted-foreground mt-1">Dunyoning eng yaxshi universitetlari haqida bilib oling</p>
      </div>
      <div className="relative mb-6 max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Qidirish..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((u, i) => (
          <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 border-0 shadow-soft hover:shadow-card hover:-translate-y-1 transition-bounce h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{u.emoji}</div>
                <div className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground">#{u.rank}</div>
              </div>
              <h3 className="font-extrabold text-lg">{u.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {u.location}</p>
              <p className="text-sm mt-3">{u.description}</p>
              <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{u.founded}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{u.students}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}