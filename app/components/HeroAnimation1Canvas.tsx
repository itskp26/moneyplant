"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface FloatingTicker {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  fontSize: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let w = 0, h = 0;

    const particles: Particle[] = [];
    const tickers: FloatingTicker[] = [];
    const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4"];
    const TICKERS = [
      "▲ NIFTY 24,350", "▼ HDFC -0.3%", "▲ BTC ₹71,200", "▲ RIL +1.2%",
      "▲ USD/INR 92.5", "▼ SENSEX -104", "▲ ETH +2.8%", "▲ ADANI +0.66%",
      "▲ GOLD ₹89,400", "▼ TCS -0.5%", "▲ SOL +4.1%", "▲ BANKNIFTY +0.85%",
    ];
    const GRID_COLOR = "rgba(16, 185, 129, 0.04)";

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      initParticles();
      initTickers();
    }

    function initParticles() {
      particles.length = 0;
      const count = Math.floor((w * h) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function initTickers() {
      tickers.length = 0;
      for (let i = 0; i < 12; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        tickers.push({
          text: TICKERS[i % TICKERS.length],
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.15 - Math.random() * 0.25,
          alpha: Math.random() * 0.25 + 0.06,
          color,
          fontSize: Math.random() * 6 + 9,
        });
      }
    }

    function drawGrid() {
      if (!ctx) return;
      const spacing = 60;
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function drawCandlestick(x: number, y: number, up: boolean, scale: number, alpha: number) {
      if (!ctx) return;
      const color = up ? `rgba(16,185,129,${alpha})` : `rgba(239,68,68,${alpha})`;
      const bodyH = 8 * scale;
      const bodyW = 6 * scale;
      const wickH = 12 * scale;

      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;

      // Wick
      ctx.beginPath();
      ctx.moveTo(x, y - wickH);
      ctx.lineTo(x, y + wickH);
      ctx.stroke();

      // Body
      ctx.fillStyle = color;
      ctx.fillRect(x - bodyW / 2, y - bodyH / 2, bodyW, bodyH);
    }

    let tick = 0;
    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      drawGrid();

      // Draw floating candlesticks in background
      for (let i = 0; i < 8; i++) {
        const cx = (w / 9) * (i + 0.5);
        const cy = h * 0.65 + Math.sin(tick * 0.01 + i * 0.8) * 20;
        const scale = 0.7 + Math.sin(tick * 0.008 + i) * 0.2;
        drawCandlestick(cx, cy, i % 3 !== 2, scale, 0.06 + Math.sin(tick * 0.01 + i) * 0.02);
      }

      // Draw radial glow
      const gradX = w / 2;
      const gradY = h * 0.4;
      const grd = ctx.createRadialGradient(gradX, gradY, 0, gradX, gradY, w * 0.5);
      grd.addColorStop(0, "rgba(16,185,129,0.05)");
      grd.addColorStop(0.5, "rgba(59,130,246,0.03)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.alpha})`).replace("rgb(", "rgba(").replace("#", "");
        // Use hex color directly
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      drawConnections();

      // Floating ticker labels
      for (const t of tickers) {
        t.x += t.vx;
        t.y += t.vy;
        if (t.y < -20) {
          t.y = h + 20;
          t.x = Math.random() * w;
        }
        if (t.x < -100) t.x = w + 100;
        if (t.x > w + 100) t.x = -100;

        ctx.globalAlpha = t.alpha;
        ctx.font = `${t.fontSize}px 'Inter', monospace`;
        ctx.fillStyle = t.color;
        ctx.fillText(t.text, t.x, t.y);
        ctx.globalAlpha = 1;
      }

      tick++;
      animFrame = requestAnimationFrame(loop);
    }

    resize();
    loop();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
