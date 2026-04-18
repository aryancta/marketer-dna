import type { TraitKey } from "./archetypes";

export type Choice = {
  id: string;
  label: string;
  sub?: string;
  weights: Partial<Record<TraitKey, number>>;
};

export type Question = {
  id: string;
  index: number;
  prompt: string;
  flavor: string;
  choices: Choice[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    index: 1,
    prompt: "Your launch flopped on day 1. Your first instinct?",
    flavor: "There is a correct answer. (There is not.)",
    choices: [
      {
        id: "a",
        label: "Blame the algorithm. Publicly.",
        sub: "A tweet storm is already forming in your drafts.",
        weights: { hook: 2, chaos: 2, meme: 1 },
      },
      {
        id: "b",
        label: "Post a 'lessons learned' carousel on LinkedIn.",
        sub: "Slide 1: 'Nobody is talking about this.'",
        weights: { narrative: 2, brand: 1, process: 1 },
      },
      {
        id: "c",
        label: "Quietly delete the draft and pretend it never happened.",
        sub: "The campaign is no longer in the CMS. The campaign never was.",
        weights: { process: 2, data: 1, brand: 1 },
      },
      {
        id: "d",
        label: "Make a meme about it before anyone else can.",
        sub: "Getting ahead of the dunk is the dunk.",
        weights: { meme: 3, hook: 1, chaos: 1 },
      },
    ],
  },
  {
    id: "q2",
    index: 2,
    prompt: "Your boss says: 'make it go viral.' You...",
    flavor: "Be honest. The form is anonymous. (It isn't.)",
    choices: [
      {
        id: "a",
        label: "Rewrite the hook 40 times until one hits.",
        weights: { hook: 3, meme: 1 },
      },
      {
        id: "b",
        label: "Open a new doc called 'Viral Framework v4.'",
        weights: { process: 2, narrative: 1, brand: 1 },
      },
      {
        id: "c",
        label: "Launch 12 variants and let the algorithm decide.",
        weights: { performance: 3, data: 2 },
      },
      {
        id: "d",
        label: "Stare directly into the sun for 45 minutes.",
        weights: { chaos: 3, meme: 1 },
      },
    ],
  },
  {
    id: "q3",
    index: 3,
    prompt: "Pick the deadliest weapon in a marketer's arsenal.",
    flavor: "No wrong answer. (There is. It's C.)",
    choices: [
      { id: "a", label: "A three-second hook.", weights: { hook: 3 } },
      { id: "b", label: "A clean attribution model.", weights: { data: 3, performance: 1 } },
      { id: "c", label: "A brand book. A real one.", weights: { brand: 3, process: 1 } },
      { id: "d", label: "A reply guy account with 11k followers.", weights: { meme: 3, chaos: 1 } },
    ],
  },
  {
    id: "q4",
    index: 4,
    prompt: "Your creative hits 10M views. You...",
    flavor: "Pick the one you'd actually do. Not the one you'd post about doing.",
    choices: [
      {
        id: "a",
        label: "Immediately draft 'How we went viral in 72 hours.'",
        weights: { narrative: 3, brand: 1 },
      },
      {
        id: "b",
        label: "Open Looker. Check CPC. Breathe out.",
        weights: { data: 3, performance: 2 },
      },
      {
        id: "c",
        label: "Screenshot the view count. Frame it. Move on.",
        weights: { chaos: 1, hook: 2, meme: 1 },
      },
      {
        id: "d",
        label: "Already bored. Onto the next one.",
        weights: { meme: 2, hook: 2, performance: 1 },
      },
    ],
  },
  {
    id: "q5",
    index: 5,
    prompt: "Legal pushes back on your ad. Your move?",
    flavor: "Every marketer has a legal-pushback protocol. What's yours?",
    choices: [
      { id: "a", label: "Rewrite it until they stop reading it.", weights: { process: 2, narrative: 1 } },
      { id: "b", label: "Ship a softer B-cut and push the spicy one anyway.", weights: { chaos: 2, hook: 2 } },
      { id: "c", label: "Loop in the CMO. Let them fight it out.", weights: { brand: 2, narrative: 1 } },
      { id: "d", label: "Turn their objection into the ad.", weights: { meme: 3, chaos: 1 } },
    ],
  },
  {
    id: "q6",
    index: 6,
    prompt: "Which marketing tool do you actually open on Monday?",
    flavor: "Not what you said in your interview. What you really open.",
    choices: [
      { id: "a", label: "Mixpanel / Amplitude / anything with a chart.", weights: { data: 3, performance: 1 } },
      { id: "b", label: "Figma. It's a lifestyle.", weights: { brand: 3, narrative: 1 } },
      { id: "c", label: "Notion, where OKRs go to be loved.", weights: { process: 3, brand: 1 } },
      { id: "d", label: "The bookmarked 'meme inspo' folder.", weights: { meme: 3, hook: 1 } },
    ],
  },
  {
    id: "q7",
    index: 7,
    prompt: "Pick your preferred content format.",
    flavor: "Lying here will confuse the algorithm. Be truthful.",
    choices: [
      { id: "a", label: "A 12-slide LinkedIn carousel.", weights: { narrative: 3, brand: 1 } },
      { id: "b", label: "A 9-second TikTok with a hard cut.", weights: { hook: 3, meme: 2 } },
      { id: "c", label: "A 3,800-word Substack essay.", weights: { narrative: 2, brand: 2 } },
      { id: "d", label: "A reply that punches above its weight class.", weights: { meme: 3, chaos: 2 } },
    ],
  },
  {
    id: "q8",
    index: 8,
    prompt: "Someone drops a new AI tool in #marketing-random. You...",
    flavor: "Your response here will be judged by future you.",
    choices: [
      { id: "a", label: "Already used it. Already bored. Already built a better one internally.", weights: { process: 2, data: 2, performance: 1 } },
      { id: "b", label: "Post an instant carousel: '5 things nobody noticed in [tool].'", weights: { narrative: 3, brand: 1 } },
      { id: "c", label: "Wire it into a cursed Zap by EOD and tell nobody.", weights: { chaos: 3, meme: 1 } },
      { id: "d", label: "Wait six weeks. Steal the best use case. Take credit.", weights: { performance: 2, brand: 2 } },
    ],
  },
  {
    id: "q9",
    index: 9,
    prompt: "Your campaign budget is cut 60% tomorrow. Reaction?",
    flavor: "Deep breath. This is a stress test.",
    choices: [
      { id: "a", label: "Finally. Creativity thrives under constraint.", weights: { narrative: 2, chaos: 2, brand: 1 } },
      { id: "b", label: "Rebuild the media mix from scratch. Nobody sleeps.", weights: { data: 3, performance: 2 } },
      { id: "c", label: "Double down on organic. It's meme season.", weights: { meme: 3, hook: 2 } },
      { id: "d", label: "Send the 'realigning priorities' Loom.", weights: { process: 3, brand: 1 } },
    ],
  },
  {
    id: "q10",
    index: 10,
    prompt: "Final answer: what IS marketing, really?",
    flavor: "There's no wrong answer. (Except C. C is wrong.)",
    choices: [
      { id: "a", label: "Stopping the scroll long enough to sneak in a promise.", weights: { hook: 3, meme: 1 } },
      { id: "b", label: "A controlled experiment with feelings as the dependent variable.", weights: { data: 3, performance: 2 } },
      { id: "c", label: "The company's vibe, written down.", weights: { brand: 3, narrative: 1 } },
      { id: "d", label: "A loop that turns customers into recruiters.", weights: { performance: 2, process: 2, data: 1 } },
    ],
  },
];

