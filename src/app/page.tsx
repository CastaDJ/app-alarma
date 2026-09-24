import { AlarmClock } from "lucide-react";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <main className="py-6 pt-20 px-6 flex flex-col gap-6.25 items-center flex-1">
      <AlarmClock className="size-16" strokeWidth={1.25} />
      <header className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-[28px] text-primary-50 text-center">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Siempre es un gusto tenerte de vuelta
        </p>
      </header>
      <LoginForm />
    </main>
  );
}
