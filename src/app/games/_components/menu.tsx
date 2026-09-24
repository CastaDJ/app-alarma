"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function DropdownMenuBasic() {
  const game = usePathname().split("/").at(-1);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="mt-4 px-4 py-2 text-black absolute top-0 right-5 hover:bg-[#C0C0C0] active:bg-[#A0A0A0] rounded-lg">
            <Ellipsis />
          </button>
        }
      />
      <DropdownMenuContent>
        {game !== "games" && (
          <DropdownMenuItem>
            <Link href={`/winner?game=${game}`}>Ganar el juego</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href="/">Perder el juego</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
