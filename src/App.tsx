import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number; angle: number; radius: number }[] = [];
    const starCount = 400;

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.max(canvas.width, canvas.height) * 0.8;
        stars.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: Math.random() * 1.5,
          opacity: Math.random(),
          speed: 0.0005 + Math.random() * 0.001,
          angle: angle,
          radius: radius
        });
      }
    };

    let scrollProgress = 0;
    const handleScroll = () => {
      scrollProgress = window.scrollY * 0.002;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(star => {
        const currentAngle = star.angle + scrollProgress * star.speed * 10;
        const x = centerX + Math.cos(currentAngle) * star.radius;
        const y = centerY + Math.sin(currentAngle) * star.radius;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${star.opacity})`;
        ctx.fill();

        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 0.8) star.opacity = 0.8;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    initStars();
    draw();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', initStars);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initStars);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

const Nav = () => (
  <nav>
    <Link to="/" className="nav-logo">TWYNTRA</Link>
    <div className="nav-links">
      <Link to="/">Orbit</Link>
      <Link to="/about">About</Link>
      <a href="mailto:curate@twyntra.com">Inquire</a>
    </div>
  </nav>
);

const Home = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.1,
        duration: 2,
        ease: 'expo.out',
      });

      gsap.utils.toArray<HTMLElement>('.pillar-item').forEach((pillar, i) => {
        gsap.from(pillar, {
          scrollTrigger: { trigger: pillar, start: 'top 85%' },
          opacity: 0,
          y: 60,
          duration: 1.5,
          delay: i * 0.2,
          ease: 'power4.out',
        });
      });
    }, homeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={homeRef}>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Celestial Curators of Luxury</p>
          <h1 className="hero-title">
            <span style={{ display: 'inline-block' }}>A</span>
            <span style={{ display: 'inline-block' }}>R</span>
            <span style={{ display: 'inline-block' }}>T</span>
            <span style={{ display: 'inline-block' }}> </span>
            <span style={{ display: 'inline-block' }}>O</span>
            <span style={{ display: 'inline-block' }}>F</span>
            <br />
            <span className="accent-gold" style={{ display: 'inline-block' }}>E</span>
            <span className="accent-gold" style={{ display: 'inline-block' }}>V</span>
            <span className="accent-gold" style={{ display: 'inline-block' }}>E</span>
            <span className="accent-gold" style={{ display: 'inline-block' }}>N</span>
            <span className="accent-gold" style={{ display: 'inline-block' }}>T</span>
            <span className="accent-gold" style={{ display: 'inline-block' }}>S</span>
          </h1>
        </div>
      </section>

      <section className="pillars-section">
        <div className="pillars-container">
          <div className="pillar-item">
            <span className="pillar-num">01</span>
            <h3 className="pillar-title">Vision</h3>
            <p className="pillar-text">The architecture of imagination, translating your deepest desires into a cohesive celestial reality.</p>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">02</span>
            <h3 className="pillar-title">Precision</h3>
            <p className="pillar-text">Mastery over the microscopic. We orchestrate every detail with surgical elegance and effortless grace.</p>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">03</span>
            <h3 className="pillar-title">Legacy</h3>
            <p className="pillar-text">Beyond the moment. We craft experiences that resonate across time, leaving an indelible mark on your story.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-title', { opacity: 0, y: 50, duration: 1.5, ease: 'power4.out' });
      gsap.utils.toArray<HTMLElement>('.about-img').forEach((img) => {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 80%' },
          opacity: 0,
          scale: 1.1,
          duration: 2,
          ease: 'power2.out',
        });
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutRef} className="about-page">
      <section className="about-hero">
        <h1 className="about-title">The Curators</h1>
        <div className="about-intro">
          <p>Twyntra Events was born from a singular obsession: to merge the infinite wonder of the cosmos with the grounded precision of earthly architecture.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-row">
          <div className="about-text">
            <h2>Our Origin</h2>
            <p>Founded in 2012, we began as a small collective of artists and engineers. Today, we are global curators of the "Celestial Experience." We don't just plan events; we architect memories that live in the stars.</p>
          </div>
          <div className="about-img">
            <img src="/moodboard_lux.png" alt="Vision" />
          </div>
        </div>

        <div className="about-row reverse">
          <div className="about-text">
            <h2>The Standard</h2>
            <p>Every event is a bespoke ecosystem. From the lighting that mimics the Orion nebula to the acoustics that resonate with silence, we leave no stone unturned in our pursuit of perfection.</p>
          </div>
          <div className="about-img">
            <img src="/table_lux.png" alt="Precision" />
          </div>
        </div>

        <div className="about-row">
          <div className="about-text">
            <h2>Global Reach</h2>
            <p>From private islands in the Maldives to the historic estates of Tuscany, Twyntra brings the apex of luxury to the most discerning clients across the globe.</p>
          </div>
          <div className="about-img">
            <img src="/wedding_lux.png" alt="Legacy" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <div className="grain-overlay"></div>
        <Starfield />
        <div className="galaxy-glow glow-1"></div>
        <div className="galaxy-glow glow-2"></div>
        
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Begin Your Orbit</h2>
            <p className="cta-subtitle">Limited engagements for the discerning few.</p>
            <a href="mailto:curate@twyntra.com" className="cta-button">Inquire</a>
          </div>
        </section>

        <footer>
          <div className="nav-logo" style={{ marginBottom: '20px' }}>TWYNTRA</div>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.7rem', letterSpacing: '4px' }}>© 2026 TWYNTRA EVENTS. THE APEX OF LUXURY.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
