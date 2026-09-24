"use client";

import { useAlarmsContext } from "@/context/alarms-context";
import { formatTime } from "@/lib/time";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { gameLabel } from "../alarms/_data";
import { AnalogClock } from "./_components/analog-clock";

export default function AlarmPage() {
  const searchParams = useSearchParams();
  const { alarms } = useAlarmsContext();
  const [now, setNow] = useState<Date | null>(null);

  const alarm = alarms.find(({ id }) => id === searchParams.get("id"));

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const current = now
    ? formatTime(`${now.getHours()}:${now.getMinutes()}`)
    : null;

  return (
    <main className="py-6 pt-20 px-6 flex flex-col gap-6.25 items-center flex-1">
      <p className="text-sm text-gray-500 uppercase tracking-wide">Alarma</p>
      <h1 className="font-bold text-[42px] leading-none">
        {current ? `${current.time} ${current.period}` : "--:--"}
      </h1>
      <AnalogClock date={now} />
      <p className="text-xs text-gray-500">
        {alarm ? `Juego: ${gameLabel(alarm.game)}` : "La alarma elegida"}
      </p>
      <Link
        href={alarm?.game ? `/games/${alarm.game}` : "/games"}
        className="px-4 py-4 bg-primary-50 w-full text-white font-bold text-sm rounded-[14px] hover:bg-primary-100 active:bg-primary-200 text-center"
      >
        Empezar juego
      </Link>
      <Link
        href="/home"
        className="-mt-2 px-4 py-4 bg-[#EFEFEC] w-full font-bold text-sm rounded-[14px] border border-solid border-hard-gray hover:bg-[#D9D9D9] active:bg-[#C0C0C0] text-center"
      >
        Posponer
      </Link>
    </main>
  );
}
