"use client";

import { usePathname } from "next/navigation";
import { games } from "../_data";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "cn";
import { useTimer } from "../_components/useTimer";

const colors = {
  purple: "bg-[#bba3e1]",
  orange: "bg-[#ffc992]",
  blue: "bg-[#98bcff]",
  green: "bg-[#b3dfa0]",
  gray: "bg-[#e0e0e0]",
  red: "bg-[#ff7b61]",
  yellow: "bg-[#e6f388]",
} as const;

const borders = {
  u: [true, false, false, false],
  r: [false, true, false, false],
  d: [false, false, true, false],
  l: [false, false, false, true],
  ur: [true, true, false, false],
  rd: [false, true, true, false],
  dl: [false, false, true, true],
  lu: [true, false, false, true],
  urd: [true, true, true, false],
  udl: [true, false, true, true],
  rdl: [false, true, true, true],
  dlu: [true, false, true, true],
  lur: [true, true, false, true],
  urdl: [true, true, true, true],
};

const mapa = Array.from({ length: 7 }).map(() =>
  Array.from<
    | {
        type?: "queen" | "x";
        color: keyof typeof colors;
        borders?: boolean[];
      }
    | undefined
  >({
    length: 7,
  }),
);

mapa[0][0] = {
  type: "queen",
  color: "purple",
};
mapa[0][1] = { type: "x", color: "purple" };
mapa[0][2] = { type: "x", color: "purple" };
mapa[0][3] = { type: "x", color: "purple" };
mapa[0][4] = { type: "x", color: "purple" };
mapa[0][5] = { type: "x", color: "purple" };
mapa[0][6] = { type: "x", color: "purple" };

mapa[1][0] = { type: "x", color: "purple" };
mapa[1][1] = { type: "x", color: "purple" };
mapa[1][2] = { type: "x", color: "orange", borders: [true, true, false, true] };
mapa[1][3] = { type: "x", color: "purple" };
mapa[1][4] = { type: "x", color: "blue", borders: [true, false, true, true] };
mapa[1][5] = {
  type: "queen",
  color: "blue",
  borders: [true, true, false, false],
};
mapa[1][6] = { type: "x", color: "purple" };

mapa[2][0] = { type: "x", color: "purple" };
mapa[2][1] = {
  type: "x",
  color: "orange",
  borders: [true, false, false, true],
};
mapa[2][2] = {
  type: "x",
  color: "orange",
  borders: [false, true, true, false],
};
mapa[2][3] = {
  type: "queen",
  color: "green",
  borders: [true, false, true, true],
};
mapa[2][4] = { type: "x", color: "green", borders: [true, true, false, false] };
mapa[2][5] = { type: "x", color: "blue", borders: [false, false, true, true] };
mapa[2][6] = { type: "x", color: "blue", borders: [true, false, false, false] };

mapa[3][0] = {
  type: "x",
  color: "purple",
  borders: [false, true, false, false],
};
mapa[3][1] = {
  type: "queen",
  color: "orange",
  borders: [false, true, true, true],
};
mapa[3][2] = { type: "x", color: "gray", borders: [true, false, true, true] };
mapa[3][3] = { type: "x", color: "gray", borders: [true, true, false, false] };
mapa[3][4] = { type: "x", color: "green", borders: borders.dl };
mapa[3][5] = { type: "x", color: "green", borders: borders.urd };
mapa[3][6] = { type: "x", color: "blue", borders: borders.l };

mapa[4][0] = { type: "x", color: "purple" };
mapa[4][1] = { type: "x", color: "purple" };
mapa[4][2] = { type: "x", color: "purple", borders: borders.urd };
mapa[4][3] = { type: "x", color: "gray", borders: borders.dl };
mapa[4][4] = { type: "queen", color: "gray", borders: borders.r };
mapa[4][5] = { type: "x", color: "blue", borders: borders.udl };
mapa[4][6] = { type: "x", color: "blue" };

mapa[5][0] = { type: "x", color: "purple" };
mapa[5][1] = { type: "x", color: "purple" };
mapa[5][2] = { type: "queen", color: "red", borders: borders.udl };
mapa[5][3] = { type: "x", color: "red", borders: borders.ur };
mapa[5][4] = { type: "x", color: "yellow", borders: borders.udl };
mapa[5][5] = { type: "x", color: "yellow", borders: borders.ur };
mapa[5][6] = { type: "x", color: "blue", borders: borders.d };

mapa[6][0] = { type: "x", color: "purple" };
mapa[6][1] = { type: "x", color: "purple" };
mapa[6][2] = { type: "x", color: "purple" };
mapa[6][3] = { type: "x", color: "red", borders: borders.l };
mapa[6][4] = { type: "x", color: "red", borders: borders.r };
mapa[6][5] = { type: "x", color: "yellow" };
mapa[6][6] = { type: "queen", color: "yellow" };

export default function QueensPage() {
  const { game, seconds, minutes } = useTimer();

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
      <div className="relative">
        <table className="bg-white max-w-90 relative border-2 border-black">
          <tbody>
            {mapa.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "border border-black size-11 border-solid",
                      cell?.borders?.[0] && "border-t-2",
                      cell?.borders?.[1] && "border-r-2",
                      cell?.borders?.[2] && "border-b-2",
                      cell?.borders?.[3] && "border-l-2",
                    )}
                  >
                    <div
                      className={cn(
                        "size-full flex items-center justify-center",
                        cell && colors[cell.color],
                      )}
                    >
                      {cell?.type === "queen" ? (
                        <Image
                          src="/icons/crown.png"
                          alt="Queen"
                          width={24}
                          height={24}
                        />
                      ) : cell?.type === "x" ? (
                        <X className="text-black size-2" />
                      ) : null}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="flex items-center gap-4">
        <button className="w-20.5 h-13 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center relative">
          <Image
            className="h-7.5"
            src="/icons/crown.png"
            alt="Queen"
            width={30}
            height={30}
          />
        </button>
        <button className="w-20.5 h-13 rounded-[11px] bg-primary-100 p-1 cursor-pointer hover:bg-primary-50 active:bg-primary-200 flex justify-center items-center">
          <X className="text-white size-8" strokeWidth={4} />
        </button>
      </section>
      <section>
        <h2 className="text-primary-50 text-[11px] font-bold">
          ¿Cómo se juega?
        </h2>
        <ol className="list-decimal pl-6 text-[11px]">
          <li>
            Tu objetivo es tener <b>exactamente una reina</b> en cada fila,
            columna y región con color.
          </li>
          <li>
            Selecciona para escoger una reina o una X. Usa la X para marcar
            donde no vaya una reina.
          </li>
          <li>Las reinas no pueden tocarse, ni siquiera en diagonal.</li>
        </ol>
      </section>
    </main>
  );
}
