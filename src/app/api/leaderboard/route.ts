import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const leaderboard = await prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: [{ score: "desc" }, { time: "asc" }],
      take: 100,
    });

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
