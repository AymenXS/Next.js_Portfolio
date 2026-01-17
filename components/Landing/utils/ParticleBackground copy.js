// With p5.js
import { useRef, useEffect } from 'react';
import p5 from 'p5';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let sketch = new p5((p) => {
      // ===== CONCEPT 1: Configuration and Utilities =====
      // Utility Functions (Level 1)
      const deg = (a) => (Math.PI / 180) * a;
      const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

      // Configuration Object (Level 2)
      const opt = {
        particles: p.windowWidth / 500 ? 1000 : 500,
        noiseScale: 0.009,
        angle: deg(-90),
        h1: rand(0, 360),
        h2: rand(0, 360),
        s1: rand(20, 90),
        s2: rand(20, 90),
        l1: rand(30, 80),
        l2: rand(30, 80),
        strokeWeight: 1.2,
        tail: 82,
      };

      // ===== CONCEPT 2: Particle System =====
      // Particle Array and Time Tracking (Level 1)
      const Particles = [];
      let time = 0;

      // Particle Class (Level 3)
      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.lx = x;
          this.ly = y;
          this.vx = 0;
          this.vy = 0;
          this.ax = 0;
          this.ay = 0;
          this.hueSemen = Math.random();
          this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
          this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
          this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
          this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
        }

        randomize() {
          this.hueSemen = Math.random();
          this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
          this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
          this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
          this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
        }

        update() {
          this.follow();
          this.vx += this.ax;
          this.vy += this.ay;
          var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          var a = Math.atan2(this.vy, this.vx);
          var m = Math.min(this.maxSpeed, p);
          this.vx = Math.cos(a) * m;
          this.vy = Math.sin(a) * m;
          this.x += this.vx;
          this.y += this.vy;
          this.ax = 0;
          this.ay = 0;
          this.edges();
        }

        follow() {
          let angle = p.noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) * Math.PI * 0.5 + opt.angle;
          this.ax += Math.cos(angle);
          this.ay += Math.sin(angle);
        }

        updatePrev() {
          this.lx = this.x;
          this.ly = this.y;
        }

        edges() {
          if (this.x < 0) {
            this.x = p.width;
            this.updatePrev();
          }
          if (this.x > p.width) {
            this.x = 0;
            this.updatePrev();
          }
          if (this.y < 0) {
            this.y = p.height;
            this.updatePrev();
          }
          if (this.y > p.height) {
            this.y = 0;
            this.updatePrev();
          }
        }

        render() {
          p.stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
          p.line(this.x, this.y, this.lx, this.ly);
          this.updatePrev();
        }
      }

      // ===== CONCEPT 3: User Interaction =====
      // Click Event Handler (Level 2)
      p.mouseClicked = () => {
        opt.h1 = rand(0, 360);
        opt.h2 = rand(0, 360);
        opt.s1 = rand(20, 90);
        opt.s2 = rand(20, 90);
        opt.l1 = rand(30, 80);
        opt.l2 = rand(30, 80);
        opt.angle += deg(p.random(60, 60)) * (Math.random() > 0.5 ? 1 : -1);
        for (let p of Particles) {
          p.randomize();
        }
      };

      // ===== CONCEPT 4: Canvas Setup and Animation =====
      // Setup Function (Level 2)
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (let i = 0; i < opt.particles; i++) {
          Particles.push(new Particle(Math.random() * p.width, Math.random() * p.height));
        }
        p.strokeWeight(opt.strokeWeight);
      };

      // Draw Function (Level 3)
      p.draw = () => {
        time++;
        p.background(0, 100 - opt.tail);
        for (let p of Particles) {
          p.update();
          p.render();
        }
      };

      // ===== CONCEPT 5: Responsive Design =====
      // Window Resize Handler (Level 2)
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    }, canvasRef.current);

    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default ParticleBackground;



