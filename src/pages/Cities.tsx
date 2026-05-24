import { cities } from "@/lib/data/cities";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Cities() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">🌍 Ta'lim shaharlari</h1>
        <p className="text-muted-foreground mt-1">Dunyoning eng yaxshi talabalar shaharlari</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 border-0 shadow-soft hover:shadow-card hover:-translate-y-1 transition-bounce h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{c.emoji}</div>
                <div>
                  <h3 className="font-extrabold text-xl">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.country}</p>
                </div>
              </div>
              <p className="text-sm">{c.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {c.highlights.map((h) => (
                  <span key={h} className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">{h}</span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}