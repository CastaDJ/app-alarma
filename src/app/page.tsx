import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-2">
      <p>Main Page</p>
      <ul>
        <li>
          <Link href="/" className="border border-solid">
            Home
          </Link>
        </li>
        <li>
          <Link href="/games" className="border border-solid">
            Juegos
          </Link>
        </li>
        <li>
          <Link href="/games/tango" className="border border-solid">
            Tango
          </Link>
        </li>
        <li>
          <Link href="/games/zip" className="border border-solid">
            Zip
          </Link>
        </li>
        <li>
          <Link href="/games/sudoku" className="border border-solid">
            Sudoku
          </Link>
        </li>
        <li>
          <Link href="/games/patches" className="border border-solid">
            Patches
          </Link>
        </li>
        <li>
          <Link href="/games/queens" className="border border-solid">
            Reinas
          </Link>
        </li>
      </ul>
    </main>
  );
}
