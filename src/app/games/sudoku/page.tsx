"use client";

import { usePathname } from "next/navigation";
import { games } from "../_data";
import { useState, useEffect } from "react";
import { cn } from "cn";
import { RotateCcw, X } from "lucide-react";
import { useTimer } from "../_components/useTimer";

const mapa = [
  [4, 2, 6, 5, 3, 1],
  [5, 3, 1, 2, 6, 4],
  [1, 4, 5, 3, 2, 6],
  [3, 6, 2, 1, 4, 5],
  [6, 1, 3, 4, 5, 2],
  [2, 5, 4, 6, 1, null],
];

export default function SudokuPage() {
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
      <div className="relative pointer-events-none select-none">
        <table className="[&_td]:size-11 bg-white [&_td]:border-solid max-w-78 relative">
          <tbody>
            {mapa.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "p-1 border border-hard-gray",
                      cellIndex === 2 && "border-r-2 border-r-neutral-500",
                      cellIndex === 0 && "border-l-2 border-l-neutral-500",
                      cellIndex === 5 && "border-r-2 border-r-neutral-500",
                      rowIndex === 0 && "border-t-2 border-t-neutral-500",
                      rowIndex === 1 && "border-b-2 border-b-neutral-500",
                      rowIndex === 3 && "border-b-2 border-b-neutral-500",
                      rowIndex === 5 && "border-b-2 border-b-neutral-500",
                      cellIndex === 5 &&
                        rowIndex === 5 &&
                        "p-0 border-3 border-green-800",
                    )}
                  >
                    <span className="rounded-full size-full flex items-center justify-center text-neutral-400 text-lg z-10 relative">
                      {cell}
                      {cellIndex === 5 && rowIndex === 5 && (
                        <span className="size-full bg-green-300/20" />
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="grid grid-cols-4 gap-x-4 gap-y-6 items-center *:h-9">
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          1
        </button>
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          2
        </button>
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          3
        </button>
        <button className="w-15.5 rounded-[11px] bg-primary-100 p-1 cursor-pointer hover:bg-primary-50 active:bg-primary-200 flex justify-center items-center">
          <X className="text-primary-50 size-6" strokeWidth={4} />
        </button>
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          4
        </button>
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          5
        </button>
        <button className="w-15.5 rounded-[11px] bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#C0C0C0] active:bg-[#A0A0A0] flex justify-center items-center">
          6
        </button>
        <button className="w-15.5 rounded-[11px] bg-primary-100 p-2 cursor-pointer hover:bg-primary-50 active:bg-primary-200 flex justify-center items-center">
          <RotateCcw className="text-primary-50 size-5" strokeWidth={4} />
        </button>
      </section>
    </main>
  );
}
