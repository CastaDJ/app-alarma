"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@base-ui/react";
import { games } from "../_data";
import { cn } from "cn";

const options = Object.entries(games).filter(([key]) => key !== "rulette");
const segmentAngle = 360 / options.length;
const colors = ["#c94048", "#3fbe85", "#993095", "#fcb64c", "#54bce8"];

export function Roulette() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const pendingIndex = useRef(0);
  const router = useRouter();

  const conicGradient = `conic-gradient(${options
    .map(
      (_, i) =>
        `${colors[i % colors.length]} ${i * segmentAngle}deg ${
          (i + 1) * segmentAngle
        }deg`,
    )
    .join(", ")})`;

  function handleSpin() {
    if (spinning) return;

    const index = Math.floor(Math.random() * options.length);
    const centerAngle = index * segmentAngle + segmentAngle / 2;
    const targetMod = (360 - centerAngle) % 360;
    const currentMod = rotation % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;

    pendingIndex.current = index;
    setResult(null);
    setSpinning(true);
    setRotation((prev) => prev + 5 * 360 + delta);
  }

  function handleTransitionEnd() {
    if (!spinning) return;
    setSpinning(false);
    const [id, value] = options[pendingIndex.current];

    setResult(value.name);

    setTimeout(() => {
      router.push(`/games/${id}`);
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center gap-6.25 w-full flex-1">
      <div className="relative w-64 h-64">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-primary-200" />
        <div
          className="relative w-64 h-64 rounded-full border-4 border-white"
          style={{
            background: conicGradient,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4s cubic-bezier(0.17, 0.67, 0.2, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {options.map(([key, game], i) => (
            <div
              key={key}
              className="absolute inset-0 flex justify-center"
              style={{
                transform: `rotate(${i * segmentAngle + segmentAngle / 2}deg)`,
              }}
            >
              <span className="mt-3 text-xs font-bold text-white text-center w-16 uppercase">
                {game.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <p className="text-xs text-center text-gray-500">Juego seleccionado</p>
        <p className="font-bold uppercase rounded-full border-hard-gray bg-[#efefec] border border-solid text-center p-2 mt-3">
          {result ?? "???"}
        </p>
      </section>

      <Button
        onClick={handleSpin}
        disabled={spinning || !!result}
        className="px-4 py-4 bg-primary-50 w-full text-white rounded-[14px] not-disabled:hover:bg-primary-100 not-disabled:active:bg-primary-200 text-center disabled:opacity-50"
      >
        {spinning ? "Girando..." : "Girar ruleta"}
      </Button>

      <div className="flex-1" />

      <section className="flex gap-2 justify-between text-xs w-full mb-5">
        <p className="text-xs text-center text-gray-500">Dificultad</p>
        <p className="text-right font-bold text-primary-50">Fácil</p>
      </section>
    </div>
  );
}
