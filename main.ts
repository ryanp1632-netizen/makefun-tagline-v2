// makefun-tagline-01 entry (Node 22, standard library only).
// Writes one tagline for make.fun to /output/entry.txt (MAKEFUN_OUTPUT_DIR outside the grader)
// and prints the same line. The line is a fixed string, so every run writes the same bytes.
// Plain JavaScript on purpose: the grader runs `node /bot/main.ts` with no flags.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Candidates, all written for this entry. The judge weighs, in order:
// 1 says what make.fun is (AI agents compete, get ranked, win money),
// 2 makes a developer want to enter, 3 reads at a glance, 4 sticks, 5 plain, no hype.
const CANDIDATES = [
  'May the best AI agent win. Compete, get ranked, get paid.',
  'May the best AI agent win: compete, get ranked, get paid.',
  'May the best AI agent win. Ranked in public, paid in USDC.',
  'Prove your AI agent is the best. Compete, get ranked, win money.',
  'Think your AI agent is the best? Compete, get ranked, win money.',
  'AI agents compete. Rankings are public. Winners get paid.',
  'AI agents compete. The leaderboard decides. Winners get paid.',
  'Pit your AI agent against the field. Get ranked. Get paid.',
  'Your AI agent against everyone else\'s. Ranked in public. Paid in cash.',
  'Where AI agents prove themselves: compete, get ranked, win money.',
  'Where AI agents compete for money, and the rankings are public.',
  'AI agents compete here for real money. The leaderboard is public.',
  'AI agents compete here. The scoreboard decides who gets paid.',
  'Ranked contests for AI agents, with real money for the winners.',
  'AI agent contests, ranked in the open, paid in USDC.',
  'Real contests for AI agents: public rankings, real money.',
  'Send your AI agent to compete. Get ranked. Get paid.',
  'Compete with your AI agent. Climb the leaderboard. Win cash.',
  'Put your AI agent on the leaderboard. Beat the field. Win the pot.',
  'Enter your AI agent. Beat the field. Take the prize.',
  'Bring your AI agent. Beat the others. Win the money.',
  'Build an AI agent. Beat the field. Get paid.',
  'Prove your AI agent: compete, rank, get paid.',
  'Your AI agent vs. the world, for real money.',
  'The best AI agents get paid. Find out if yours is one.',
  'Every AI agent claims it\'s the best. Here they compete for money.',
  'Don\'t claim your AI agent is the best. Rank it. Get paid for it.',
  'Benchmarks are claims. Here, AI agents compete for real money.',
  'Show, don\'t tell: AI agents compete here for real money.',
  'AI agents compete, get ranked, and win money. Yours could too.',
  'Where AI agents compete, get ranked, and get paid. May the best one win.',
  'May the best AI agent win. Every agent ranked, every winner paid.',
  'May the best AI agent win. Enter yours: get ranked, get paid.',
  'AI agents and programs compete in the open. The best get paid.',
  'Your AI agent\'s rank, in public, with money on the line.',
];

// Ranking, criteria in the judge's order (the first criterion that differs decides):
// - Out on criterion 1 (no ranking, no money, or competing only implied): "vs. the world",
//   "Build an AI agent. Beat the field.", "Enter your AI agent", "Bring your AI agent",
//   "Benchmarks are claims", "Show, don't tell", "Every AI agent claims", "Don't claim",
//   "The best AI agents get paid", "AI agents and programs compete in the open",
//   "Ranked in public, paid in USDC" (USDC is jargon to a stranger).
// - Full on criterion 1 but third person, so weaker on criterion 2 (nothing asks the developer
//   in): "Rankings are public", "The leaderboard decides", "The scoreboard decides",
//   "Ranked contests", "AI agent contests, ranked in the open", "Real contests for AI agents",
//   "Where AI agents compete for money", "AI agents compete here for real money".
// - Full on 1 and 2, lost on 3 (long or awkward aloud): "Your AI agent against everyone else's",
//   "Where AI agents compete, get ranked, and get paid. May the best one win.",
//   "AI agents compete ... Yours could too.", "Send your AI agent to compete",
//   "Prove your AI agent: compete, rank" ("rank" reads as ranking others),
//   "Every agent ranked, every winner paid" (promises more than make.fun pays).
// Final five:
//   1. May the best AI agent win. Compete, get ranked, get paid.   57 chars: every word of
//      criterion 1 (AI agent, compete, ranked, paid), an invitation to the developer, two beats
//      that read aloud, and the one familiar turn of phrase in the list.
//   2. The colon variant: the same words, but the period reads more naturally aloud.
//   3. Prove your AI agent is the best. Compete, get ranked, win money.   Strong "proof" pitch,
//      7 chars longer, no hook.
//   4. Pit your AI agent against the field. Get ranked. Get paid.   Good, plainer.
//   5. Think your AI agent is the best? Compete, get ranked, win money.   The question asks less.
const PICK = 0;
const TAGLINE = CANDIDATES[PICK];

// Guard the gate's rules: 1 to 280 code points, not only white space, one line.
const length = [...TAGLINE].length;
if (length < 1 || length > 280 || TAGLINE.trim() === '' || TAGLINE.includes('\n')) {
  throw new Error(`tagline breaks the gate: ${length} code points`);
}

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), TAGLINE, 'utf8');
console.log(TAGLINE);
