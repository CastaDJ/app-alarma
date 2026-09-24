import Image from "next/image";
import { AlarmList } from "./_components/alarm-list";
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
      <AlarmList />
    </>
  );
}
