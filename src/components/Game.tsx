"use client";

import { useEffect, useMemo, useState } from "react";
import Scene from "@/components/Scene";
import { churches, questions } from "@/lib/quizData";
import { getOrCreateDeviceId } from "@/lib/deviceId";

interface GameProps {
  onGameComplete?: (score: number) => void;
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
}

function getShuffledOptionIndexes(optionCount: number, seedKey: string): number[] {
  const indexes = Array.from({ length: optionCount }, (_, index) => index);
  const random = createSeededRandom(hashString(seedKey));

  for (let index = indexes.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(random() * (index + 1));
    [indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
  }

  return indexes;
}

export default function Game({ onGameComplete }: GameProps) {
  const [currentChurchIndex, setCurrentChurchIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: number; selectedIndex: number }[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [playerSeed, setPlayerSeed] = useState("");

  useEffect(() => {
    if (!gameStarted || !startTime) {
      return;
    }

    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, startTime]);

  const currentChurch = churches[currentChurchIndex];
  const churchQuestions = questions.filter(
    (q) => q.churchId === currentChurch.id
  );
  const currentQuestion = churchQuestions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const shuffledOptionIndexes = useMemo(
    () =>
      getShuffledOptionIndexes(
        currentQuestion.options.length,
        `${playerSeed}:${currentQuestion.id}`
      ),
    [currentQuestion.id, currentQuestion.options.length, playerSeed]
  );

  const handleStartGame = () => {
    if (username.trim()) {
      const deviceId = getOrCreateDeviceId();
      setPlayerSeed(`${deviceId}:${username.trim().toLowerCase()}`);
      setGameStarted(true);
      setStartTime(Date.now());
      setTimeSpent(0);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!answered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !answered) {
      const selectedOriginalIndex = shuffledOptionIndexes[selectedAnswer];
      setAnswered(true);
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          selectedIndex: selectedOriginalIndex,
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswered(false);

    if (currentQuestionIndex + 1 < churchQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentChurchIndex + 1 < churches.length) {
      setCurrentChurchIndex(currentChurchIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleGameComplete();
    }
  };

  const handleGameComplete = async () => {
    setSubmitting(true);
    try {
      const deviceId = getOrCreateDeviceId();
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          username,
          answers,
          timeSpent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Eroare la trimiterea quiz-ului");
        return;
      }

      const data = await response.json();
      onGameComplete?.(data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Eroare la trimiterea quiz-ului");
    } finally {
      setSubmitting(false);
    }
  };

  if (!gameStarted) {
    return (
      <Scene className="flex items-center justify-center p-6">
        <div className="card-reveal w-full max-w-lg rounded-3xl border border-[#d7c29b] bg-[#fff7e2] p-8 shadow-[0_20px_80px_rgba(90,60,20,0.2)]">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8a5a2b]">
              Trenul Revelației
            </p>
            <h1 className="font-display text-3xl text-[#1d1b16]">
              Jocul celor 7 Biserici
            </h1>
            <p className="mt-3 text-[#473a2a]">
              Pornește într-o călătorie prin cele 7 biserici, răspunde la
              întrebări și strânge puncte pentru podium.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Alege un username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c09a] bg-white px-4 py-3 text-[#1d1b16] shadow-sm focus:border-[#c75a1c] focus:outline-none"
              maxLength={20}
            />
            <button
              onClick={handleStartGame}
              disabled={!username.trim()}
              className="w-full rounded-2xl bg-[#1e6c62] py-3 font-semibold text-white transition-colors hover:bg-[#195d55] disabled:cursor-not-allowed disabled:bg-[#9bb8b4]"
            >
              Pornește călătoria
            </button>
          </div>
        </div>
      </Scene>
    );
  }

  const progress = (answers.length / totalQuestions) * 100;
  const totalSegments = Math.max(churches.length - 1, 1);
  const answeredInCurrentChurch = currentQuestionIndex + (answered ? 1 : 0);
  const inChurchProgress =
    currentChurchIndex < churches.length - 1
      ? answeredInCurrentChurch / Math.max(churchQuestions.length, 1)
      : 0;
  const segmentPosition = Math.min(
    currentChurchIndex + inChurchProgress,
    totalSegments
  );
  const trainProgress = (segmentPosition / totalSegments) * 100;
  const clampedProgress = Math.min(Math.max(trainProgress, 0), 100);
  const selectedOriginalIndex =
    selectedAnswer !== null ? shuffledOptionIndexes[selectedAnswer] : null;
  const isCorrect =
    answered && selectedOriginalIndex === currentQuestion.correctAnswerIndex;

  return (
    <Scene className="p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="card-reveal rounded-3xl border border-[#d7c29b] bg-[#fff7e2] p-6 shadow-[0_18px_60px_rgba(90,60,20,0.18)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
                Stația curentă
              </p>
              <h2 className="font-display text-2xl text-[#1d1b16]">
                {currentChurch.name}
              </h2>
              <p className="text-sm text-[#4b3e2c]">{currentChurch.location}</p>
              <p className="mt-2 text-sm text-[#5a4a34]">
                {currentChurch.description}
              </p>
              <p className="mt-1 text-xs text-[#8a5a2b]">
                {currentChurch.revelation}
              </p>
            </div>
            <div className="rounded-2xl border border-[#d7c29b] bg-white px-4 py-3 text-right shadow-sm">
              <p className="text-xs uppercase text-[#8a5a2b]">Timp</p>
              <p className="text-lg font-semibold text-[#1d1b16]">
                {Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative h-5 w-full rounded-full bg-[#e7d2a4]">
              <div
                className="h-5 rounded-full bg-[#1e6c62] transition-all duration-500"
                style={{ width: `${clampedProgress}%` }}
              ></div>
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                style={{
                  left: `clamp(0px, calc(${clampedProgress}% - 14px), calc(100% - 28px))`,
                }}
              >
                <span className="block scale-x-[-1] text-4xl leading-none">🚂</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[#5a4a34]">
              Intrebarea {currentQuestionIndex + 1}/{churchQuestions.length} ·
              Progres {answers.length}/{totalQuestions}
            </p>
          </div>

          <div className="relative mt-6">
            <div className="absolute left-3 right-3 top-3 h-1 rounded-full bg-[#8a5a2b]/30"></div>
            <div className="relative flex items-center justify-between gap-3">
              {churches.map((church, index) => {
                const isActive = index === currentChurchIndex;
                const isDone = index < currentChurchIndex;

                return (
                  <div key={church.id} className="flex flex-col items-center">
                    <span
                      className={`h-4 w-4 rounded-full border-2 ${
                        isDone
                          ? "border-[#1e6c62] bg-[#1e6c62]"
                          : isActive
                          ? "border-[#c75a1c] bg-[#f7b36b]"
                          : "border-[#8a5a2b] bg-[#fff7e2]"
                      }`}
                    ></span>
                    <span
                      className={`mt-2 text-[11px] ${
                        isActive ? "text-[#1d1b16]" : "text-[#6f5d44]"
                      }`}
                    >
                      {church.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card-reveal rounded-3xl border border-[#d7c29b] bg-white/90 p-8 shadow-[0_20px_60px_rgba(90,60,20,0.2)]">
          <h3 className="font-display text-xl text-[#1d1b16]">
            {currentQuestion.text}
          </h3>

          <div className="mt-6 space-y-3">
            {shuffledOptionIndexes.map((optionIndex, displayIndex) => (
              <button
                key={`${currentQuestion.id}-${optionIndex}`}
                onClick={() => handleAnswerSelect(displayIndex)}
                disabled={answered}
                className={`w-full rounded-2xl border px-4 py-3 text-left font-semibold transition-all ${
                  selectedAnswer === displayIndex
                    ? answered
                      ? isCorrect
                        ? "border-[#1e6c62] bg-[#1e6c62] text-white"
                        : "border-[#9b2c2c] bg-[#9b2c2c] text-white"
                      : "border-[#c75a1c] bg-[#f7b36b] text-[#1d1b16]"
                    : answered && optionIndex === currentQuestion.correctAnswerIndex
                    ? "border-[#1e6c62] bg-[#1e6c62] text-white"
                    : "border-[#e2cfaa] bg-white text-[#1d1b16] hover:border-[#c75a1c] hover:bg-[#fff2d3]"
                }`}
              >
                {currentQuestion.options[optionIndex]}
              </button>
            ))}
          </div>

          {!answered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="mt-6 w-full rounded-2xl bg-[#c75a1c] py-3 font-semibold text-white transition-colors hover:bg-[#b24e17] disabled:cursor-not-allowed disabled:bg-[#d7b8a0]"
            >
              Trimite răspunsul
            </button>
          )}

          {answered && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm font-semibold text-white ${
                isCorrect ? "bg-[#1e6c62]" : "bg-[#9b2c2c]"
              }`}
            >
              {isCorrect ? "✓ Corect!" : "✗ Incorect"}
            </div>
          )}

          {answered && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 w-full rounded-2xl bg-[#1e6c62] py-3 font-semibold text-white transition-colors hover:bg-[#195d55]"
            >
              {currentChurchIndex + 1 === churches.length &&
              currentQuestionIndex + 1 === churchQuestions.length
                ? "Finalizează jocul"
                : "Următoarea întrebare"}
            </button>
          )}
        </div>

        {submitting && (
          <div className="flex items-center justify-center gap-3 text-[#1d1b16]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1e6c62] border-t-transparent"></div>
            <span>Se trimite...</span>
          </div>
        )}
      </div>
    </Scene>
  );
}
