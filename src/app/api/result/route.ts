import { NextResponse } from "next/server"
import { getFinalInsight } from "@/lib/engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { state, name, history } = body

    const result = getFinalInsight(state, name, history)

    return NextResponse.json({ result })
  } catch (error) {
    console.error("API RESULT ERROR:", error)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}