export type TraitKey =
  | "hook"
  | "data"
  | "meme"
  | "brand"
  | "performance"
  | "narrative"
  | "chaos"
  | "process";

export type Archetype = {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  blurb: string;
  superpower: string;
  kryptonite: string;
  soulmate: string;
  nemesis: string;
  colors: {
    bg: string;
    ink: string;
    accent: string;
    chip: string;
  };
  stats: {
    virality: number;
    rigor: number;
    taste: number;
    speed: number;
  };
  traits: Partial<Record<TraitKey, number>>;
  rarity: number;
};

export const ARCHETYPES: Archetype[] = [
  {
    id: "hook-gremlin",
    emoji: "🪝",
    name: "The Hook Gremlin",
    tagline: "Rewrites headlines 40 times before breakfast.",
    blurb:
      "You'd rather rename a campaign 'ATTN: you were lied to' than open the attribution dashboard. You know scroll-stopping is 70% of the job and you refuse to pretend otherwise.",
    superpower: "Scroll-stopping in sub-3-seconds",
    kryptonite: "Attribution dashboards (the horror)",
    soulmate: "The Meme Whisperer",
    nemesis: "The Dashboard Monk",
    colors: { bg: "#D8FF3E", ink: "#0A0A0A", accent: "#FF3D7F", chip: "#0A0A0A" },
    stats: { virality: 96, rigor: 32, taste: 84, speed: 91 },
    traits: { hook: 3, chaos: 2, meme: 1 },
    rarity: 12,
  },
  {
    id: "dashboard-monk",
    emoji: "📊",
    name: "The Dashboard Monk",
    tagline: "Meditates on MER. Prays to ROAS.",
    blurb:
      "Your pivot tables have pivot tables. You have never felt joy, but you have felt a p-value below 0.05 and it was better than joy.",
    superpower: "Proving any creative wrong with math",
    kryptonite: "A vibes-based campaign brief",
    soulmate: "The Systems Architect",
    nemesis: "The Hook Gremlin",
    colors: { bg: "#0A0A0A", ink: "#D8FF3E", accent: "#D8FF3E", chip: "#D8FF3E" },
    stats: { virality: 34, rigor: 98, taste: 58, speed: 62 },
    traits: { data: 3, process: 2, performance: 1 },
    rarity: 18,
  },
  {
    id: "meme-whisperer",
    emoji: "🐸",
    name: "The Meme Whisperer",
    tagline: "Ships memes before they're trending. Gatekeeps the ones that aren't.",
    blurb:
      "You've had five drafts folders of memes your CMO 'wasn't ready for.' You are the reason a Fortune 500 once tweeted 'bruh.' You regret nothing.",
    superpower: "Timing a meme ±6 hours from its peak",
    kryptonite: "Brand-safety checklists (you cry)",
    soulmate: "The Hook Gremlin",
    nemesis: "The LinkedIn Philosopher",
    colors: { bg: "#FF3D7F", ink: "#0A0A0A", accent: "#D8FF3E", chip: "#0A0A0A" },
    stats: { virality: 99, rigor: 28, taste: 92, speed: 97 },
    traits: { meme: 3, chaos: 2, hook: 1 },
    rarity: 4,
  },
  {
    id: "linkedin-philosopher",
    emoji: "🎩",
    name: "The LinkedIn Philosopher",
    tagline: "Writes '1. I got fired. 2. It was the best thing that ever happened to me.'",
    blurb:
      "Every story starts with a stranger in a coffee shop who 'changed how you see marketing forever.' Your carousel's first slide is always 'Nobody is talking about this.' Somebody is, actually. It's you. Again.",
    superpower: "Turning a mild anecdote into 2.1M impressions",
    kryptonite: "Being wrong in public (catastrophic)",
    soulmate: "The Narrative Architect",
    nemesis: "The Meme Whisperer",
    colors: { bg: "#2E5BFF", ink: "#F5F1E8", accent: "#FFB547", chip: "#F5F1E8" },
    stats: { virality: 78, rigor: 54, taste: 46, speed: 72 },
    traits: { narrative: 3, brand: 2, process: 1 },
    rarity: 14,
  },
  {
    id: "launch-day-panicker",
    emoji: "🚨",
    name: "The Launch-Day Panicker",
    tagline: "Sends 47 Slack messages between 5:58am and 6:02am.",
    blurb:
      "You pre-write the 'crisis comms' doc two weeks before launch. You have a screenshot of every competitor's homepage 'just in case.' You will be fine. You will not believe us.",
    superpower: "Catching a broken UTM before it ships",
    kryptonite: "A Slack notification after 9pm",
    soulmate: "The Dashboard Monk",
    nemesis: "The Vibes CMO",
    colors: { bg: "#FFB547", ink: "#0A0A0A", accent: "#FF3D7F", chip: "#0A0A0A" },
    stats: { virality: 48, rigor: 84, taste: 56, speed: 80 },
    traits: { process: 3, data: 1, chaos: 2 },
    rarity: 9,
  },
  {
    id: "brand-guardian",
    emoji: "🛡️",
    name: "The Brand Guardian",
    tagline: "Knows the hex code of your secondary by heart. #2E5BFF. Don't test them.",
    blurb:
      "You once rejected a $400k activation because the kerning was 'aggressive.' You were correct. You will always be correct. The brand guidelines are a living document and you are its sole living reader.",
    superpower: "Spotting a 1px mis-aligned logo at 40 paces",
    kryptonite: "'Can we just send this one out?'",
    soulmate: "The Systems Architect",
    nemesis: "The Hook Gremlin",
    colors: { bg: "#F5F1E8", ink: "#0A0A0A", accent: "#2E5BFF", chip: "#0A0A0A" },
    stats: { virality: 58, rigor: 88, taste: 96, speed: 52 },
    traits: { brand: 3, process: 2 },
    rarity: 11,
  },
  {
    id: "narrative-architect",
    emoji: "📜",
    name: "The Narrative Architect",
    tagline: "Thinks in three-act structure. Pitches in five.",
    blurb:
      "You don't write ads. You write an origin story, a rising action, and a resolution where the customer becomes the hero. Brand film, wrapped in a deck, wrapped in a moment. Every quarter.",
    superpower: "Making a Series B feel like a Pixar opening",
    kryptonite: "A 30-second pre-roll spot (cruel)",
    soulmate: "The LinkedIn Philosopher",
    nemesis: "The Performance Marketer",
    colors: { bg: "#0A0A0A", ink: "#F5F1E8", accent: "#FFB547", chip: "#FFB547" },
    stats: { virality: 72, rigor: 66, taste: 94, speed: 44 },
    traits: { narrative: 3, brand: 1, hook: 1 },
    rarity: 8,
  },
  {
    id: "performance-marketer",
    emoji: "🎯",
    name: "The Performance Marketer",
    tagline: "CPM-pilled. Creatively-optional. Undefeated on the 1-7-28.",
    blurb:
      "You speak in acronyms like a naval officer. You've never seen a campaign you couldn't A/B into the ground. Brand is 'vibes for people without spreadsheets.' You are probably right.",
    superpower: "Scaling a winning creative 10x in a weekend",
    kryptonite: "'What if we tried something... weird?'",
    soulmate: "The Dashboard Monk",
    nemesis: "The Narrative Architect",
    colors: { bg: "#C2FF00", ink: "#0A0A0A", accent: "#0A0A0A", chip: "#0A0A0A" },
    stats: { virality: 82, rigor: 92, taste: 52, speed: 94 },
    traits: { performance: 3, data: 2 },
    rarity: 10,
  },
  {
    id: "vibes-cmo",
    emoji: "🔮",
    name: "The Vibes CMO",
    tagline: "No metrics. Only vibes. Hired anyway.",
    blurb:
      "Your strategy doc is seven lines and a Pharrell lyric. You've never been 'in the data' but you've been in the room when the idea landed. You are either a generational talent or completely faking it. Both, probably.",
    superpower: "Reading the room like it's your native language",
    kryptonite: "Quarterly board reviews (existential)",
    soulmate: "The Meme Whisperer",
    nemesis: "The Launch-Day Panicker",
    colors: { bg: "#FF3D7F", ink: "#F5F1E8", accent: "#C2FF00", chip: "#F5F1E8" },
    stats: { virality: 70, rigor: 22, taste: 98, speed: 66 },
    traits: { brand: 2, chaos: 3, meme: 1 },
    rarity: 6,
  },
  {
    id: "systems-architect",
    emoji: "🧱",
    name: "The Systems Architect",
    tagline: "Built the Notion. Runs the OKRs. Quietly saves everything.",
    blurb:
      "While everyone argues about the headline, you've already built the lifecycle flow, the reporting dashboard, and the three Zaps that make them work. You are the reason the company ships. Nobody says thank you.",
    superpower: "Turning any mess into a documented SOP by Friday",
    kryptonite: "Being on camera for the launch video",
    soulmate: "The Brand Guardian",
    nemesis: "The Vibes CMO",
    colors: { bg: "#F5F1E8", ink: "#0A0A0A", accent: "#2E5BFF", chip: "#0A0A0A" },
    stats: { virality: 38, rigor: 96, taste: 62, speed: 84 },
    traits: { process: 3, data: 1, brand: 1 },
    rarity: 13,
  },
  {
    id: "viral-savant",
    emoji: "🧃",
    name: "The Viral Savant",
    tagline: "Hit once. Cannot explain it. Has been dining out on it for 3 years.",
    blurb:
      "You went nuclear on one post, one campaign, one stunt. It was beautiful. It was unrepeatable. You now get paid to speak at conferences about 'the framework.' There is no framework. It was a Tuesday.",
    superpower: "Manifesting a cultural moment out of nothing",
    kryptonite: "Doing it again (statistically unlikely)",
    soulmate: "The Vibes CMO",
    nemesis: "The Performance Marketer",
    colors: { bg: "#FFB547", ink: "#0A0A0A", accent: "#FF3D7F", chip: "#0A0A0A" },
    stats: { virality: 88, rigor: 38, taste: 86, speed: 70 },
    traits: { chaos: 2, hook: 2, meme: 2, narrative: 1 },
    rarity: 5,
  },
  {
    id: "growth-alchemist",
    emoji: "⚗️",
    name: "The Growth Alchemist",
    tagline: "Turns a referral loop into a religion.",
    blurb:
      "You unironically say 'viral coefficient' in meetings and nobody stops you because you've been right four times in a row. You see loops where normal people see funnels. You are, honestly, a little scary.",
    superpower: "Designing a loop that compounds without paid",
    kryptonite: "A product with no Aha moment",
    soulmate: "The Systems Architect",
    nemesis: "The Brand Guardian",
    colors: { bg: "#2E5BFF", ink: "#D8FF3E", accent: "#D8FF3E", chip: "#D8FF3E" },
    stats: { virality: 86, rigor: 80, taste: 74, speed: 82 },
    traits: { performance: 2, data: 2, hook: 1, process: 1 },
    rarity: 7,
  },
];

export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}

export const DEFAULT_ARCHETYPE = ARCHETYPES[0];
