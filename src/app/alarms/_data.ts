import { games } from "../games/_data";

export const repeatOptions = [
  "Lun–Vie",
  "Todos los días",
  "Fines de semana",
  "Una vez",
];

export const soundOptions = ["Campanas", "Radar", "Suave", "Clásica"];

export const gameOptions = Object.entries(games)
  .filter(([key]) => key !== "rulette")
  .map(([key, game]) => ({ value: key, label: game.name }));

export function gameLabel(game: string | null) {
  return game ? games[game].name : "Aleatorio";
}
