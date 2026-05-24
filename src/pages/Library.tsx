import { books, videos } from "@/lib/data/library";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Library() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">📚 Kutubxona</h1>
        <p className="text-muted-foreground mt-1">Kitoblar va video darslar bilan bilimingizni mustahkamlang</p>
      </div>
      <Tabs defaultValue="books">
        <TabsList className="mb-6">
          <TabsTrigger value="books">📖 Kitoblar</TabsTrigger>
          <TabsTrigger value="videos">🎥 Video darslar</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-6 border-0 shadow-soft hover:shadow-card hover:-translate-y-1 transition-bounce h-full">
                  <div className="text-4xl mb-3">{b.emoji}</div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">{b.category === "english" ? "Ingliz" : "Dasturlash"}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{b.level}</span>
                  </div>
                  <h3 className="font-extrabold">{b.title}</h3>
                  <p className="text-xs text-muted-foreground">{b.author}</p>
                  <p className="text-sm mt-3">{b.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="overflow-hidden border-0 shadow-soft hover:shadow-card transition-smooth">
                  <div className="aspect-video bg-muted">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${v.youtubeId}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v.category === "english" ? "Ingliz" : "Dasturlash"}</span>
                    <h3 className="font-extrabold mt-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground">{v.channel}</p>
                    <p className="text-sm mt-2">{v.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}