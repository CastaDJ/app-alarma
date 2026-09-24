import { AlarmClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SettingsMenu } from "./_components/settings-menu";

export default function Home() {
  return (
    <>
      <header className="w-full flex items-center justify-between px-6 pt-6">
        <Image
          src="/avatar.png"
          alt="Avatar del usuario"
          width={44}
          height={44}
          className="rounded-full size-11 object-cover"
          priority
        />
        <SettingsMenu />
      </header>
      <main className="py-6 px-6 flex flex-col gap-4 items-center justify-center flex-1">
        <AlarmClock className="size-16" strokeWidth={1.25} />
        <h1 className="font-bold text-xl text-center">Crea tu primera alarma</h1>
        <p className="text-sm text-gray-500 text-center max-w-56">
          Oprime el botón de abajo para crear tu primera alarma
        </p>
        <Link
          href="/alarms/new"
          className="mt-2 px-4 py-4 bg-primary-50 w-full text-white font-bold text-sm rounded-[14px] hover:bg-primary-100 active:bg-primary-200 text-center"
        >
          Crear alarma
        </Link>
      </main>
    </>
  );
}
