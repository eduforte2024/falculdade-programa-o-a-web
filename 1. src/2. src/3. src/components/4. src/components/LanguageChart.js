import { useEffect, useRef } from "react";

function LanguageChart({ languages }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!languages || Object.keys(languages).length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let total = Object.values(languages).reduce((a, b) => a + b, 0);
    let start = 0;

    const randomColor = () =>
      `hsl(${Math.random() * 360}, 70%, 60%)`;

    Object.entries(languages).forEach(([lang, value]) => {
      const slice = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(100, 75);
      ctx.fillStyle = randomColor();
      ctx.arc(100, 75, 70, start, start + slice);
      ctx.fill();
      start += slice;
    });
  }, [languages]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={150}
      style={{ marginTop: 10 }}
    ></canvas>
  );
}

export default LanguageChart;
