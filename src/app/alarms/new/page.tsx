"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlarmsContext } from "@/context/alarms-context";
import { formatTime } from "@/lib/time";
import { ArrowLeft, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OptionRow } from "../_components/option-row";
import {
  gameLabel,
  gameOptions,
  repeatOptions,
  soundOptions,
} from "../_data";

const toOptions = (values: string[]) =>
  values.map((value) => ({ value, label: value }));

export default function NewAlarmPage() {
  const router = useRouter();
  const { addAlarm } = useAlarmsContext();
  const [time, setTime] = useState("19:00");
  const [repeat, setRepeat] = useState(repeatOptions[0]);
  const [sound, setSound] = useState(soundOptions[0]);
  const [vibration, setVibration] = useState(true);
  const [game, setGame] = useState<string | null>(null);

  const formatted = formatTime(time);

  function handleSave() {
    addAlarm({ time, repeat, sound, vibration, game });
    router.push("/home");
  }

  return (
    <>
      <header className="w-full relative p-6 font-bold flex items-center justify-between">
        <Link
          href="/home"
          aria-label="Volver"
          className="p-2 -ml-2 text-black hover:bg-[#C0C0C0] active:bg-[#A0A0A0] rounded-lg"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-[22px] text-primary-50 text-center">
          Nueva alarma
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="p-2 -mr-2 text-black hover:bg-[#C0C0C0] active:bg-[#A0A0A0] rounded-lg">
                <Ellipsis className="size-5" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-auto">
            <DropdownMenuItem>
              <Link href="/home">Descartar alarma</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="pb-6 px-6 flex flex-col items-center flex-1">
        <label className="relative w-full rounded-[14px] bg-primary-100/40 py-8 flex flex-col items-center gap-2 cursor-pointer">
          <span className="font-bold text-5xl">{formatted.time}</span>
          <span className="text-2xl">{formatted.period}</span>
          <input
            type="time"
            value={time}
            onChange={(event) => event.target.value && setTime(event.target.value)}
            onClick={(event) => event.currentTarget.showPicker?.()}
            aria-label="Hora de la alarma"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>

        <section className="w-full mt-4">
          <OptionRow
            label="Repetir"
            value={repeat}
            display={repeat}
            options={toOptions(repeatOptions)}
            onChange={setRepeat}
          />
          <OptionRow
            label="Sonido"
            value={sound}
            display={sound}
            options={toOptions(soundOptions)}
            onChange={setSound}
          />
          <OptionRow
            label="Vibración"
            value={vibration ? "on" : "off"}
            display={vibration ? "Activada" : "Desactivada"}
            options={[
              { value: "on", label: "Activada" },
              { value: "off", label: "Desactivada" },
            ]}
            onChange={(value) => setVibration(value === "on")}
          />
          <OptionRow
            label="Juego para apagar"
            value={game ?? "random"}
            display={game ? gameLabel(game) : "Elegir"}
            options={[{ value: "random", label: "Aleatorio" }, ...gameOptions]}
            onChange={(value) => setGame(value === "random" ? null : value)}
          />
        </section>

        <p className="text-xs text-gray-500 self-start mt-4">
          Podrás editarla cuando quieras
        </p>

        <div className="flex-1" />

        <button
          onClick={handleSave}
          className="mt-6 mb-5 px-4 py-4 bg-primary-50 w-full text-white font-bold text-sm rounded-[14px] cursor-pointer hover:bg-primary-100 active:bg-primary-200"
        >
          Guardar alarma
        </button>
      </main>
    </>
  );
}
