"use client";

import { useAlarmsContext } from "@/context/alarms-context";
import { formatTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { AlarmClock } from "lucide-react";
import Link from "next/link";
import { gameLabel } from "../../alarms/_data";

const createLinkClassName =
  "mt-2 px-4 py-4 bg-primary-50 w-full text-white font-bold text-sm rounded-[14px] hover:bg-primary-100 active:bg-primary-200 text-center";

export function AlarmList() {
  const { alarms, toggleAlarm } = useAlarmsContext();

  if (alarms.length === 0) {
    return (
      <main className="py-6 px-6 flex flex-col gap-4 items-center justify-center flex-1">
        <AlarmClock className="size-16" strokeWidth={1.25} />
        <h1 className="font-bold text-xl text-center">Crea tu primera alarma</h1>
        <p className="text-sm text-gray-500 text-center max-w-56">
          Oprime el botón de abajo para crear tu primera alarma
        </p>
        <Link href="/alarms/new" className={createLinkClassName}>
          Crear alarma
        </Link>
      </main>
    );
  }

  return (
    <main className="py-6 px-6 flex flex-col gap-4 flex-1">
      <h1 className="font-bold text-[22px] text-primary-50">Tus alarmas</h1>
      <ul className="flex flex-col gap-3">
        {alarms.map((alarm) => {
          const { time, period } = formatTime(alarm.time);
          return (
            <li
              key={alarm.id}
              className={cn(
                "flex items-center justify-between rounded-[14px] border border-solid border-hard-gray p-4",
                alarm.active ? "bg-primary-100/40" : "bg-[#EFEFEC]",
              )}
            >
              <Link href={`/alarm?id=${alarm.id}`} className="flex-1">
                <p
                  className={cn(
                    "font-bold text-3xl",
                    !alarm.active && "text-gray-500",
                  )}
                >
                  {time} <span className="text-base font-normal">{period}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {alarm.repeat} · {gameLabel(alarm.game)}
                </p>
              </Link>
              <button
                role="switch"
                aria-checked={alarm.active}
                aria-label="Activar alarma"
                onClick={() => toggleAlarm(alarm.id)}
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors cursor-pointer",
                  alarm.active ? "bg-primary-50" : "bg-hard-gray",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 size-5 rounded-full bg-white transition-transform",
                    alarm.active && "translate-x-5",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex-1" />
      <Link href="/alarms/new" className={cn(createLinkClassName, "mb-5")}>
        Crear alarma
      </Link>
    </main>
  );
}
