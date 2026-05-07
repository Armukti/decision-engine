import { getAgeStyle } from "./ageStyle";

export async function generateAIInsight(data: any) {
  const ageStyle = getAgeStyle(Number(data.age));

  const prompt = `
Nama: ${data.name}
Umur: ${data.age}

Profil:
${JSON.stringify(data.profile)}

Instruksi:
${ageStyle.instruction}

Buat insight, rekomendasi, dan prediksi perkembangan anak.
`;

  const res = await fetch("/api/ai-insight", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  return await res.json();
}