import { NextResponse } from "next/server"
import { getScenarios } from "@/lib/scenarios"
import { injectName } from "@/lib/parser"

export async function POST(req: Request) {
  const body = await req.json()
  const { currentId, name, age } = body

  const scenarios = getScenarios(age)
  const scenario = scenarios[currentId as keyof typeof scenarios]

  if (!scenario) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    ...scenario,
    question: injectName(scenario.question, name),
    options: scenario.options.map((opt) => ({
      ...opt,
      text: injectName(opt.text, name),
      reaction: injectName(opt.reaction, name),
    })),
  })
}