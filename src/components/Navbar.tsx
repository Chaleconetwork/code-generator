import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="flex justify-between bg-blue-600 text-white font-semibold">
            <ul className="flex gap-4 justify-center ml-16">
                <li className="p-4">
                    <Link href="/">Inicio</Link>
                </li>
                <li className="p-4">
                    <Link href="/generator">Generador</Link>
                </li>
            </ul>
        </nav>
    )
}