"use client";

import { useEffect, useRef } from "react";

export function PixelBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationId;
        let pixels = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPixels();
        };

        const PIXEL_SIZE = 4;
        const COLS = () => Math.floor(canvas.width / PIXEL_SIZE);
        const ROWS = () => Math.floor(canvas.height / PIXEL_SIZE);

        function initPixels() {
            pixels = [];
            const cols = COLS();
            const rows = ROWS();
            // Sparse grid of animated pixels
            for (let i = 0; i < Math.floor((cols * rows) * 0.012); i++) {
                pixels.push({
                    x: Math.floor(Math.random() * cols),
                    y: Math.floor(Math.random() * rows),
                    opacity: Math.random() * 0.5,
                    speed: 0.005 + Math.random() * 0.02,
                    phase: Math.random() * Math.PI * 2,
                    isRed: Math.random() < 0.15, // 15% chance of red pixel
                    drift: (Math.random() - 0.5) * 0.3,
                    fallSpeed: 0.02 + Math.random() * 0.08,
                });
            }
        }

        let time = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.016;

            const rows = ROWS();

            for (const pixel of pixels) {
                // Animate opacity with sine wave
                const glow = Math.sin(time * pixel.speed * 60 + pixel.phase);
                const opacity = Math.max(0, pixel.opacity * (0.5 + 0.5 * glow));

                // Slow downward drift
                pixel.y += pixel.fallSpeed;
                pixel.x += pixel.drift * 0.02;

                // Wrap around
                if (pixel.y > rows) {
                    pixel.y = 0;
                    pixel.x = Math.floor(Math.random() * COLS());
                }

                if (pixel.isRed) {
                    ctx.fillStyle = `rgba(220, 38, 38, ${opacity * 0.8})`;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                }

                ctx.fillRect(
                    Math.floor(pixel.x) * PIXEL_SIZE,
                    Math.floor(pixel.y) * PIXEL_SIZE,
                    PIXEL_SIZE,
                    PIXEL_SIZE
                );
            }

            animationId = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "transparent" }}
        />
    );
}
