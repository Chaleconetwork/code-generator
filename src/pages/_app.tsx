import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fontsource-variable/onest';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
