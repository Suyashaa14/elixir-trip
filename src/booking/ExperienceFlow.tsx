import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, compareAsc } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { ADDONS, RETREATS, RetreatKey } from "./demoData";

/** THEME per package */
const THEMES: Record<
  RetreatKey,
  {
    gradient: string;
    accentFrom: string;
    accentTo: string;
    chip: string;
    goals: string[];
    diets: string[];
    featuredAddons: string[];
    tagline: string;
  }
> = {
  weightloss: {
    gradient: "from-rose-50/60 to-white",
    accentFrom: "from-rose-500",
    accentTo: "to-rose-400",
    chip: "border-rose-500 bg-rose-50 text-rose-800",
    goals: ["Lose 2–3kg safely", "Boost metabolism", "Reset sleep & energy", "Learn fat-smart meals"],
    diets: ["High-protein", "Low-carb", "Dairy-free", "Gluten-free"],
    featuredAddons: ["spa", "private"],
    tagline: "Metabolic momentum meets gentle coaching.",
  },
  vegan: {
    gradient: "from-emerald-50/60 to-white",
    accentFrom: "from-emerald-500",
    accentTo: "to-emerald-400",
    chip: "border-emerald-500 bg-emerald-50 text-emerald-800",
    goals: ["Plant-powered reset", "Master 5 vegan recipes", "Gut health focus", "Sustainable habits"],
    diets: ["Vegan", "Gluten-free", "Nut-free", "Soy-light"],
    featuredAddons: ["photos", "airport"],
    tagline: "Farm-to-table flavors, mind-to-body renewal.",
  },
  mindfulness: {
    gradient: "from-indigo-50/60 to-white",
    accentFrom: "from-indigo-500",
    accentTo: "to-indigo-400",
    chip: "border-indigo-500 bg-indigo-50 text-indigo-800",
    goals: ["Daily meditation habit", "Lower stress baseline", "Journal with clarity", "Better sleep quality"],
    diets: ["Light vegetarian", "Caffeine-light", "Dairy-free", "Gluten-free"],
    featuredAddons: ["private", "spa"],
    tagline: "Quiet mind. Soft body. Clear next step.",
  },
  detox: {
    gradient: "from-amber-50/60 to-white",
    accentFrom: "from-amber-500",
    accentTo: "to-amber-400",
    chip: "border-amber-500 bg-amber-50 text-amber-900",
    goals: ["Unplug fully", "Rebuild routines", "Deep rest schedule", "Nature immersion"],
    diets: ["Whole-food", "Gluten-free", "No added sugar", "Dairy-free"],
    featuredAddons: ["airport", "photos"],
    tagline: "Slow living, real presence, true reset.",
  },
};

const Burst = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: "spring", stiffness: 250, damping: 16 }}
    className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]"
  >
    <div className="absolute inset-0 mix-blend-screen">
      {[...Array(70)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.9,
            scale: 1,
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.2 + Math.random() * 0.6 }}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-amber-400 shadow-[0_0_15px_2px_rgba(251,191,36,0.6)]"
        />
      ))}
    </div>
  </motion.div>
);

/** Price helper */
function calcTotal({
  nights,
  guests,
  basePricePerNight,
  addons,
}: {
  nights: number;
  guests: number;
  basePricePerNight: number;
  addons: string[];
}) {
  const perNight = basePricePerNight * guests;
  const addonSum = addons.reduce(
    (s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0),
    0
  );
  return perNight * nights + addonSum;
}

