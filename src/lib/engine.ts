function injectName(text: string, name: string) {
  if (!text) return text
  return text.replaceAll("{name}", name)
}

export function getFinalInsight(
  state: any,
  name: string,
  history: any[] = []
) {
  const sorted = Object.entries(state || {}).sort(
    (a: any, b: any) => b[1] - a[1]
  )

  const t1 = sorted[0]?.[0] || ""
  const t2 = sorted[1]?.[0] || ""
  const t3 = sorted[2]?.[0] || ""

  // 🎯 TITLE
  let title = "Cara {name} Menghadapi Pilihan"

  if (t1 === "avoidance" && t2 === "logic") {
    title = "Yang Main Aman Tapi Sadar"
  } else if (t1 === "avoidance" && t2 === "empathy") {
    title = "Yang Nahan Diri Tapi Peduli"
  } else if (t1 === "courage" && t2 === "empathy") {
    title = "Yang Berani dan Peduli"
  } else if (t1 === "logic" && t2 === "courage") {
    title = "Yang Berani Tapi Tetap Mikir"
  }

  // 🎬 STORY
  let story = "{name} sering milih jalan yang paling aman."

  if (t1 === "avoidance" && t2 === "logic") {
    story =
      "{name} cenderung hati-hati dalam ambil keputusan, tapi sebenarnya dia juga banyak mikir sebelum bertindak."
  }

  if (t1 === "avoidance" && t2 === "empathy") {
    story =
      "{name} sering nahan diri, tapi bukan karena nggak peduli. Justru dia cukup peka sama keadaan sekitar."
  }

  if (t1 === "courage" && t2 === "empathy") {
    story =
      "{name} cukup berani untuk ambil langkah, tapi tetap mempertimbangkan orang lain."
  }

  // 🔍 TRACEABLE MOMENTS
  const findMoments = (traitKey: string) =>
    history.filter((h) => h.trait?.[traitKey])

  const avoidanceMoments = findMoments("avoidance")
  const empathyMoments = findMoments("empathy")
  const logicMoments = findMoments("logic")

  // ⚡ TWIST (BERBASIS KEJADIAN)
  let twist =
    "Kadang pilihan itu bikin {name} melewatkan sesuatu yang sebenarnya penting."

  if (avoidanceMoments.length > 0) {
    const last = avoidanceMoments[avoidanceMoments.length - 1]

    twist = `{name} sempat memilih "${last.choice.toLowerCase()}" saat menghadapi situasi: "${last.question}". Di momen seperti ini, {name} cenderung menahan diri, dan itu kadang bikin kesempatan lewat begitu saja.`
  } else if (logicMoments.length > 0) {
    const last = logicMoments[logicMoments.length - 1]

    twist = `{name} terlihat berpikir cukup dalam saat memilih "${last.choice.toLowerCase()}". Ini bagus, tapi kadang bisa bikin {name} menunda langkah.`
  } else if (empathyMoments.length > 0) {
    const last = empathyMoments[empathyMoments.length - 1]

    twist = `{name} sempat menunjukkan kepedulian saat memilih "${last.choice.toLowerCase()}". Tapi kadang, terlalu fokus ke orang lain bisa bikin {name} lupa ke dirinya sendiri.`
  }

  // 🚀 FUTURE
  let future =
    "Kalau {name} mulai berani ambil langkah kecil, banyak hal baru bisa kebuka."

  if (t1 === "courage") {
    future =
      "Kalau {name} terus jaga keberanian itu, dia bisa jadi orang yang kuat dalam banyak situasi."
  }

  if (t1 === "logic") {
    future =
      "Kalau {name} bisa lebih cepat ambil keputusan, dia bisa jadi problem solver yang tajam."
  }

  // 🧠 FORMAT MOMENTS UNTUK UI
  const keyMoments = history.slice(-3) // ambil 3 terakhir

  return {
    title: injectName(title, name),
    story: injectName(story, name),
    twist: injectName(twist, name),
    future: injectName(future, name),

    scoring: sorted,
    topTraits: [t1, t2, t3],

    keyMoments, // 🔥 kirim ke UI
  }
}