export function getScenarios(age: number) {

  // 👶 AGE ≤ 7 (tetap simple)
  if (age <= 7) {
    return {
      start: {
        id: "start",
        question: "{name} lagi gambar, terus krayonnya jatuh berantakan.",
        options: [
          {
            text: "Langsung dipungutin",
            trait: { responsibility: 2 },
            reaction: "{name} langsung beresin.",
            next: "final",
          },
          {
            text: "Diem dulu",
            trait: { avoidance: 2 },
            reaction: "{name} diem dulu.",
            next: "final",
          },
        ],
      },
    }
  }

  // 🧒 AGE 8–12 (INI YANG UDAH UPGRADE)
  if (age <= 12) {
    return {
      start: {
        id: "start",
        question: "{name} lagi main bareng. Tiba-tiba ada yang curang, tapi cuma {name} yang sadar.",
        options: [
          {
            text: "Langsung tegur",
            trait: { courage: 3, integrity: 2 },
            reaction: "{name} negur walau agak deg-degan.",
            next: "fairness",
          },
          {
            text: "Diem aja",
            trait: { avoidance: 2 },
            reaction: "{name} milih diem, biar nggak ribet.",
            next: "fairness",
          },
          {
            text: "Kasih kode halus",
            trait: { social: 2, empathy: 1 },
            reaction: "{name} coba ngasih kode biar dia sadar.",
            next: "fairness",
          },
          {
            text: "Ikut aja",
            trait: { opportunistic: 2 },
            reaction: "{name} ikut aja, yang penting seru.",
            next: "fairness",
          },
        ],
      },

      fairness: {
        id: "fairness",
        question: "Setelah itu, temen-temen masih nganggep semuanya fair.",
        options: [
          {
            text: "Ngerasa ga enak",
            trait: { empathy: 2 },
            reaction: "{name} ngerasa ada yang ganjel.",
            next: "ego",
          },
          {
            text: "Biasa aja",
            trait: { neutral: 1 },
            reaction: "{name} coba santai aja.",
            next: "ego",
          },
          {
            text: "Mulai mikir ulang",
            trait: { logic: 2 },
            reaction: "{name} mulai mikir, harusnya gimana ya?",
            next: "ego",
          },
          {
            text: "Lupain aja",
            trait: { avoidance: 2 },
            reaction: "{name} milih lupain.",
            next: "ego",
          },
        ],
      },

      ego: {
        id: "ego",
        question: "Besoknya, temen yang curang itu ngajak {name} main lagi.",
        options: [
          {
            text: "Tetap main biasa",
            trait: { social: 2 },
            reaction: "{name} tetep main kayak biasa.",
            next: "group",
          },
          {
            text: "Jaga jarak dikit",
            trait: { caution: 2 },
            reaction: "{name} agak jaga jarak.",
            next: "group",
          },
          {
            text: "Ngomong baik-baik",
            trait: { courage: 2, empathy: 2 },
            reaction: "{name} coba ngomong pelan-pelan.",
            next: "group",
          },
          {
            text: "Cuek aja",
            trait: { ego: 2 },
            reaction: "{name} milih cuek.",
            next: "group",
          },
        ],
      },

      group: {
        id: "group",
        question: "{name} dapet tugas kelompok, tapi ada yang nggak ikut kerja.",
        options: [
          {
            text: "Kerjain sendiri",
            trait: { responsibility: 3 },
            reaction: "{name} biar capek dikit, yang penting selesai.",
            next: "choice",
          },
          {
            text: "Ajak kerja bareng",
            trait: { leadership: 2 },
            reaction: "{name} coba ngajak biar semua ikut.",
            next: "choice",
          },
          {
            text: "Lapor guru",
            trait: { integrity: 2 },
            reaction: "{name} milih jujur ke guru.",
            next: "choice",
          },
          {
            text: "Ikut santai",
            trait: { avoidance: 2 },
            reaction: "{name} jadi ikut santai.",
            next: "choice",
          },
        ],
      },

      choice: {
        id: "choice",
        question: "{name} punya waktu luang, tapi juga ada hal yang harus dikerjain.",
        options: [
          {
            text: "Kerjain dulu",
            trait: { discipline: 3 },
            reaction: "{name} pilih selesain dulu.",
            next: "pressure",
          },
          {
            text: "Main dulu",
            trait: { impulsive: 2 },
            reaction: "{name} pilih nikmatin dulu.",
            next: "pressure",
          },
          {
            text: "Bagi waktu",
            trait: { balance: 2 },
            reaction: "{name} coba bagi waktu.",
            next: "pressure",
          },
          {
            text: "Tunda dulu",
            trait: { avoidance: 2 },
            reaction: "{name} nunda dulu.",
            next: "pressure",
          },
        ],
      },

      pressure: {
        id: "pressure",
        question: "Pas hasilnya keluar, ternyata nggak sesuai harapan {name}.",
        options: [
          {
            text: "Coba lagi",
            trait: { resilience: 3 },
            reaction: "{name} pengen coba lagi.",
            next: "final",
          },
          {
            text: "Kecewa",
            trait: { emotional: 2 },
            reaction: "{name} ngerasa down.",
            next: "final",
          },
          {
            text: "Cari tahu kenapa",
            trait: { logic: 2 },
            reaction: "{name} pengen ngerti kesalahannya.",
            next: "final",
          },
          {
            text: "Santai aja",
            trait: { chill: 2 },
            reaction: "{name} coba santai.",
            next: "final",
          },
        ],
      },
    }
  }

  // 🧑 13+ (placeholder sementara)
  return {
    start: {
      id: "start",
      question: "{name} lagi dihadapkan pada pilihan penting.",
      options: [
        {
          text: "Ambil risiko",
          trait: { courage: 2 },
          reaction: "{name} ambil langkah berani.",
          next: "final",
        },
        {
          text: "Main aman",
          trait: { avoidance: 2 },
          reaction: "{name} pilih aman.",
          next: "final",
        },
      ],
    },
  }
}