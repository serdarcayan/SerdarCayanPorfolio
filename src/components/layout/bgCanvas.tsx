
import { useEffect, useRef } from "react";

interface CircularCanvasGridProps {
  cellSize?: number;
  lineColor?: string;
  lineWidth?: number;
  fadeStart?: number;
  fadeEnd?: number;
}

export default function CircularCanvasGrid({
  cellSize = 32,
  lineColor = "rgba(125, 119, 137, 0.16)",
  lineWidth = 0.75,
  fadeStart = 0.2,
  fadeEnd = 1,
}: CircularCanvasGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Grid çizgilerini çiz
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();

      // 2. Dairesel saydamlık maskesi
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );

      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(
        Math.max(0, Math.min(fadeStart, 0.999)),
        "rgba(0,0,0,1)"
      );
      gradient.addColorStop(
        Math.max(fadeStart, Math.min(fadeEnd, 1)),
        "rgba(0,0,0,0)"
      );

      // 3. Maskeyi mevcut canvas çizimine uygula
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);

    draw();

    return () => observer.disconnect();
  }, [cellSize, lineColor, lineWidth, fadeStart, fadeEnd]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity: 0.6,
      }}
    />
  );
}