export function scoreAnswers(answers: Record<string, string>): {
  archetypeId: string;
  traitScores: Record<TraitKey, number>;
  fingerprint: string;
} {
  const traitScores: Record<TraitKey, number> = {
    hook: 0,
    data: 0,
    meme: 0,
    brand: 0,
    performance: 0,
    narrative: 0,
    chaos: 0,
    process: 0,
  };

  for (const q of QUESTIONS) {
    const pickId = answers[q.id];
    const choice = q.choices.find((c) => c.id === pickId);
    if (!choice) continue;
    for (const [k, v] of Object.entries(choice.weights)) {
      traitScores[k as TraitKey] += v ?? 0;
    }
  }

  // Map trait vectors to archetype IDs.
  const archetypeScores: Record<string, number> = {};
  const mapping: Array<[string, Partial<Record<TraitKey, number>>]> = [
    ["hook-gremlin", { hook: 3, meme: 1, chaos: 1 }],
    ["dashboard-monk", { data: 3, process: 1, performance: 1 }],
    ["meme-whisperer", { meme: 3, chaos: 2, hook: 1 }],
    ["linkedin-philosopher", { narrative: 3, brand: 2 }],
    ["launch-day-panicker", { process: 2, chaos: 2, data: 1 }],
    ["brand-guardian", { brand: 3, process: 2 }],
    ["narrative-architect", { narrative: 3, brand: 1, hook: 1 }],
    ["performance-marketer", { performance: 3, data: 2 }],
    ["vibes-cmo", { chaos: 3, brand: 1, meme: 1 }],
    ["systems-architect", { process: 3, data: 2, brand: 1 }],
    ["viral-savant", { chaos: 2, hook: 2, meme: 1, narrative: 1 }],
    ["growth-alchemist", { performance: 2, data: 2, process: 1, hook: 1 }],
  ];

  for (const [id, vec] of mapping) {
    let score = 0;
    for (const [k, weight] of Object.entries(vec)) {
      score += (traitScores[k as TraitKey] ?? 0) * (weight ?? 0);
    }
    archetypeScores[id] = score;
  }

  const [winnerId] = Object.entries(archetypeScores).sort((a, b) => b[1] - a[1])[0];

  const fingerprint = QUESTIONS.map((q) => answers[q.id] ?? "-").join("");

  return { archetypeId: winnerId, traitScores, fingerprint };
}
