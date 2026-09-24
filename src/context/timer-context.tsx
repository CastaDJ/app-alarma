"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { usePathname } from "next/navigation";

const TimerContextR = createContext<{
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function TimerContext({ children }: PropsWithChildren) {
  const [counter, setCounter] = useState(0);

  return (
    <TimerContextR.Provider value={{ counter, setCounter }}>
      {children}
    </TimerContextR.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContextR);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerContext");
  }
  return context;
}
