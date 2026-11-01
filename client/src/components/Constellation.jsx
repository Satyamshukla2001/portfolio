import { useEffect, useRef } from 'react';

export default function Constellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars = [];
    const shootingStars = [];
    const asteroids = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let startTime = 0;
    let nextShotAt = 1800;
    let nextAsteroidAt = 9000;

    const resize = () => {
      const bounds = canvas.parentElement.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(70, Math.min(180, Math.round((width * height) / 6500)));
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.35 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0009 + 0.0003,
          drift: Math.random() * 0.12 + 0.025,
          tint: Math.random() < 0.13 ? 'panna' : Math.random() < 0.55 ? 'ruby' : 'white'
        });
      }
    };

    const drawGalaxy = (time) => {
      const centerX = width * 0.72;
      const centerY = height * 0.43;
      const radius = Math.min(width * 0.4, height * 0.5, 430);
      const pulse = 0.96 + Math.sin(time * 0.00035) * 0.04;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.32);
      ctx.scale(1.7, 0.62);
      ctx.globalCompositeOperation = 'screen';

      const nebula = ctx.createRadialGradient(0, 0, radius * 0.04, 0, 0, radius * pulse);
      nebula.addColorStop(0, 'rgba(255, 180, 191, 0.28)');
      nebula.addColorStop(0.18, 'rgba(255, 49, 95, 0.22)');
      nebula.addColorStop(0.48, 'rgba(119, 22, 65, 0.12)');
      nebula.addColorStop(0.78, 'rgba(85, 230, 165, 0.055)');
      nebula.addColorStop(1, 'rgba(85, 230, 165, 0)');
      ctx.fillStyle = nebula;
      ctx.beginPath();
      ctx.arc(0, 0, radius * pulse, 0, Math.PI * 2);
      ctx.fill();

      for (let arm = 0; arm < 2; arm++) {
        ctx.beginPath();
        for (let step = 0; step <= 120; step++) {
          const progress = step / 120;
          const angle = progress * Math.PI * 4 + arm * Math.PI;
          const distance = radius * (0.025 + progress * 0.92);
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = arm === 0 ? 'rgba(255, 143, 168, 0.14)' : 'rgba(85, 230, 165, 0.09)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.32);
      core.addColorStop(0, 'rgba(255, 244, 247, 0.7)');
      core.addColorStop(0.14, 'rgba(255, 143, 168, 0.34)');
      core.addColorStop(0.5, 'rgba(255, 49, 95, 0.12)');
      core.addColorStop(1, 'rgba(255, 49, 95, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);
      drawGalaxy(time);

      for (const star of stars) {
        if (!reduceMotion) {
          star.y -= star.drift;
          if (star.y < -2) {
            star.y = height + 2;
            star.x = Math.random() * width;
          }
        }

        const twinkle = reduceMotion ? 0.7 : 0.48 + Math.sin(time * star.speed + star.phase) * 0.34;
        const color = star.tint === 'panna'
          ? `rgba(140, 255, 205, ${twinkle})`
          : star.tint === 'ruby'
            ? `rgba(255, 143, 168, ${twinkle})`
            : `rgba(255, 247, 250, ${twinkle})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (0.75 + twinkle * 0.45), 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 1.25 && twinkle > 0.72) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - 3, star.y);
          ctx.lineTo(star.x + 3, star.y);
          ctx.moveTo(star.x, star.y - 3);
          ctx.lineTo(star.x, star.y + 3);
          ctx.stroke();
        }
      }

      if (!reduceMotion && elapsed >= nextShotAt) {
        shootingStars.push({ x: Math.random() * width * 0.65, y: Math.random() * height * 0.45, born: elapsed });
        nextShotAt = elapsed + 5500 + Math.random() * 5000;
      }

      if (!reduceMotion && elapsed >= nextAsteroidAt) {
        asteroids.push({
          x: width + 30,
          y: Math.random() * height * 0.65 + height * 0.1,
          size: 5 + Math.random() * 7,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.025,
          speed: 0.7 + Math.random() * 0.8
        });
        nextAsteroidAt = elapsed + 12000 + Math.random() * 10000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shot = shootingStars[i];
        const progress = (elapsed - shot.born) / 850;
        if (progress >= 1) {
          shootingStars.splice(i, 1);
          continue;
        }
        const x = shot.x + progress * 190;
        const y = shot.y + progress * 90;
        const streak = ctx.createLinearGradient(x - 105, y - 50, x, y);
        streak.addColorStop(0, 'rgba(255, 244, 247, 0)');
        streak.addColorStop(1, `rgba(255, 244, 247, ${1 - progress})`);
        ctx.strokeStyle = streak;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(x - 105, y - 50);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        asteroid.x -= asteroid.speed;
        asteroid.angle += asteroid.spin;
        if (asteroid.x < -asteroid.size * 2) {
          asteroids.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);
        ctx.beginPath();
        for (let point = 0; point < 8; point++) {
          const angle = (point / 8) * Math.PI * 2;
          const radius = asteroid.size * (point % 2 === 0 ? 1 : 0.78);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (point === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 143, 168, 0.72)';
        ctx.strokeStyle = 'rgba(255, 244, 247, 0.65)';
        ctx.lineWidth = 0.8;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-asteroid.size * 0.35, -asteroid.size * 0.12);
        ctx.lineTo(asteroid.size * 0.08, -asteroid.size * 0.48);
        ctx.lineTo(asteroid.size * 0.4, asteroid.size * 0.08);
        ctx.closePath();
        ctx.fillStyle = 'rgba(85, 230, 165, 0.38)';
        ctx.fill();
        ctx.restore();
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    if (!reduceMotion) frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}
