"use server";

import { db } from "./db";

// =============================
// 🧠 SAVE MEMORY
// =============================
export async function updateChildMemory(
  name: string,
  trait: string
) {
  let child = await db.child.findFirst({
    where: { name },
  });

  if (!child) {
    child = await db.child.create({
      data: {
        name,
        age: 10,
      },
    });
  }

  await db.decision.create({
    data: {
      childId: child.id,
      trait,
    },
  });
}

// =============================
// 📊 ANALYZE
// =============================
export async function analyzeBehavior(name: string) {
  const child = await db.child.findFirst({
    where: { name },
    include: { decisions: true },
  });

  if (!child) {
    return {
      agency: 0,
      awareness: 0,
      boundary: 0,
      total: 0,
    };
  }

  const count = {
    Agency: 0,
    Awareness: 0,
    Boundary: 0,
  };

  for (const d of child.decisions) {
    if (count[d.trait as keyof typeof count] !== undefined) {
      count[d.trait as keyof typeof count]++;
    }
  }

  const total = child.decisions.length || 1;

  return {
    agency: Math.round((count.Agency / total) * 100),
    awareness: Math.round((count.Awareness / total) * 100),
    boundary: Math.round((count.Boundary / total) * 100),
    total,
  };
}

// =============================
// 🧠 INSIGHT
// =============================
export async function generateInsight(
  name: string,
  age: number
) {
  const a = await analyzeBehavior(name);

  let insight = `${name} sedang membentuk pola pengambilan keputusan.`;

  if (a.agency > 60) insight += " Cenderung mandiri.";
  else if (a.awareness > 60) insight += " Sangat mempertimbangkan orang lain.";
  else if (a.boundary > 60) insight += " Cenderung menjaga jarak.";

  return { insight, analysis: a };
}

// =============================
// 🚨 ALERT
// =============================
export async function getBehaviorAlert(name: string) {
  const a = await analyzeBehavior(name);

  if (a.agency > 70) return "⚠️ Agency terlalu dominan.";
  if (a.awareness > 70) return "⚠️ Awareness terlalu dominan.";
  if (a.boundary > 70) return "⚠️ Boundary terlalu dominan.";

  return "";
}

// =============================
// 🔁 ADAPTIVE
// =============================
export async function getAdaptiveHint(name: string) {
  const a = await analyzeBehavior(name);

  if (a.agency > 70) return "stimulate_awareness";
  if (a.awareness > 70) return "stimulate_agency";
  if (a.boundary > 70) return "stimulate_social";

  return "balanced";
}

// =============================
// 🤖 DUMMY AI (AMAN)
// =============================
export async function generateAI(prompt: string) {
  return JSON.stringify({
    scenario: "Seorang anak menghadapi situasi sederhana dan harus memilih tindakan.",
    choices: [
      { text: "Ambil keputusan sendiri", trait: "Agency" },
      { text: "Tanya orang lain", trait: "Awareness" },
      { text: "Diam saja", trait: "Boundary" },
    ],
  });
}