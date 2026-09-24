"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";

type Option = { value: string; label: string };

export function OptionRow({
  label,
  value,
  display,
  options,
  onChange,
}: {
  label: string;
  value: string;
  display: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="w-full flex items-center justify-between py-4 border-b border-solid border-hard-gray text-sm text-left cursor-pointer active:bg-[#EFEFEC]">
            <span>
              {label} · {display}
            </span>
            <ChevronRight className="size-5 text-primary-50" />
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto min-w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              closeOnClick
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
