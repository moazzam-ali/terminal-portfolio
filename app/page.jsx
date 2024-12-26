import { Terminal } from "../src/components/Terminal";

export default function Home() {
    return (
        <main
            style={{ height: "100vh" }}
            className="h-screen bg-blue-100 flex items-center justify-center p-4"
        >
            <div className="bg-main"></div>
            <Terminal />
        </main>
    );
}
