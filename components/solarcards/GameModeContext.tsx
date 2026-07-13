"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { GameModeId } from "@/data/solarcards-rules";

const STORAGE_KEY = "solarcards-battle-mode";

interface GameModeContextValue {
  mode: GameModeId;
  setMode: (mode: GameModeId) => void;
}

const GameModeContext = createContext<GameModeContextValue | null>(null);

export function GameModeProvider({ children }: { children: ReactNode }) {
  // Star Battle is the recommended first game, so it is the default.
  const [mode, setModeState] = useState<GameModeId>("star");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === "star" || saved === "galaxy") setModeState(saved);
  }, []);

  const setMode = (next: GameModeId) => {
    setModeState(next);
    sessionStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <GameModeContext.Provider value={{ mode, setMode }}>
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode(): GameModeContextValue {
  const ctx = useContext(GameModeContext);
  if (!ctx) throw new Error("useGameMode requires a GameModeProvider ancestor");
  return ctx;
}
