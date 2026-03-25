"use client";

import { forwardRef } from "react";

export const CommandLine = forwardRef(function CommandLine(
    { value, onChange, onSubmit, onHistoryNav },
    ref
) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit(value);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            onHistoryNav?.("up");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            onHistoryNav?.("down");
        }
    };

    return (
        <div className="flex items-center gap-2 font-mono">
            <span className="text-red-500 select-none font-bold">❯</span>
            <input
                ref={ref}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-white caret-red-500 text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
            />
            <span className="blinking-cursor" />
        </div>
    );
});
