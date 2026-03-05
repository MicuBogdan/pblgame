"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  time: number;
  createdAt: string;
  isDeleted: boolean;
}

interface LeaderboardProps {
  highlightScore?: number;
  onBack?: () => void;
}

export default function Leaderboard({ highlightScore, onBack }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Scene className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
              Clasament
            </p>
            <h1 className="font-display text-3xl text-[#1d1b16]">Podium</h1>
          </div>
          {onBack ? (
            <button
              onClick={onBack}
              className="rounded-2xl bg-[#1e6c62] px-6 py-2 text-white transition-colors hover:bg-[#195d55]"
            >
              ← Înapoi la joc
            </button>
          ) : (
            <Link
              href="/"
              className="rounded-2xl bg-[#1e6c62] px-6 py-2 text-white transition-colors hover:bg-[#195d55]"
            >
              ← Înapoi la joc
            </Link>
          )}
        </div>

        {highlightScore !== undefined && (
          <div className="card-reveal mb-6 rounded-3xl border border-[#d7c29b] bg-white/90 p-6 text-center shadow-[0_16px_50px_rgba(90,60,20,0.16)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
              Rezultat final
            </p>
            <h2 className="font-display text-2xl text-[#1d1b16]">
              Felicitări! 🎉
            </h2>
            <p className="mt-2 text-4xl font-semibold text-[#c75a1c]">
              {highlightScore}/14
            </p>
            <p className="mt-2 text-sm text-[#5a4a34]">
              Vezi poziția ta pe podium.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#1e6c62] border-t-transparent"></div>
          </div>
        ) : entries.length === 0 ? (
          <div className="card-reveal rounded-3xl border border-[#d7c29b] bg-[#fff7e2] p-10 text-center shadow-[0_18px_60px_rgba(90,60,20,0.16)]">
            <p className="text-lg text-[#4b3e2c]">
              Încă nu sunt înregistrări. Fii primul care joacă!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {entries[1] && (
                  <div className="card-reveal flex flex-col items-center rounded-3xl border border-[#d7c29b] bg-white/90 p-6 text-center shadow-[0_16px_40px_rgba(90,60,20,0.15)] md:translate-y-6">
                    <div className="text-4xl">🥈</div>
                    <h3 className="mt-3 font-display text-xl text-[#1d1b16]">
                      {entries[1].username}
                    </h3>
                    <p className="mt-2 text-3xl font-semibold text-[#1e6c62]">
                      {entries[1].score}/14
                    </p>
                    <p className="text-sm text-[#5a4a34]">
                      ⏱️ {formatTime(entries[1].time)}
                    </p>
                  </div>
                )}

                {entries[0] && (
                  <div className="card-reveal flex flex-col items-center rounded-3xl border border-[#f0c56a] bg-[#fff3d6] p-8 text-center shadow-[0_24px_60px_rgba(160,110,30,0.25)]">
                    <div className="text-4xl">🥇</div>
                    <h3 className="mt-3 font-display text-2xl text-[#1d1b16]">
                      {entries[0].username}
                    </h3>
                    <p className="mt-2 text-4xl font-semibold text-[#c75a1c]">
                      {entries[0].score}/14
                    </p>
                    <p className="text-sm text-[#5a4a34]">
                      ⏱️ {formatTime(entries[0].time)}
                    </p>
                  </div>
                )}

                {entries[2] && (
                  <div className="card-reveal flex flex-col items-center rounded-3xl border border-[#d7c29b] bg-white/90 p-6 text-center shadow-[0_16px_40px_rgba(90,60,20,0.15)] md:translate-y-4">
                    <div className="text-4xl">🥉</div>
                    <h3 className="mt-3 font-display text-xl text-[#1d1b16]">
                      {entries[2].username}
                    </h3>
                    <p className="mt-2 text-3xl font-semibold text-[#1e6c62]">
                      {entries[2].score}/14
                    </p>
                    <p className="text-sm text-[#5a4a34]">
                      ⏱️ {formatTime(entries[2].time)}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="card-reveal overflow-hidden rounded-3xl border border-[#d7c29b] bg-white/95 shadow-[0_20px_60px_rgba(90,60,20,0.2)]">
              <table className="w-full text-left">
                <thead className="bg-[#1e6c62] text-white">
                  <tr>
                    <th className="px-6 py-3">Rang</th>
                    <th className="px-6 py-3">Utilizator</th>
                    <th className="px-6 py-3 text-center">Scor</th>
                    <th className="px-6 py-3 text-center">Timp</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-t border-[#ead8b5] ${
                        index % 2 === 0 ? "bg-[#fff7e2]" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-[#1d1b16]">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 text-[#3f3526]">
                        {entry.username}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-[#c75a1c]">
                        {entry.score}/14
                      </td>
                      <td className="px-6 py-4 text-center text-[#5a4a34]">
                        {formatTime(entry.time)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Scene>
  );
}
