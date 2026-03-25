"use client";

export function CommandOutput({ item }) {
    if (item.type === "command") {
        return (
            <div className="command-line-output">
                <span className="text-red-500 font-bold">❯</span>
                <span className="text-white ml-2">{item.text}</span>
            </div>
        );
    }

    if (item.type === "error") {
        return (
            <pre className="whitespace-pre-wrap mb-1 text-red-400 text-sm font-mono animate-fade-in">
                {item.text}
            </pre>
        );
    }

    return (
        <pre className="whitespace-pre-wrap mb-1 text-neutral-300 text-sm font-mono animate-fade-in">
            {item.text}
        </pre>
    );
}
