import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="flex justify-between bg-blue-600 text-white font-semibold">
            <ul className="flex gap-4 justify-center ml-16">
                <li className="p-4">
                    <Link href="/">Inicio</Link>
                </li>
                <li className="p-4">
                    <Link href="/about">Sobre nosotros</Link>
                </li>
                <li className="p-4">
                    <Link href="/blog/hello-world">Contactos</Link>
                </li>
            </ul>
            <ul className="flex gap-4 justify-center mr-16">
                <li className="p-4">
                    <Link href="/">Iniciar sesión</Link>
                </li>
                <li className="p-4">
                    <Link href="/blog/hello-world">Idioma</Link>
                </li>
            </ul>
        </nav>
    )
}