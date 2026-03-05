import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { questions } from "@/lib/quizData";

interface SubmitAnswersRequest {
  deviceId: string;
  username: string;
  answers: { questionId: number; selectedIndex: number }[];
  timeSpent: number; // in seconds
}

export async function POST(request: NextRequest) {
  try {
    const {
      deviceId,
      username,
      answers,
      timeSpent,
    }: SubmitAnswersRequest = await request.json();

    if (!deviceId || !username || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if device has already played
    const existingSession = await prisma.gameSession.findUnique({
      where: { deviceId },
    });

    if (existingSession?.hasPlayed) {
      return NextResponse.json(
        { error: "This device has already played" },
        { status: 403 }
      );
    }

    // Calculate score
    let score = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswerIndex === answer.selectedIndex) {
        score++;
      }
    });

    // Check if username already exists
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (user && user.isDeleted) {
      return NextResponse.json(
        { error: "Username is not available" },
        { status: 400 }
      );
    }

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          username,
          score,
          time: timeSpent,
        },
      });
    } else {
      // Update existing user with better score or faster time
      if (score > user.score || (score === user.score && timeSpent < user.time)) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            score,
            time: timeSpent,
          },
        });
      }
    }

    // Create or update game session
    await prisma.gameSession.upsert({
      where: { deviceId },
      create: {
        deviceId,
        userId: user.id,
        hasPlayed: true,
      },
      update: {
        userId: user.id,
        hasPlayed: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        score,
        userId: user.id,
        username: user.username,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting answers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
