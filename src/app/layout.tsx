import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TimerContext } from "@/context/timer-context";
import { AlarmsContext } from "@/context/alarms-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Alarma",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn("h-full antialiased font-inter", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AlarmsContext>
          <TimerContext>{children}</TimerContext>
        </AlarmsContext>
      </body>
    </html>
  );
}
