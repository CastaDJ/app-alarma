import { useTimerContext } from "@/context/timer-context";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

export function useTimer() {
  const { setCounter: setTimer } = useTimerContext();
  const [counter, setCounter] = useState(0);

  const saveToContext = useEffectEvent(() => {
    setTimer(counter);
  });

  useEffect(() => {
    const interval = setInterval(() => setCounter((prev) => prev + 1), 1000);
    return () => {
      clearInterval(interval);
      saveToContext();
    };
  }, []);

  const game = usePathname().split("/").at(-1) ?? "";

  const seconds = counter % 60;
  const minutes = Math.floor(counter / 60);

  return { game, seconds, minutes };
}
