"use client";

import { usePathname } from "next/navigation";
import { games } from "../_data";
import { useState, useEffect } from "react";
import { useTimer } from "../_components/useTimer";

const mapa = Array.from({ length: 6 }).map(() =>
  Array.from<number | undefined>({ length: 6 }),
);

mapa[3][2] = 1;
mapa[2][3] = 2;
mapa[3][4] = 3;
mapa[2][1] = 4;
mapa[4][0] = 5;
mapa[4][5] = 6;
mapa[1][0] = 7;
mapa[1][5] = 8;

export default function ZipPage() {
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
        <table className="[&_td]:border [&_td]:border-hard-gray [&_td]:size-11 bg-white [&_td]:border-dotted max-w-78 relative">
          <tbody>
            {mapa.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2">
                    {cell && (
                      <span className="rounded-full size-full flex items-center justify-center bg-black text-white text-lg font-semibold z-10 relative">
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <svg
          className="absolute inset-0 size-full pointer-events-none"
          width={482}
          height={482}
          viewBox="0 0 482 482"
        >
          <defs>
            <linearGradient
              id="line"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#0448d4"></stop>
              <stop offset="100%" stopColor="#b134af"></stop>
            </linearGradient>
          </defs>
          <polyline
            points="201,281 201,201 281,201 281,281 361,281 361,361 121,361 121,201 41,201 41,441 441,441 441,201 361,201 361,121 41,121 41,41 441,41 441,121"
            fill="none"
            stroke="url(#line)"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></polyline>
        </svg>
      </div>
      <section className="flex gap-3 text-black items-center">
        <div className="flex flex-col items-center text-center leading-5 gap-3">
          <article className="relative flex items-center gap-3 w-fit">
            <span className="rounded-full size-9 flex items-center justify-center bg-black text-white text-lg font-semibold border-6 border-[#2145cd] border-solid box-content">
              1
            </span>
            <span className="rounded-full size-9 flex items-center justify-center bg-black text-white text-lg font-semibold border-6 border-[#2145cd] border-solid box-content">
              2
            </span>
            <span className="rounded-full size-9 flex items-center justify-center bg-black text-white text-lg font-semibold border-6 border-[#2145cd] border-solid box-content">
              3
            </span>
            <hr className="border-12 border-[#2145cd] border-solid box-content absolute top-2.5 w-[80%] left-1 -z-1" />
          </article>
          <p>
            Conecta los <br />
            puntos en orden
          </p>
        </div>
        <div className="flex flex-col items-center text-center leading-5 gap-3">
          <article className="relative flex items-center gap-3 w-fit">
            <table className="[&_td]:border [&_td]:border-hard-gray [&_td]:size-4.5 bg-white [&_td]:border-solid relative">
              <tbody>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 3 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="p-2" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <svg
              className="absolute inset-0 size-full pointer-events-none"
              width={55}
              height={55}
              viewBox="0 0 55 55"
            >
              <polyline
                points="10,10 10,45 27.5,45 27.5,10 45,10 45,45"
                fill="none"
                stroke="#5e3ec1"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></polyline>
            </svg>
          </article>
          <p>
            Rellena todas <br />
            las celdas
          </p>
        </div>
      </section>
    </main>
  );
}
