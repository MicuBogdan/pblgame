import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { username, password, action, userId, deviceId } = await request.json();

    if (!ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Admin secret is not configured" },
        { status: 500 }
      );
    }

    // Check admin credentials
    if (password !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (action === "delete-user" && userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { isDeleted: true },
      });

      return NextResponse.json(
        { success: true, message: "User deleted from leaderboard" },
        { status: 200 }
      );
    }

    if (action === "get-all") {
      const allUsers = await prisma.user.findMany({
        orderBy: [{ score: "desc" }, { time: "asc" }],
      });

      return NextResponse.json(allUsers, { status: 200 });
    }

    if (action === "reset-device-session" && deviceId) {
      const session = await prisma.gameSession.findUnique({
        where: { deviceId },
      });

      if (!session) {
        return NextResponse.json(
          { success: true, message: "No session found for this device" },
          { status: 200 }
        );
      }

      await prisma.gameSession.update({
        where: { deviceId },
        data: { hasPlayed: false },
      });

      return NextResponse.json(
        { success: true, message: "Device session reset successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in admin action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
