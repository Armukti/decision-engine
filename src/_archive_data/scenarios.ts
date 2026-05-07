export const scenarios = [
  // 🧠 AWARENESS
  {
    id: 1,
    type: "social",
    text: "Temanmu terlihat sedih saat istirahat. Apa yang kamu lakukan?",
    options: [
      {
        text: "Menghampiri dan bertanya pelan 'kamu kenapa?'",
        trait: "Empathy",
      },
      {
        text: "Melihat sebentar lalu pergi",
        trait: "Avoidance",
      },
      {
        text: "Bercanda tentang dia supaya terlihat lucu",
        trait: "Dominance",
      },
    ],
  },

  {
    id: 2,
    type: "social",
    text: "Kamu melihat temanmu tidak diajak bermain. Apa yang kamu lakukan?",
    options: [
      {
        text: "Mengajak dia ikut bermain",
        trait: "Empathy",
      },
      {
        text: "Tetap bermain dengan kelompokmu saja",
        trait: "Avoidance",
      },
      {
        text: "Ikut mengabaikannya",
        trait: "Dominance",
      },
    ],
  },

  // 🧠 AGENCY
  {
    id: 3,
    type: "decision",
    text: "Kamu ingin mencoba hal baru tapi temanmu tidak mau. Apa yang kamu lakukan?",
    options: [
      {
        text: "Tetap mencoba sendiri",
        trait: "Responsibility",
      },
      {
        text: "Mengikuti teman saja",
        trait: "Avoidance",
      },
      {
        text: "Memaksa teman ikut",
        trait: "Dominance",
      },
    ],
  },

  {
    id: 4,
    type: "decision",
    text: "Kamu diberi pilihan oleh orang tua. Apa yang kamu lakukan?",
    options: [
      {
        text: "Memilih sendiri setelah berpikir",
        trait: "Responsibility",
      },
      {
        text: "Menunggu dipilihkan",
        trait: "Avoidance",
      },
      {
        text: "Memilih asal tanpa pikir panjang",
        trait: "Dominance",
      },
    ],
  },

  // 🧠 BOUNDARY
  {
    id: 5,
    type: "boundary",
    text: "Temanmu meminta barangmu tanpa izin. Apa yang kamu lakukan?",
    options: [
      {
        text: "Menolak dengan sopan",
        trait: "Avoidance",
      },
      {
        text: "Membiarkan saja",
        trait: "Boundary",
      },
      {
        text: "Marah dan merebut kembali",
        trait: "Dominance",
      },
    ],
  },

  {
    id: 6,
    type: "boundary",
    text: "Teman mengajak melakukan sesuatu yang kamu tidak suka. Apa yang kamu lakukan?",
    options: [
      {
        text: "Bilang tidak dengan tenang",
        trait: "Boundary",
      },
      {
        text: "Ikut saja supaya tidak berbeda",
        trait: "Avoidance",
      },
      {
        text: "Menyuruh teman berhenti dengan keras",
        trait: "Dominance",
      },
    ],
  },

  // 💰 FINANCIAL
  {
    id: 7,
    type: "financial",
    text: "Kamu punya uang jajan lebih hari ini. Apa yang kamu lakukan?",
    options: [
      {
        text: "Menyimpan sebagian untuk nanti",
        trait: "Saving",
      },
      {
        text: "Menghabiskan semuanya",
        trait: "Spending",
      },
      {
        text: "Mengambil lebih dari yang seharusnya",
        trait: "Greedy",
      },
    ],
  },

  {
    id: 8,
    type: "financial",
    text: "Kamu ingin membeli sesuatu tapi uangmu kurang. Apa yang kamu lakukan?",
    options: [
      {
        text: "Menabung sampai cukup",
        trait: "Saving",
      },
      {
        text: "Meminta tambahan terus",
        trait: "Spending",
      },
      {
        text: "Mengambil tanpa izin",
        trait: "Greedy",
      },
    ],
  },
];