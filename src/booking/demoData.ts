// Static demo data for packages, pricing, add-ons, and sample itineraries

export type RetreatKey = "weightloss" | "vegan" | "mindfulness" | "detox";

export const RETREATS: Record<
  RetreatKey,
  {
    id: RetreatKey;
    title: string;
    subtitle: string;
    hero: string; // image url or import path
    basePricePerNight: number;
    description: string;
    highlights: string[];
    activities: { id: string; name: string; durationHrs: number }[];
    sampleItinerary: { day: number; title: string; items: string[] }[];
  }
> = {
  weightloss: {
    id: "weightloss",
    title: "Weight Loss Retreat",
    subtitle: "Reclaim Your Energy",
    hero: "/src/assets/retreat-weightloss.jpg",
    basePricePerNight: 220,
    description:
      "Transform your body and spirit with guided movement, nourishing cuisine, and mindful daily rituals.",
    highlights: [
      "Daily movement coaching",
      "Nutrition workshops",
      "Spa & sauna access",
      "1:1 progress consults",
    ],
    activities: [
      { id: "yoga", name: "Morning Yoga Flow", durationHrs: 1 },
      { id: "hike", name: "Guided Forest Hike", durationHrs: 2 },
      { id: "nutrition", name: "Nutrition Masterclass", durationHrs: 1 },
      { id: "ice", name: "Cold Plunge & Sauna", durationHrs: 1 },
    ],
    sampleItinerary: [
      {
        day: 1,
        title: "Arrivals & Reset",
        items: ["Check-in & welcome tea", "Breathwork & light stretch", "Chef's light dinner"],
      },
      {
        day: 2,
        title: "Metabolic Kickoff",
        items: ["Sunrise yoga", "Fueling right class", "Forest hike & picnic", "Evening sauna"],
      },
      {
        day: 3,
        title: "Momentum Day",
        items: ["Mobility session", "HIIT-lite circuit", "Cold plunge reset", "Smart carbs demo"],
      },
      { day: 4, title: "Integration", items: ["Gentle flow", "Goal mapping 1:1", "Farewell brunch"] },
    ],
  },
  vegan: {
    id: "vegan",
    title: "Vegan Wellness",
    subtitle: "Nourish from Within",
    hero: "/src/assets/retreat-vegan.jpg",
    basePricePerNight: 180,
    description:
      "Plant-powered healing: organic menus, sustainable living, rejuvenating spa practices.",
    highlights: ["Farm-to-table dining", "Fermentation lab", "Herbalism walk", "Sound bath"],
    activities: [
      { id: "farm", name: "Garden Harvest Walk", durationHrs: 1 },
      { id: "cook", name: "Vegan Cooking Studio", durationHrs: 2 },
      { id: "sound", name: "Evening Sound Bath", durationHrs: 1 },
    ],
    sampleItinerary: [
      { day: 1, title: "Root", items: ["Welcome circle", "Garden tasting", "Fireplace stories"] },
      { day: 2, title: "Bloom", items: ["Sun salutation", "Cooking studio", "Local market visit"] },
      { day: 3, title: "Thrive", items: ["Herbalism basics", "Forest meditation", "Sound bath"] },
    ],
  },
  mindfulness: {
    id: "mindfulness",
    title: "Mindfulness Retreat",
    subtitle: "Find Your Quiet",
    hero: "/src/assets/retreat-mindfulness.jpg",
    basePricePerNight: 200,
    description: "Take space to slow down, breathe deeper, and listen within — fully guided.",
    highlights: ["Meditation coaching", "Silent breakfast", "Journaling corners", "Star-gazing deck"],
    activities: [
      { id: "med", name: "Guided Meditation", durationHrs: 1 },
      { id: "journal", name: "Journaling Practice", durationHrs: 1 },
      { id: "stargaze", name: "Night Sky Gazing", durationHrs: 1 },
    ],
    sampleItinerary: [
      { day: 1, title: "Arrive", items: ["Grounding walk", "Intro to breath", "Early lights out"] },
      { day: 2, title: "Settle", items: ["Silent breakfast", "Meditation blocks", "Tea ceremony"] },
      { day: 3, title: "Soften", items: ["Body scan workshop", "Guided journaling", "Stargazing"] },
    ],
  },
  detox: {
    id: "detox",
    title: "Digital Detox",
    subtitle: "Unplug to Reconnect",
    hero: "/src/assets/retreat-detox.jpg",
    basePricePerNight: 160,
    description:
      "Step away from screens and into slow living — long walks, real conversations, deep rest.",
    highlights: ["Phone lockbox", "Campfire socials", "Analog games", "No-work promise"],
    activities: [
      { id: "walk", name: "Coastline Walk", durationHrs: 2 },
      { id: "camp", name: "Campfire Stories", durationHrs: 1 },
      { id: "paint", name: "Analog Art Hour", durationHrs: 1 },
    ],
    sampleItinerary: [
      { day: 1, title: "Exhale", items: ["Digital hand-in", "Forest slow walk", "Campfire tea"] },
      { day: 2, title: "Play", items: ["Analog art hour", "Kayak cove", "Board-games night"] },
      { day: 3, title: "Reconnect", items: ["Sunrise stretch", "Beach picnic", "No-screen ceremony"] },
    ],
  },
};

export const ADDONS = [
  { id: "airport", name: "Airport Transfers", price: 50 },
  { id: "spa", name: "90-min Deep Tissue Spa", price: 95 },
  { id: "photos", name: "Retreat Photo Session", price: 120 },
  { id: "private", name: "Private Coaching 60m", price: 70 },
];
