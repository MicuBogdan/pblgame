"use client";

import { useState } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";
import { getOrCreateDeviceId } from "@/lib/deviceId";

interface UserEntry {
  id: string;
  username: string;
  score: number;
  time: number;
  createdAt: string;
  isDeleted: boolean;
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [resettingDevice, setResettingDevice] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "get-all",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setIsAuthenticated(true);
      } else {
        alert("Parolă incorectă");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Eroare la autentificare");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Sigur vrei să elimini acest utilizator?")) {
      try {
        const response = await fetch("/api/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            action: "delete-user",
            userId,
          }),
        });

        if (response.ok) {
          setUsers(users.filter((u) => u.id !== userId));
          alert("Utilizator eliminat cu succes");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Eroare la ștergere");
      }
    }
  };

  const handleResetCurrentDevice = async () => {
    if (
      !window.confirm(
        "Resetezi blocarea de joc pentru acest dispozitiv? Vei putea testa din nou jocul."
      )
    ) {
      return;
    }

    setResettingDevice(true);
    try {
      const deviceId = getOrCreateDeviceId();
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "reset-device-session",
          deviceId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Eroare la resetarea dispozitivului");
        return;
      }

      alert("Dispozitiv resetat. Acum poți porni jocul din nou.");
    } catch (error) {
      console.error("Error resetting device session:", error);
      alert("Eroare la resetarea dispozitivului");
    } finally {
      setResettingDevice(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  if (!isAuthenticated) {
    return (
      <Scene className="flex items-center justify-center p-6">
        <div className="card-reveal w-full max-w-md rounded-3xl border border-[#d7c29b] bg-[#fff7e2] p-8 shadow-[0_20px_80px_rgba(90,60,20,0.2)]">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
              Administrare
            </p>
            <h1 className="font-display text-3xl text-[#1d1b16]">
              Panel Administrator
            </h1>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Introdu parola de admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full rounded-2xl border border-[#d6c09a] bg-white px-4 py-3 text-[#1d1b16] shadow-sm focus:border-[#c75a1c] focus:outline-none"
            />
            <button
              onClick={handleLogin}
              disabled={!password || loading}
              className="w-full rounded-2xl bg-[#1e6c62] py-3 font-semibold text-white transition-colors hover:bg-[#195d55] disabled:cursor-not-allowed disabled:bg-[#9bb8b4]"
            >
              {loading ? "Se conectează..." : "Conectare"}
            </button>
            <Link
              href="/"
              className="block text-center text-sm font-semibold text-[#1e6c62] hover:text-[#195d55]"
            >
              ← Înapoi la joc
            </Link>
          </div>
        </div>
      </Scene>
    );
  }

  return (
    <Scene className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a2b]">
              Administrare
            </p>
            <h1 className="font-display text-3xl text-[#1d1b16]">
              Panel Administrator
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleResetCurrentDevice}
              disabled={resettingDevice}
              className="rounded-2xl bg-[#c75a1c] px-6 py-2 text-white transition-colors hover:bg-[#b24e17] disabled:cursor-not-allowed disabled:bg-[#d7b8a0]"
            >
              {resettingDevice ? "Se resetează..." : "Resetează dispozitivul curent"}
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
                setUsers([]);
              }}
              className="rounded-2xl bg-[#9b2c2c] px-6 py-2 text-white transition-colors hover:bg-[#842525]"
            >
              Ieșire
            </button>
            <Link
              href="/"
              className="rounded-2xl bg-[#1e6c62] px-6 py-2 text-white transition-colors hover:bg-[#195d55]"
            >
              ← Înapoi la joc
            </Link>
          </div>
        </div>

        <div className="card-reveal overflow-hidden rounded-3xl border border-[#d7c29b] bg-white/95 shadow-[0_20px_60px_rgba(90,60,20,0.2)]">
          <table className="w-full text-left">
            <thead className="bg-[#1e6c62] text-white">
              <tr>
                <th className="px-6 py-3">Utilizator</th>
                <th className="px-6 py-3 text-center">Scor</th>
                <th className="px-6 py-3 text-center">Timp</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Acțiune</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t border-[#ead8b5] ${
                    index % 2 === 0 ? "bg-[#fff7e2]" : "bg-white"
                  } ${user.isDeleted ? "opacity-60" : ""}`}
                >
                  <td className="px-6 py-4 text-[#3f3526]">{user.username}</td>
                  <td className="px-6 py-4 text-center font-semibold text-[#c75a1c]">
                    {user.score}/14
                  </td>
                  <td className="px-6 py-4 text-center text-[#5a4a34]">
                    {formatTime(user.time)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.isDeleted ? (
                      <span className="font-semibold text-[#9b2c2c]">
                        ELIMINAT
                      </span>
                    ) : (
                      <span className="font-semibold text-[#1e6c62]">ACTIV</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {!user.isDeleted && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-xl bg-[#9b2c2c] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#842525]"
                      >
                        Elimină
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-8 text-center text-[#5a4a34]">
              Nu sunt utilizatori înregistrați încă.
            </div>
          )}
        </div>
      </div>
    </Scene>
  );
}
