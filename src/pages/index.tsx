import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="bg-slate-100">
            <header className="bg-purple-600 text-white flex justify-around pt-16">
                <div>
                    <h1 className="text-5xl font-bold">
                        Generar Código <br /> de manera más simple <br /> y rápida
                    </h1>
                    <p className="text-xl mt-10 w-[500px]">
                        Crear código repetitivo no debería sentirse como una perdida
                        de tiempo. Genera tus clases, capas y más con esta herramienta
                        en pocos segundos.
                    </p>
                    <Link href="/generator">
                        <button className="hover:bg-white bg-slate-100 font-semibold text-lg text-purple-600 rounded-sm px-10 py-2 my-10">Empieza ahora</button>
                    </Link>
                </div>
                <div>
                    <Image
                        src="/codegenerator.png"
                        width={800}
                        height={800}
                        unoptimized={true}
                        objectFit="cover"
                        alt="Picture of the author"
                    />
                </div>
            </header>
        </main>
    );
}
