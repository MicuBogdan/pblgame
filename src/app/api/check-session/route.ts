import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();

    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    const session = await prisma.gameSession.findUnique({
      where: { deviceId },
    });

    if (session && session.hasPlayed) {
      return NextResponse.json(
        { hasPlayed: true, userId: session.userId },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        hasPlayed: false,
        deviceId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking game session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
