"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { games } from "./_data";
import { DropdownMenuBasic } from "./_components/menu";

export default function GamesLayout({ children }: LayoutProps<"/games">) {
  const game = useSelectedLayoutSegments()[0];

  return (
    <>
      <header className="w-full relative p-6 font-bold h-6.75">
        <h1 className="text-[22px] text-primary text-center">
          {games[game].name}
        </h1>
        <DropdownMenuBasic />
      </header>
      {children}
    </>
  );
}
