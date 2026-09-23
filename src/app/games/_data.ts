"use client";

export const games = {
  tango: {
    name: "Tango",
    instructions: "Llena el tablero con el mismo número de ☀️ y 🌙",
  },
  patches: {
    name: "Patches",
    instructions: "Rellena los cuadros siguiendo las reglas",
  },
  queens: {
    name: "Reinas",
    instructions:
      "Coloca las reinas sin que se intercepten ni que compartan color",
  },
  sudoku: {
    name: "Mini Sudoku",
    instructions: "Rellena los números en las celdas sin que se repitan",
  },
  zip: {
    name: "Zip",
    instructions: "Conecta en orden",
  },
} as Record<string, { name: string; instructions: string }>;
