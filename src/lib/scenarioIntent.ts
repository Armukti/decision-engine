export function generateScenarioIntent(alerts: string[]) {
  const text = alerts.join(" ").toLowerCase();

  if (text.includes("batas diri")) return "boundary_challenge";
  if (text.includes("kemandirian")) return "empathy_challenge";

  return "balanced";
}