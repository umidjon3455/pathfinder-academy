import { schools } from "@/lib/data/schools";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Schools() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">🏫 Top maktablar</h1>
        <p className="text-muted-foreground mt-1">O'zbekistondagi eng nufuzli maktablar va litseylar</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 border-0 shadow-soft hover:shadow-card hover:-translate-y-1 transition-bounce h-full">
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-extrabold text-lg">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.city}</p>
              <p className="text-sm mt-3">{s.description}</p>
              <div className="flex items-center gap-1 mt-3 text-warning font-bold">
                <Star className="h-4 w-4 fill-current" /> {s.rating}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}