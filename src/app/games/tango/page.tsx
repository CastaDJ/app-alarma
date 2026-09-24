"use client";

import { usePathname } from "next/navigation";
import { games } from "../_data";
import { useState, useEffect } from "react";
import Image from "next/image";

const mapa = Array.from({ length: 6 }).map(() =>
  Array.from<"sun" | "moon" | undefined>({ length: 6 }),
);

mapa[0][3] = "sun";
mapa[0][4] = "sun";
mapa[1][4] = "sun";
mapa[2][3] = "sun";
mapa[3][5] = "moon";
mapa[4][0] = "sun";
mapa[5][5] = "moon";

export default function TangoPage() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCounter((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const game = usePathname().split("/").at(-1) ?? "";

  const seconds = counter % 60;
  const minutes = Math.floor(counter / 60);

  return (
    <main className="py-6 px-6 flex flex-col gap-6 items-center">
      <p className="text-xs text-gray-500 flex justify-between self-stretch">
        <span>{games[game].instructions}</span>
        <span className="text-black text-right">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      </p>
      <section className="flex justify-end w-full pr-[20%]">
        <button className="w-20.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0]">
          Pista
        </button>
      </section>
      <div className="relative pointer-events-none select-none">
        <table className="[&_td]:border [&_td]:border-hard-gray [&_td]:size-11 bg-white [&_td]:border-dotted max-w-78 relative">
          <tbody>
            {mapa.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-1">
                    {cell === "sun" ? (
                      <Image
                        src="/icons/sun.png"
                        alt="sun"
                        width={40}
                        height={40}
                      />
                    ) : cell === "moon" ? (
                      <Image
                        className="p-1"
                        src="/icons/moon.png"
                        alt="moon"
                        width={40}
                        height={40}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <span className="text-black text-lg font-bold absolute top-18.25 right-3.75">
          =
        </span>
        <span className="text-black text-lgl font-bold absolute top-2 left-31.5">
          ×
        </span>
        <span className="text-black text-lgl font-bold absolute bottom-8 left-4">
          ×
        </span>
      </div>
      <section className="flex items-center gap-4">
        <button className="w-20.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center">
          <Image src="/icons/sun.png" alt="sun" width={40} height={40} />
        </button>
        <button className="w-20.5 rounded-[11px] bg-primary-100 p-1 cursor-pointer hover:bg-primary-50 active:bg-primary-200 flex justify-center">
          <Image
            className="p-1"
            src="/icons/moon.png"
            alt="moon"
            width={40}
            height={40}
          />
        </button>
      </section>
      <section>
        <h2 className="text-primary-50 text-[11px] font-bold">
          ¿Cómo se juega?
        </h2>
        <ul className="list-disc pl-6 text-[11px]">
          <li>
            Rellena la cuadrícula de modo que cada celda contenga ☀️ o 🌙.
          </li>
          <li>
            No puede haber más de dos ☀️ o 🌙 juntos, ni en vertical ni en
            horizontal.
          </li>
          <li>Cada fila y columna deben tener el mismo número de ☀️ y 🌙.</li>
          <li>Las celdas separadas por = deben ser del mismo tipo.</li>
          <li>Las celdas separadas por × deben ser de distinto tipo</li>
        </ul>
      </section>
    </main>
  );
}
