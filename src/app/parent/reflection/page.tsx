"use client"

import { useState } from "react"
import { scenarios } from "@/lib/scenarios"
import { calculateResult, getPersonality } from "@/lib/engine"

export default function ReflectionPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])

  const handleAnswer = (option: any) => {
    setAnswers((prev) => [...prev, option])
    setStep((prev) => prev + 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl">

        {/* SCENARIO */}
        {step < scenarios.length && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">
              {scenarios[step].question}
            </h2>

            <div className="grid gap-3">
              {scenarios[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="p-4 border rounded-lg hover:bg-gray-100 transition text-left"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {step >= scenarios.length && (
          <div className="text-center space-y-4">
            {(() => {
              const score = calculateResult(answers)
              const result = getPersonality(score)

              return (
                <>
                  <h2 className="text-2xl font-bold">{result.title}</h2>
                  <p className="text-gray-600">{result.desc}</p>

                  <button
                    onClick={reset}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                  >
                    Ulangi
                  </button>
                </>
              )
            })()}
          </div>
        )}

      </div>
    </div>
  )
}