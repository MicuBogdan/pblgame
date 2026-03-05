"use client";

import { useEffect, useState } from "react";
import Game from "@/components/Game";
import Leaderboard from "@/components/Leaderboard";
import Scene from "@/components/Scene";
import { getOrCreateDeviceId } from "@/lib/deviceId";

type View = "menu" | "game" | "leaderboard";

export default function Home() {
  const [view, setView] = useState<View>("menu");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameScore, setGameScore] = useState<number | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const deviceId = getOrCreateDeviceId();
        const response = await fetch("/api/check-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId }),
        });

        if (response.ok) {
          const data = await response.json();
          setHasPlayed(data.hasPlayed);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setView("leaderboard");
  };

  if (loading) {
    return (
      <Scene className="flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#1e6c62] border-t-transparent"></div>
      </Scene>
    );
  }

  if (view === "game") {
    return <Game onGameComplete={handleGameComplete} />;
  }

  if (view === "leaderboard") {
    return (
      <Leaderboard
        highlightScore={gameScore ?? undefined}
        onBack={() => setView("menu")}
      />
    );
  }

  return (
    <Scene className="flex items-center justify-center p-6">
      <div className="card-reveal w-full max-w-2xl rounded-3xl border border-[#d7c29b] bg-[#fff7e2] p-10 text-center shadow-[0_20px_80px_rgba(90,60,20,0.2)]">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
            Trenul Revelatiei
          </p>
          <h1 className="font-display text-4xl text-[#1d1b16]">
            Bun venit! 👋
          </h1>
          <p className="mt-3 text-lg text-[#4b3e2c]">
            Jocul celor 7 Biserici din Apocalipsa
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2cfaa] bg-white/80 p-6 text-left">
          <p className="text-[#3f3526]">
            Urmeaza traseul in ordine cronologica, opreste-te in fiecare statie
            si raspunde la intrebari. Scorul maxim si timpul cel mai bun te urca
            pe podium.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          {!hasPlayed && (
            <button
              onClick={() => setView("game")}
              className="w-full rounded-2xl bg-[#1e6c62] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#195d55]"
            >
              Incepe calatoria
            </button>
          )}
          <button
            onClick={() => setView("leaderboard")}
            className="w-full rounded-2xl bg-[#c75a1c] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#b24e17]"
          >
            Vezi podiumul 🏆
          </button>
        </div>
      </div>
    </Scene>
  );
}
