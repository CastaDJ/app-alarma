"use client";

import { useTimerContext } from "@/context/timer-context";
import { Check } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { games } from "../games/_data";
import Link from "next/link";

export default function WinnerPage() {
  const searchParams = useSearchParams();

  const game = searchParams.get("game");

  const { counter } = useTimerContext();

  const seconds = counter % 60;
  const minutes = Math.floor(counter / 60);

  return (
    <main className="py-6 pt-20 px-6 flex flex-col gap-6.25 items-center">
      <div className="relative size-65.5 rounded-full overflow-hidden">
        <Image src="/celebrate.jpg" alt="Winner" fill />
      </div>
      <Check className="size-12" />
      <h1 className="font-bold text-[42px]">¡Buen trabajo!</h1>
      <p className="text-center text-gray-500">
        Espero la hayas pasado muy bien con <br /> tu juego
      </p>
      <section className="flex justify-between w-full mt-10">
        <p className="font-semibold text-xs">{games[game ?? ""].name}</p>
        <p className="text-xs text-gray-500">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </section>
      <Link
        href="/"
        className="mt-6.25 px-4 py-4 bg-primary-50 w-full text-white rounded-[14px] hover:bg-primary-100 active:bg-primary-200 text-center"
      >
        Listo
      </Link>
    </main>
  );
}
