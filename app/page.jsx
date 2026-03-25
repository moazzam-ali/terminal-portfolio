import { Terminal } from "../src/components/Terminal";
import { PixelBackground } from "../src/components/PixelBackground";

export default function Home() {
    return (
        <main className="h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
            <PixelBackground />
            <Terminal />
        </main>
    );
}