export function ExperienceFlow({
  open,
  onOpenChange,
  retreat,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  retreat: RetreatKey;
}) {
  const { toast } = useToast();
  const data = RETREATS[retreat];
  const theme = THEMES[retreat];

  /** Reset state on open or package change */
  const makeDefaultDates = () => {
    const today = new Date();
    const d2 = new Date(today);
    d2.setDate(today.getDate() + 1);
    const d3 = new Date(today);
    d3.setDate(today.getDate() + 2);
    return [today, d2, d3];
  };

  const [step, setStep] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>(makeDefaultDates());
  const [suite, setSuite] = useState<"classic" | "deluxe" | "private">("deluxe");
  const [guests, setGuests] = useState(2);
  const [hasChildren, setHasChildren] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const [diet, setDiet] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>(data.activities.map((a) => a.id));
  const [addons, setAddons] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    if (open) {
      setStep(0);
      setSelectedDates(makeDefaultDates());
      setSuite("deluxe");
      setGuests(2);
      setHasChildren(false);
      setGoals([]);
      setDiet([]);
      setActivities(RETREATS[retreat].activities.map((a) => a.id));
      setAddons([]);
      setEmail("");
      setName("");
      setAgree(true);
    }
  }, [open, retreat]);

  const steps = ["Dates", "Guests", "Personalize", "Activities", "Itinerary", "Sign in", "Review"] as const;

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const progressPct = ((step + 1) / steps.length) * 100;

  const nights = Math.max(1, selectedDates.length - 1);
  const total = useMemo(
    () =>
      calcTotal({
        nights,
        guests,
        basePricePerNight:
          data.basePricePerNight *
          (suite === "private" ? 1.6 : suite === "deluxe" ? 1.2 : 1),
        addons,
      }),
    [nights, guests, data.basePricePerNight, suite, addons]
  );

  const sortedDates = [...selectedDates].sort(compareAsc);
  const checkIn = sortedDates[0];
  const checkOut = sortedDates[sortedDates.length - 1];

  /** Use a typed cubic-bezier easing to satisfy TS */
  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  /** Lightweight, smooth transitions (no large layout shifts) */
  const fadeVariants = {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.22, ease: EASE },
  };

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto max-w-5xl px-6 pb-28">{children}</div>
  );

  const handleFinish = () => {
    toast({
      title: "Thank you!",
      description: "Your demo booking is complete.",
    });
    setTimeout(() => onOpenChange(false), 800);
  };

  const StepHeader = (
    <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={prev}
          className={`${step === 0 ? "invisible" : ""} gap-1`}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex-1 px-4">
          <div className="text-[10px] tracking-wide uppercase text-muted-foreground">
            Step {step + 1} / {steps.length} — {steps[step]}
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/80">
            <motion.div
              key={`${retreat}-${step}`}
              style={{ willChange: "width" }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className={`h-full rounded-full bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo}`}
            />
          </div>
        </div>

        <div className="text-sm font-medium">Total: ${total.toFixed(0)}</div>
      </div>
    </div>
  );

  const FooterNav = (
    <div className="sticky bottom-0 z-30 border-t bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={prev}
          className={`${step === 0 ? "invisible" : ""}`}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <div className="text-xs text-muted-foreground">
          {checkIn ? format(checkIn, "EEE, MMM d") : "—"}{" "}
          {checkOut && checkOut !== checkIn ? `→ ${format(checkOut, "EEE, MMM d")}` : ""}
          {"  •  "}
          {guests} guest{guests > 1 ? "s" : ""} • {nights} night{nights > 1 ? "s" : ""}
        </div>
        <Button
          onClick={step === steps.length - 1 ? handleFinish : next}
          className="gap-1"
        >
          {step === steps.length - 1 ? (
            <>
              Finish <Sparkles className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* key refreshes visual theme per package. my-10 + max-h + rounded keep it off edges */}
      <DialogContent
        key={retreat}
        className="my-10 max-w-5xl overflow-hidden rounded-2xl p-0 sm:my-10 max-h-[90vh]"
      >
        {/* Make the inner scroll area; header/footer are sticky within */}
        <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
          <DialogTitle className="sr-only">Plan your {data.title}</DialogTitle>

          {/* HERO */}
          <div className="relative h-44 w-full shrink-0 overflow-hidden">
            <motion.img
              src={data.hero}
              className="h-full w-full object-cover will-change-transform"
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            />
            <motion.div
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-3 left-4 text-white"
            >
              <div className="text-xl font-serif font-semibold">{data.title}</div>
              <div className="text-xs opacity-90">{theme.tagline}</div>
            </motion.div>
          </div>

          {StepHeader}

          {/* SCROLLABLE BODY */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Container>
              <AnimatePresence mode="wait">
                {/* STEP 0: DATES + SUITE (single calendar, multi-select) */}
                {step === 0 && (
                  <motion.div key="dates" {...fadeVariants} className="grid gap-6 py-6 md:grid-cols-2">
                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          Select dates (multi-day)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                          <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={(val) => setSelectedDates(val ?? [])}
                            numberOfMonths={1}
                            showOutsideDays
                            captionLayout="dropdown-buttons"
                            className="rounded-lg border bg-white"
                            fromDate={new Date()}
                          />
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Click all dates you’ll be on property (check-in to check-out). Click again to unselect.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle>Suite & overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Tabs value={suite} onValueChange={(v) => setSuite(v as any)}>
                          <TabsList className="grid grid-cols-3">
                            <TabsTrigger value="classic">Classic</TabsTrigger>
                            <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
                            <TabsTrigger value="private">Private</TabsTrigger>
                          </TabsList>
                          <TabsContent value="classic" className="text-sm text-muted-foreground">
                            Cozy rooms, shared lounge, best value.
                          </TabsContent>
                          <TabsContent value="deluxe" className="text-sm text-muted-foreground">
                            Upgraded view, king bed, soaking tub.
                          </TabsContent>
                          <TabsContent value="private" className="text-sm text-muted-foreground">
                            Standalone villa, private deck & bath.
                          </TabsContent>
                        </Tabs>

                        <div className="rounded-lg border bg-white/80 p-3 text-sm">
                          <div className="flex justify-between">
                            <span>Selected nights</span>
                            <span>{nights}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guests (set next)</span>
                            <span>{guests}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Estimated total</span>
                            <span>${total.toFixed(0)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* STEP 1: GUESTS + ADDONS */}
                {step === 1 && (
                  <motion.div key="guests" {...fadeVariants} className="grid gap-6 py-6 md:grid-cols-2">
                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <UserRound className="h-5 w-5" />
                          Guests
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="mb-2 block">How many guests? {guests}</Label>
                          <Slider value={[guests]} onValueChange={(v) => setGuests(v[0])} min={1} max={6} step={1} />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-white/80 p-3">
                          <div className="text-sm">
                            <div className="font-medium">Children joining?</div>
                            <p className="text-xs text-muted-foreground">We can arrange family-friendly options.</p>
                          </div>
                          <Switch checked={hasChildren} onCheckedChange={setHasChildren} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle>Popular add-ons</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {ADDONS.map((a) => {
                          const on = addons.includes(a.id);
                          const featured = theme.featuredAddons.includes(a.id);
                          return (
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              key={a.id}
                              onClick={() =>
                                setAddons((p) => (p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id]))
                              }
                              className={`rounded-xl border p-4 text-left transition hover:shadow focus:outline-none focus:ring-2 ${
                                on ? `${theme.chip} ring-1 ring-offset-0` : "bg-white/80 focus:ring-emerald-400"
                              } ${featured ? "shadow-sm" : ""}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-semibold">{a.name}</div>
                                  <div className="text-xs text-muted-foreground">+${a.price}</div>
                                </div>
                                <Check className={`h-5 w-5 ${on ? "text-emerald-700" : "text-muted-foreground"}`} />
                              </div>
                            </motion.button>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* STEP 2: PERSONALIZE */}
                {step === 2 && (
                  <motion.div key="personalize" {...fadeVariants} className="grid gap-6 py-6 md:grid-cols-2">
                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle>Your goals</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-3">
                        {theme.goals.map((g) => {
                          const on = goals.includes(g);
                          return (
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              key={g}
                              onClick={() => setGoals((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]))}
                              className={`rounded-xl border p-3 text-left text-sm transition hover:shadow focus:outline-none focus:ring-2 ${
                                on ? theme.chip : "bg-white/80 focus:ring-amber-400"
                              }`}
                            >
                              {g}
                            </motion.button>
                          );
                        })}
                      </CardContent>
                    </Card>

                    <Card className={`border-0 bg-gradient-to-b ${theme.gradient}`}>
                      <CardHeader>
                        <CardTitle>Diet & preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div className="flex flex-wrap gap-2">
                          {theme.diets.map((tag) => {
                            const on = diet.includes(tag);
                            return (
                              <motion.button
                                whileTap={{ scale: 0.98 }}
                                key={tag}
                                onClick={() =>
                                  setDiet((p) => (p.includes(tag) ? p.filter((x) => x !== tag) : [...p, tag]))
                                }
                                className={`rounded-full border px-3 py-1 transition focus:outline-none focus:ring-2 ${
                                  on ? theme.chip : "bg-white/80 focus:ring-emerald-400"
                                }`}
                              >
                                {tag}
                              </motion.button>
                            );
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground">We’ll tailor menus & workshop tips based on your choices.</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* STEP 3: ACTIVITIES */}
                {step === 3 && (
                  <motion.div key="activities" {...fadeVariants} className="py-6">
                    <div className="mb-3 text-sm text-muted-foreground">Tap to include or remove an activity block.</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {data.activities.map((act) => {
                        const on = activities.includes(act.id);
                        return (
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            key={act.id}
                            onClick={() =>
                              setActivities((p) => (p.includes(act.id) ? p.filter((x) => x !== act.id) : [...p, act.id]))
                            }
                            className={`rounded-xl border p-4 text-left transition hover:shadow focus:outline-none focus:ring-2 ${
                              on ? theme.chip : "bg-white/80 focus:ring-emerald-400"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-semibold">{act.name}</div>
                                <div className="text-xs text-muted-foreground">{act.durationHrs} hrs</div>
                              </div>
                              <Check className={`h-5 w-5 ${on ? "text-emerald-700" : "text-muted-foreground"}`} />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={next} className="gap-2">
                        Build itinerary <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: ITINERARY PREVIEW */}
                {step === 4 && (
                  <motion.div key="itinerary" {...fadeVariants} className="py-6">
                    <div className="mb-4 text-sm text-muted-foreground">Generated from your choices — editable post-booking.</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {data.sampleItinerary.map((d) => (
                        <Card key={d.day} className="bg-white/85">
                          <CardHeader>
                            <CardTitle className="text-base">
                              Day {d.day}: {d.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              {d.items.map((x, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo}`} />
                                  {x}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: SIGN IN */}
                {step === 5 && (
                  <motion.div key="signin" {...fadeVariants} className="grid gap-6 py-6 md:grid-cols-2">
                    <Card className="bg-white/85">
                      <CardHeader>
                        <CardTitle>Create account</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label>Name</Label>
                          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Traveler" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="text-sm">
                            <div className="font-medium">Receive prep guide</div>
                            <p className="text-xs text-muted-foreground">Packing list, nutrition tips, travel info.</p>
                          </div>
                          <Switch checked={agree} onCheckedChange={setAgree} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/85">
                      <CardHeader>
                        <CardTitle>Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Check-in</span>
                          <span>{checkIn ? format(checkIn, "EEE, MMM d") : "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-out</span>
                          <span>{checkOut && checkOut !== checkIn ? format(checkOut, "EEE, MMM d") : "—"}</span>
                        </div>
                        <div className="flex justify-between"><span>Nights</span><span>{nights}</span></div>
                        <div className="flex justify-between"><span>Guests</span><span>{guests}</span></div>
                        <div className="flex justify-between"><span>Suite</span><span className="capitalize">{suite}</span></div>
                        <Separator />
                        <div className="flex justify-between font-medium"><span>Total</span><span>${total.toFixed(0)}</span></div>
                      </CardContent>
                    </Card>

                    <div className="col-span-full flex justify-end">
                      <Button onClick={() => { if (!email || !name) return; next(); }} disabled={!email || !name} className="gap-2">
                        Confirm details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: REVIEW */}
                {step === 6 && (
                  <motion.div key="review" {...fadeVariants} className="py-12">
                    <div className="relative mx-auto max-w-md text-center">
                      <Burst />
                      <div className={`inline-flex items-center rounded-full px-3 py-1 ring-1 ring-offset-0 bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo} text-white`}>
                        <Check className="mr-1 h-4 w-4" />
                        Demo Booked
                      </div>
                      <h3 className="mt-3 font-serif text-2xl">You're all set, {name || "traveler"}!</h3>
                      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                        In production, payment would complete here and your portal would unlock with chat, edits, and reminders.
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-3">
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText("DEMO-REF-" + Math.random().toString(36).slice(2, 8).toUpperCase());
                            toast({ title: "Reference copied", description: "We copied your demo reference to clipboard." });
                          }}
                        >
                          Copy reference
                        </Button>
                        <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Container>

            {/* STICKY FOOTER (inside dialog, never touches screen edges) */}
            {FooterNav}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
