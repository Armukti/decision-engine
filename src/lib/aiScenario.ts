export async function generateAIScenario(data: any) {
  const prompt = `
Nama: ${data.name}
Umur: ${data.age}
Intent: ${data.intent}

Buat 1 skenario + 3 pilihan dalam format JSON:
{
  "scenario": "...",
  "choices": [
    { "text": "...", "trait": "Agency" },
    { "text": "...", "trait": "Awareness" },
    { "text": "...", "trait": "Boundary" }
  ]
}
`;

  const res = await fetch("/api/ai-scenario", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  return await res.json();
}