// Vanilla
import { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    const deg = (a) => (Math.PI / 180) * a;
    const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

    const opt = {
      particles: typeof window !== 'undefined' ? (window.innerWidth / 500 ? 1000 : 500) : 500,
      noiseScale: 0.009,
      angle: deg(-90),
      h1: rand(0, 360),
      h2: rand(0, 360),
      s1: rand(20, 90),
      s2: rand(20, 90),
      l1: rand(30, 80),
      l2: rand(30, 80),
      strokeWeight: 1.2,
      tail: 82,
    };

    // Improved Perlin Noise implementation
    const noise = (() => {
      const permutation = [];
      for (let i = 0; i < 256; i++) permutation.push(i);
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
      }
      const p = [...permutation, ...permutation];

      const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
      const lerp = (t, a, b) => a + t * (b - a);
      const grad = (hash, x, y, z) => {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      };

      return (x, y, z) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        const u = fade(x);
        const v = fade(y);
        const w = fade(z);
        const A = p[X] + Y,
          AA = p[A] + Z,
          AB = p[A + 1] + Z;
        const B = p[X + 1] + Y,
          BA = p[B] + Z,
          BB = p[B + 1] + Z;

        return lerp(
          w,
          lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
          lerp(
            v,
            lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
            lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
          )
        );
      };
    })();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
      }

      randomize() {
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
      }

      update() {
        this.follow();

        this.vx += this.ax;
        this.vy += this.ay;

        var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        var a = Math.atan2(this.vy, this.vx);
        var m = Math.min(this.maxSpeed, p);
        this.vx = Math.cos(a) * m;
        this.vy = Math.sin(a) * m;

        this.x += this.vx;
        this.y += this.vy;
        this.ax = 0;
        this.ay = 0;

        this.edges();
      }

      follow() {
        let angle = noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) * Math.PI * 0.5 + opt.angle;

        this.ax += Math.cos(angle);
        this.ay += Math.sin(angle);
      }

      updatePrev() {
        this.lx = this.x;
        this.ly = this.y;
      }

      edges() {
        if (this.x < 0) {
          this.x = canvas.width;
          this.updatePrev();
        }
        if (this.x > canvas.width) {
          this.x = 0;
          this.updatePrev();
        }
        if (this.y < 0) {
          this.y = canvas.height;
          this.updatePrev();
        }
        if (this.y > canvas.height) {
          this.y = 0;
          this.updatePrev();
        }
      }

      render() {
        ctx.strokeStyle = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.lx, this.ly);
        ctx.stroke();
        this.updatePrev();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      opt.particles = window.innerWidth / 500 ? 1000 : 500;
      particles = [];
      for (let i = 0; i < opt.particles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
      ctx.lineWidth = opt.strokeWeight;
    };

    const handleClick = () => {
      opt.h1 = rand(0, 360);
      opt.h2 = rand(0, 360);
      opt.s1 = rand(20, 90);
      opt.s2 = rand(20, 90);
      opt.l1 = rand(30, 80);
      opt.l2 = rand(30, 80);
      opt.angle += deg(Math.random() * 60) * (Math.random() > 0.5 ? 1 : -1);

      for (let p of particles) {
        p.randomize();
      }
    };

    const animate = () => {
      time++;
      ctx.fillStyle = `rgba(0, 0, 0, ${(100 - opt.tail) / 100})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        p.update();
        p.render();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.body.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default ParticleBackground;


// Optimized Vanilla with ChatGPT (3D Noise)
import { useRef, useEffect } from 'react';
import { createNoise3D } from 'simplex-noise'; // Importing createNoise3D function

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D(); // Creating a 3D noise function

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;
    let offscreenCanvas, offscreenCtx;
    let lastTime = 0;
    const fps = 120; // Limit to 30 FPS
    const frameInterval = 1000 / fps;

    const deg = (a) => (Math.PI / 180) * a;
    const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

    const opt = {
      particles: typeof window !== 'undefined' ? (window.innerWidth / 500 ? 1000 : 500) : 500,
      noiseScale: 0.009,
      angle: deg(-90),
      h1: rand(0, 360),
      h2: rand(0, 360),
      s1: rand(20, 90),
      s2: rand(20, 90),
      l1: rand(30, 80),
      l2: rand(30, 80),
      strokeWeight: 1.2,
      tail: 82,
    };

    const noise = (x, y, z) => noise3D(x, y, z); // Use the noise3D function

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.randomize();
      }

      randomize() {
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
      }

      update() {
        this.follow();
        this.vx += this.ax;
        this.vy += this.ay;

        const p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const a = Math.atan2(this.vy, this.vx);
        const m = Math.min(this.maxSpeed, p);
        this.vx = Math.cos(a) * m;
        this.vy = Math.sin(a) * m;

        this.x += this.vx;
        this.y += this.vy;
        this.ax = 0;
        this.ay = 0;

        this.edges();
      }

      follow() {
        let angle = noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) * Math.PI * 0.5 + opt.angle;
        this.ax += Math.cos(angle);
        this.ay += Math.sin(angle);
      }

      updatePrev() {
        this.lx = this.x;
        this.ly = this.y;
      }

      edges() {
        if (this.x < 0) {
          this.x = canvas.width;
          this.updatePrev();
        }
        if (this.x > canvas.width) {
          this.x = 0;
          this.updatePrev();
        }
        if (this.y < 0) {
          this.y = canvas.height;
          this.updatePrev();
        }
        if (this.y > canvas.height) {
          this.y = 0;
          this.updatePrev();
        }
      }

      render() {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.lx, this.ly);
        this.updatePrev();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Offscreen canvas setup for the background
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCtx.fillStyle = `rgba(0, 0, 0, ${(100 - opt.tail) / 100})`;
      offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      particles = [];
      for (let i = 0; i < opt.particles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
      ctx.lineWidth = opt.strokeWeight;
    };

    // Debounced window resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    const handleClick = () => {
      opt.h1 = rand(0, 360);
      opt.h2 = rand(0, 360);
      opt.s1 = rand(20, 90);
      opt.s2 = rand(20, 90);
      opt.l1 = rand(30, 80);
      opt.l2 = rand(30, 80);
      opt.angle += deg(Math.random() * 60) * (Math.random() > 0.5 ? 1 : -1);

      for (let p of particles) {
        p.randomize();
      }
    };

    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      if (deltaTime > frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);
        time++;

        // Draw background from offscreen canvas
        ctx.drawImage(offscreenCanvas, 0, 0);

        // Batch particle rendering
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${opt.h1}, ${opt.s1}%, ${opt.l1}%, .5)`;

        for (let p of particles) {
          p.update();
          p.render();
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);
    document.body.addEventListener('click', handleClick);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default ParticleBackground;

// Optimized Vanilla with ChatGPT (2D Noise)
import { useRef, useEffect } from 'react';
import { createNoise2D } from 'simplex-noise'; // Importing createNoise2D function

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const noise2D = createNoise2D(); // Creating a 2D noise function

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;
    let offscreenCanvas, offscreenCtx;
    let lastTime = 0;
    const fps = 30; // Limit to 30 FPS
    const frameInterval = 1000 / fps;

    const deg = (a) => (Math.PI / 180) * a;
    const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

    const opt = {
      particles: typeof window !== 'undefined' ? (window.innerWidth / 500 ? 1000 : 500) : 500,
      noiseScale: 0.009,
      angle: deg(-90),
      h1: rand(0, 360),
      h2: rand(0, 360),
      s1: rand(20, 90),
      s2: rand(20, 90),
      l1: rand(30, 80),
      l2: rand(30, 80),
      strokeWeight: 1.2,
      tail: 82,
    };

    const noise = (x, y) => noise2D(x, y); // Use the noise2D function

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.randomize();
      }

      randomize() {
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
      }

      update() {
        this.follow();
        this.vx += this.ax;
        this.vy += this.ay;

        const p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const a = Math.atan2(this.vy, this.vx);
        const m = Math.min(this.maxSpeed, p);
        this.vx = Math.cos(a) * m;
        this.vy = Math.sin(a) * m;

        this.x += this.vx;
        this.y += this.vy;
        this.ax = 0;
        this.ay = 0;

        this.edges();
      }

      follow() {
        let angle = noise(this.x * opt.noiseScale, this.y * opt.noiseScale) * Math.PI * 0.5 + opt.angle;
        this.ax += Math.cos(angle);
        this.ay += Math.sin(angle);
      }

      updatePrev() {
        this.lx = this.x;
        this.ly = this.y;
      }

      edges() {
        if (this.x < 0) {
          this.x = canvas.width;
          this.updatePrev();
        }
        if (this.x > canvas.width) {
          this.x = 0;
          this.updatePrev();
        }
        if (this.y < 0) {
          this.y = canvas.height;
          this.updatePrev();
        }
        if (this.y > canvas.height) {
          this.y = 0;
          this.updatePrev();
        }
      }

      render() {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.lx, this.ly);
        this.updatePrev();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Offscreen canvas setup for the background
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCtx.fillStyle = `rgba(0, 0, 0, ${(100 - opt.tail) / 100})`;
      offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      particles = [];
      for (let i = 0; i < opt.particles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
      ctx.lineWidth = opt.strokeWeight;
    };

    // Debounced window resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    const handleClick = () => {
      opt.h1 = rand(0, 360);
      opt.h2 = rand(0, 360);
      opt.s1 = rand(20, 90);
      opt.s2 = rand(20, 90);
      opt.l1 = rand(30, 80);
      opt.l2 = rand(30, 80);
      opt.angle += deg(Math.random() * 60) * (Math.random() > 0.5 ? 1 : -1);

      for (let p of particles) {
        p.randomize();
      }
    };

    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      if (deltaTime > frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);
        time++;

        // Draw background from offscreen canvas
        ctx.drawImage(offscreenCanvas, 0, 0);

        // Batch particle rendering
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${opt.h1}, ${opt.s1}%, ${opt.l1}%, .5)`;

        for (let p of particles) {
          p.update();
          p.render();
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);
    document.body.addEventListener('click', handleClick);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default ParticleBackground;

// WebGLParticle

import { useRef, useEffect } from 'react';

const WebGLParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      attribute vec3 a_color;
      varying vec3 v_color;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = 1.0;
        v_color = a_color;
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      varying vec3 v_color;
      void main() {
        gl_FragColor = vec4(v_color, 0.5);
      }
    `;

    // Create shader program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Get attribute locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');

    // Create buffers
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    // Set up particles
    const numParticles = 5000;
    const positions = new Float32Array(numParticles * 2);
    const colors = new Float32Array(numParticles * 3);
    const velocities = new Float32Array(numParticles * 2);

    for (let i = 0; i < numParticles; i++) {
      positions[i * 2] = Math.random() * 2 - 1;
      positions[i * 2 + 1] = Math.random() * 2 - 1;
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
      velocities[i * 2] = (Math.random() - 0.5) * 0.01;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01;
    }

    function updateParticles() {
      for (let i = 0; i < numParticles; i++) {
        positions[i * 2] += velocities[i * 2];
        positions[i * 2 + 1] += velocities[i * 2 + 1];

        if (positions[i * 2] > 1 || positions[i * 2] < -1) {
          velocities[i * 2] *= -1;
        }
        if (positions[i * 2 + 1] > 1 || positions[i * 2 + 1] < -1) {
          velocities[i * 2 + 1] *= -1;
        }
      }
    }

    function render() {
      updateParticles();

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(colorAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, numParticles);

      requestAnimationFrame(render);
    }

    render();

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(colorBuffer);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default WebGLParticleBackground;


