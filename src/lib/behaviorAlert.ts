const coreLabel: any = {
  Agency: "Kemandirian (Agency)",
  Awareness: "Kesadaran Sosial (Awareness)",
  Financial: "Finansial (Financial)",
  Boundary: "Batas Diri (Boundary)",
};

export function detectBehaviorAlerts(history: any[]) {
  const alerts: string[] = [];

  if (history.length < 3) return alerts;

  const last = history.at(-1).profile;
  const prev = history.at(-2).profile;
  const prev2 = history.at(-3).profile;

  Object.keys(last).forEach((trait) => {
    const now = last[trait];
    const before = prev[trait];
    const before2 = prev2[trait];

    const label = coreLabel[trait];

    if (now < before && before < before2) {
      alerts.push(`${label} menurun dalam 2 sesi terakhir.`);
    }
  });

  return alerts;
}