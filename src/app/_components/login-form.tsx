"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/home");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full flex-1">
      <label className="flex flex-col gap-1.5 text-xs font-bold">
        Correo electrónico
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="nombre@correo.com"
          className="bg-[#EFEFEC] border border-solid border-hard-gray rounded-lg px-3.5 py-3 text-sm font-normal outline-primary-50"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-bold">
        Contraseña
        <span className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full bg-[#EFEFEC] border border-solid border-hard-gray rounded-lg pl-3.5 pr-11 py-3 text-sm font-normal outline-primary-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-50 cursor-pointer"
          >
            {showPassword ? (
              <Eye className="size-5" />
            ) : (
              <EyeOff className="size-5" />
            )}
          </button>
        </span>
      </label>

      <Link
        href="/"
        className="text-xs font-bold self-end hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <button
        type="submit"
        className="mt-2 px-4 py-4 bg-primary-50 w-full text-white font-bold text-sm rounded-[14px] cursor-pointer hover:bg-primary-100 active:bg-primary-200"
      >
        Iniciar sesión
      </button>

      <div className="flex-1" />

      <p className="text-xs text-gray-500 text-center mb-5">
        ¿No tienes cuenta?{" "}
        <Link href="/" className="font-bold text-primary-50 hover:underline">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
