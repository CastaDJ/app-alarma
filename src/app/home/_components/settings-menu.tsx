"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import Link from "next/link";

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="Configuración"
            className="p-2 text-black hover:bg-[#C0C0C0] active:bg-[#A0A0A0] rounded-lg"
          >
            <Settings className="size-5" />
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuItem>
          <Link href="/">Cerrar sesión</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
