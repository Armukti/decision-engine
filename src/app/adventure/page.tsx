"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getScenarios } from "@/lib/scenarios"

export default function AdventurePage() {
  const params = useSearchParams()

  const name = params.get("name") || "Anak"
  const age = Number(params.get("age") || 10)

  const scenarios = getScenarios(age)

  const [currentId, setCurrentId] = useState("start")
  const [scenario, setScenario] = useState<any>(null)
  const [state, setState] = useState<any>({})
  const [history, setHistory] = useState<any[]>([])
  const [reaction, setReaction] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  // 🔄 Load scenario
  useEffect(() => {
    const sc = scenarios[currentId]
    if (!sc) return

    const inject = (text: string) =>
      text?.replaceAll("{name}", name)

    setScenario({
      ...sc,
      question: inject(sc.question),
      options: sc.options?.map((opt: any) => ({
        ...opt,
        text: inject(opt.text),
        reaction: inject(opt.reaction),
      })),
    })
  }, [currentId, name])

  // 🎯 Handle pilihan
  const handleAnswer = async (opt: any) => {
    const newState = { ...state }

    Object.entries(opt.trait || {}).forEach(([k, v]) => {
      newState[k] = (newState[k] || 0) + (v as number)
    })

    const newHistory = [
      ...history,
      {
        question: scenario.question,
        choice: opt.text,
        trait: opt.trait,
      },
    ]

    setHistory(newHistory)
    setState(newState)
    setReaction(opt.reaction)

    setTimeout(async () => {
      setReaction(null)

      if (opt.next === "final") {
        const res = await fetch("/api/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: newState,
            name,
            history: newHistory,
          }),
        })

        const data = await res.json()
        setResult(data.result)
      } else {
        setCurrentId(opt.next)
      }
    }, 1200)
  }

  // 🎬 RESULT SCREEN
  if (result) {
    const traitMap: any = {
      avoidance: {
        label: "Cenderung Menghindari Risiko",
        desc: "Lebih memilih aman daripada mengambil risiko",
      },
      courage: {
        label: "Keberanian",
        desc: "Berani mengambil langkah walau belum pasti",
      },
      empathy: {
        label: "Kepedulian",
        desc: "Memperhatikan perasaan orang lain",
      },
      logic: {
        label: "Pemikiran Logis",
        desc: "Suka mempertimbangkan sebelum bertindak",
      },
      social: {
        label: "Sosial",
        desc: "Nyaman berinteraksi dengan orang lain",
      },
      leadership: {
        label: "Inisiatif Memimpin",
        desc: "Cenderung mengajak dan mengarahkan",
      },
      balance: {
        label: "Keseimbangan",
        desc: "Berusaha membagi waktu dan prioritas",
      },
      caution: {
        label: "Kehati-hatian",
        desc: "Berpikir sebelum bertindak",
      },
      impulsive: {
        label: "Spontan",
        desc: "Cepat bertindak tanpa banyak pertimbangan",
      },
      resilience: {
        label: "Daya Tahan",
        desc: "Mampu bangkit saat menghadapi kesulitan",
      },
      emotional: {
        label: "Emosional",
        desc: "Mudah terbawa perasaan",
      },
      chill: {
        label: "Santai",
        desc: "Cenderung tidak terlalu terbebani",
      },
      neutral: {
        label: "Netral",
        desc: "Tidak terlalu condong ke arah tertentu",
      },
    }

    return (
      <div className="flex items-center justify-center min-h-screen px-6 bg-black text-white">
        <div className="max-w-md w-full space-y-6 text-center">

          <h2 className="text-3xl font-bold">
            {result.title}
          </h2>

          <p className="text-gray-300">
            {result.story}
          </p>

          <p className="text-sm text-gray-500 italic">
            {result.twist}
          </p>

          <p className="text-sm text-blue-400">
            {result.future}
          </p>

          {/* 📊 SCORING */}
          <div className="mt-6 text-left bg-white text-black rounded-lg p-4 space-y-3">
            <h3 className="font-bold text-lg">
              Kenapa hasilnya seperti ini?
            </h3>

            {result.scoring?.map(([trait, value]: any, i: number) => {
              const item = traitMap[trait] || {
                label: trait,
                desc: "-",
              }

              return (
                <div
                  key={i}
                  className={`border-b pb-2 ${
                    i === 0 ? "bg-yellow-100 rounded p-2" : ""
                  }`}
                >
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{item.label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.desc}
                  </div>
                </div>
              )
            })}

            <div className="text-xs text-gray-500 pt-2">
              Skor tertinggi menunjukkan kecenderungan yang paling sering muncul.
            </div>
          </div>

          {/* 🧠 MOMENTS */}
          <div className="mt-4 text-left bg-white text-black rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-lg">
              Momen yang mempengaruhi
            </h3>

            {result.keyMoments?.map((m: any, i: number) => (
              <div key={i} className="text-sm border-b pb-2">
                <div className="font-medium">{m.question}</div>
                <div className="text-gray-600">→ {m.choice}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentId("start")
              setState({})
              setHistory([])
              setResult(null)
            }}
            className="mt-6 px-5 py-2 bg-white text-black rounded-lg"
          >
            Ulangi Cerita
          </button>

        </div>
      </div>
    )
  }

  // 🛡️ ANTI ERROR
  if (!scenario || !scenario.options) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading cerita...</div>
      </div>
    )
  }

  // 🎮 GAME
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-xl w-full space-y-6">

        <h2 className="text-xl text-center">
          {scenario.question}
        </h2>

        {reaction && (
          <div className="text-center text-sm text-gray-500 animate-pulse">
            {reaction}
          </div>
        )}

        <div className="space-y-3">
          {scenario.options.map((opt: any, i: number) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full border p-4 rounded-lg text-left hover:bg-gray-100"
            >
              {opt.text}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}