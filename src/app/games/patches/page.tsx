"use client";

import { games } from "../_data";
import { cn } from "cn";
import { useTimer } from "../_components/useTimer";

const mapa = Array.from({ length: 6 }).map(() =>
  Array.from<
    { type: "square" | "long" | "high" | "any"; size?: number } | undefined
  >({ length: 6 }),
);

mapa[2][2] = { type: "high" };
mapa[2][3] = { type: "square" };
mapa[3][1] = { type: "any", size: 8 };
mapa[3][4] = { type: "any", size: 4 };
mapa[4][0] = { type: "any", size: 4 };
mapa[4][5] = { type: "any", size: 8 };

export default function PatchesPage() {
  const { game, seconds, minutes } = useTimer();
  let squareIndex = 0;

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
        <table className="[&_td]:size-11 bg-white max-w-78 relative border border-hard-gray border-solid rounded-lg">
          <tbody>
            {mapa.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "p-1 border border-hard-gray border-dotted",
                      rowIndex === 0 && cellIndex === 0 && "rounded-tl-lg",
                      rowIndex === 0 && cellIndex === 5 && "rounded-tr-lg",
                      rowIndex === 5 && cellIndex === 0 && "rounded-bl-lg",
                      rowIndex === 5 && cellIndex === 5 && "rounded-br-lg",
                    )}
                  >
                    <div className="p-1 size-full flex items-center justify-center relative">
                      {cell && <Square {...cell} colorIndex={squareIndex++} />}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="flex gap-5 text-black items-center">
        <div className="flex flex-col items-center text-center leading-5 gap-3">
          <article className="relative flex items-center gap-3 w-fit">
            <table className="[&_td]:border [&_td]:border-hard-gray [&_td]:size-11 bg-white [&_td]:border-solid relative">
              <tbody>
                {[
                  [{ type: "square" as const, size: 4 }, null],
                  [null, null],
                ].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cn(
                          "p-1 border border-hard-gray border-dotted",
                          rowIndex === 0 && cellIndex === 0 && "rounded-tl-lg",
                          rowIndex === 0 && cellIndex === 5 && "rounded-tr-lg",
                          rowIndex === 5 && cellIndex === 0 && "rounded-bl-lg",
                          rowIndex === 5 && cellIndex === 5 && "rounded-br-lg",
                        )}
                      >
                        <div className="p-1 size-full flex items-center justify-center relative z-1">
                          {cell && (
                            <Square {...cell} colorIndex={squareIndex++} />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="absolute inset-1 size-[90%] pointer-events-none border-2 rounded-sm border-solid border-[#fda330] bg-[#fda330]/50" />
          </article>
        </div>
        <div className="flex flex-col items-center text-center leading-5 gap-3">
          <section className="grid grid-cols-[auto_1fr] gap-3 justify-items-center text-xs font-semibold">
            <Square type="square" colorIndex={7} />
            <p className="justify-self-start self-center">Cuadrado</p>
            <Square type="high" colorIndex={7} />
            <p className="justify-self-start self-center">
              Rectángulo vertical
            </p>
            <Square type="long" colorIndex={7} />
            <p className="justify-self-start self-center">
              Rectángulo horizontal
            </p>
            <div className="relative">
              <Square type="any" colorIndex={7} />
            </div>
            <p className="justify-self-start self-center">Cualquiera</p>
          </section>
        </div>
      </section>
    </main>
  );
}

const colors = [
  "bg-[#028c9c]", // Green
  "bg-[#7243ff]", // Purple
  "bg-[#d4b064]", // Yellow
  "bg-[#6bc7fc]", // Light Blue
  "bg-[#ef6961]", // Red
  "bg-[#f69766]", // Orange
  "bg-[#fda330]", // Dark Orange
  "bg-[#b9b9b5]", // Gray
];

function Square({
  type,
  size,
  colorIndex: index,
}: {
  type?: "square" | "long" | "high" | "any";
  size?: number;
  colorIndex: number;
}) {
  switch (type) {
    case "square":
      return (
        <div
          className={cn(
            "size-7 rounded-xs flex items-center justify-center text-white font-semibold",
            colors[index],
          )}
        >
          {size}
        </div>
      );
    case "long":
      return (
        <div
          className={cn(
            "h-5 w-7 rounded-xs flex items-center justify-center text-white font-semibold",
            colors[index],
          )}
        >
          {size}
        </div>
      );
    case "high":
      return (
        <div
          className={cn(
            "h-7 w-5 rounded-xs flex items-center justify-center text-white font-semibold",
            colors[index],
          )}
        >
          {size}
        </div>
      );
    case "any":
      return (
        <>
          <div
            className={cn(
              "relative z-1 h-5 w-7 rounded-xs flex items-center justify-center text-white font-semibold",
              colors[index],
            )}
          >
            {size}
          </div>
          <div
            className={cn(
              "inset-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-7 w-5 rounded-xs flex items-center justify-center text-white font-semibold",
              colors[index],
            )}
          />
        </>
      );
    default:
      return null;
  }
}