// WebGLParticle with Trail

import { useRef, useEffect } from 'react';

const WebGLParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      attribute vec3 a_color;
      attribute float a_alpha;
      varying vec3 v_color;
      varying float v_alpha;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = 2.0;
        v_color = a_color;
        v_alpha = a_alpha;
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      varying vec3 v_color;
      varying float v_alpha;
      void main() {
        gl_FragColor = vec4(v_color, v_alpha);
      }
    `;

    // Create shader program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Get attribute locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');
    const alphaAttributeLocation = gl.getAttribLocation(program, 'a_alpha');

    // Create buffers
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const alphaBuffer = gl.createBuffer();

    // Set up particles
    const numParticles = 2000;
    const trailLength = 5;
    const positions = new Float32Array(numParticles * trailLength * 2);
    const colors = new Float32Array(numParticles * trailLength * 3);
    const alphas = new Float32Array(numParticles * trailLength);
    const velocities = new Float32Array(numParticles * 2);

    for (let i = 0; i < numParticles; i++) {
      const baseIndex = i * trailLength;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const color = [Math.random(), Math.random(), Math.random()];

      for (let j = 0; j < trailLength; j++) {
        const index = (baseIndex + j) * 2;
        positions[index] = x;
        positions[index + 1] = y;
        colors[index * 1.5] = color[0];
        colors[index * 1.5 + 1] = color[1];
        colors[index * 1.5 + 2] = color[2];
        alphas[baseIndex + j] = j / (trailLength - 1);
      }

      velocities[i * 2] = (Math.random() - 0.5) * 0.01;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01;
    }

    function updateParticles() {
      for (let i = 0; i < numParticles; i++) {
        const baseIndex = i * trailLength * 2;

        // Update trail
        for (let j = trailLength - 1; j > 0; j--) {
          const currentIndex = baseIndex + j * 2;
          const previousIndex = baseIndex + (j - 1) * 2;
          positions[currentIndex] = positions[previousIndex];
          positions[currentIndex + 1] = positions[previousIndex + 1];
        }

        // Update head of trail
        positions[baseIndex] += velocities[i * 2];
        positions[baseIndex + 1] += velocities[i * 2 + 1];

        // Bounce off edges
        if (positions[baseIndex] > 1 || positions[baseIndex] < -1) {
          velocities[i * 2] *= -1;
        }
        if (positions[baseIndex + 1] > 1 || positions[baseIndex + 1] < -1) {
          velocities[i * 2 + 1] *= -1;
        }
      }
    }

    function render() {
      updateParticles();

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(colorAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(alphaAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
      gl.vertexAttribPointer(alphaAttributeLocation, 1, gl.FLOAT, false, 0, 0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.POINTS, 0, numParticles * trailLength);

      requestAnimationFrame(render);
    }

    render();
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(colorBuffer);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default WebGLParticleBackground;
