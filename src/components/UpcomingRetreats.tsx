import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Users, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

// Reuse your existing card imagery to stay on theme
import retreatWeightloss from "../assets/retreat-weightloss.jpg";
import retreatVegan from "../assets/retreat-vegan.jpg";
import retreatMindfulness from "../assets/retreat-mindfulness.jpg";
import retreatDetox from "../assets/retreat-detox.jpg";

type UpcomingItem = {
  id: string;
  title: string;
  location: string;
  start: string; // ISO
  end: string;   // ISO
  theme: "weightloss" | "vegan" | "mindfulness" | "detox";
  spotsLeft: number;
  image: string;
};

const UPCOMING: UpcomingItem[] = [
  {
    id: "u1",
    title: "Weight Loss Reset (7-Day)",
    location: "Bali, Indonesia",
    start: "2025-11-18",
    end: "2025-11-24",
    theme: "weightloss",
    spotsLeft: 6,
    image: retreatWeightloss,
  },
  {
    id: "u2",
    title: "Vegan Gourmet & Wellness",
    location: "Tuscany, Italy",
    start: "2025-11-27",
    end: "2025-12-02",
    theme: "vegan",
    spotsLeft: 4,
    image: retreatVegan,
  },
  {
    id: "u3",
    title: "Mindfulness in Nature",
    location: "Costa Rica",
    start: "2025-12-05",
    end: "2025-12-10",
    theme: "mindfulness",
    spotsLeft: 8,
    image: retreatMindfulness,
  },
  {
    id: "u4",
    title: "Digital Detox Weekend",
    location: "Swiss Alps",
    start: "2025-11-22",
    end: "2025-11-24",
    theme: "detox",
    spotsLeft: 3,
    image: retreatDetox,
  },
];

function formatRange(startISO: string, endISO: string) {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const fmt: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const year = s.getFullYear();
  const sameMonth = s.getMonth() === e.getMonth();
  const left = s.toLocaleDateString(undefined, fmt);
  const right = e.toLocaleDateString(undefined, sameMonth ? { day: "numeric" } : fmt);
  return `${left}–${right}, ${year}`;
}

function badgeForTheme(theme: UpcomingItem["theme"]) {
  // soft, elegant theme pills (no Tailwind config required)
  switch (theme) {
    case "weightloss":
      return "bg-[rgba(16,185,129,0.12)] text-emerald-700 border border-[rgba(16,185,129,0.25)]"; // emerald
    case "vegan":
      return "bg-[rgba(34,197,94,0.12)] text-green-700 border border-[rgba(34,197,94,0.25)]"; // green
    case "mindfulness":
      return "bg-[rgba(99,102,241,0.12)] text-indigo-700 border border-[rgba(99,102,241,0.25)]"; // indigo
    case "detox":
      return "bg-[rgba(245,158,11,0.12)] text-amber-700 border border-[rgba(245,158,11,0.25)]"; // amber
  }
}

export default function UpcomingRetreats() {
  // Build dynamic “Booking Open — <Month Year>”
  const bookingBadge = useMemo(() => {
    const now = new Date();
    const month = now.toLocaleString(undefined, { month: "long" });
    const year = now.getFullYear();
    return `Booking Open — ${month} ${year}`;
  }, []);

  return (
    <section id="upcoming" className="relative overflow-hidden py-24">
      {/* Ambient background that matches your theme (emerald/teal glow) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.06)] via-transparent to-[hsl(var(--accent)/0.08)]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-96 w-96 rounded-full blur-3xl bg-[hsl(var(--primary)/0.12)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[hsl(var(--accent)/0.16)]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm
                          border-[rgba(16,185,129,0.2)] text-emerald-700 bg-[rgba(16,185,129,0.08)]">
            <Sparkles className="h-4 w-4" />
            {bookingBadge}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(var(--foreground))]">
            Upcoming Retreats
          </h2>
          <p className="mt-3 text-[hsl(var(--muted-foreground))]">
            Reserve limited spots for our next transformative journeys.
          </p>
        </motion.div>

        {/* Grid of upcoming programs */}
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-md
                         border-black/10 shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Media */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* theme chip */}
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${badgeForTheme(r.theme)}`}>
                  {r.theme === "weightloss" && "Weight Loss"}
                  {r.theme === "vegan" && "Vegan"}
                  {r.theme === "mindfulness" && "Mindfulness"}
                  {r.theme === "detox" && "Digital Detox"}
                </div>
                {/* soft top shade */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-[1.35rem] font-semibold text-[hsl(var(--foreground))] leading-snug">
                  {r.title}
                </h3>

                <div className="mt-3 space-y-2 text-[0.95rem]">
                  <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <CalendarDays className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>{formatRange(r.start, r.end)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>{r.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Check-in 2:00 PM · Guided daily schedule</span>
                  </div>
                </div>

                {/* Spots + CTA */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border px-3 py-1
                                  border-black/10 text-[0.85rem] text-[hsl(var(--foreground))] bg-white/70">
                    <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>{r.spotsLeft} spots left</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full border-[1px] border-black/10 text-[hsl(var(--foreground))]
                                 hover:bg-[hsl(var(--primary)/0.08)]"
                      onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Details
                    </Button>
                    <Button
                      className="rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
                                 hover:bg-[hsl(var(--primary-dark))]"
                      onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Subtle ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 max-w-[1200px] rounded-2xl border border-black/10 bg-white/70 p-4 text-center backdrop-blur-md"
        >
          <p className="text-[hsl(var(--muted-foreground))]">
            Can’t find your ideal dates? Tell us your window and we’ll match you with a perfect retreat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
