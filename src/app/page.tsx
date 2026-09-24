import Link from "next/link";

export default function Home() {
  return (
    <main className="p-2 flex items-center flex-col gap-20 justify-center flex-1">
      <p className="text-2xl font-bold">Menú principal</p>
      <ul>
        <li>
          <Link href="/games" className="border border-solid p-2 text-lg">
            Ir a la ruleta
          </Link>
        </li>
      </ul>
    </main>
  );
}
