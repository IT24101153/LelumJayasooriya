import { useEffect } from 'react';

export function usePortfolioEffects({
  loaderHidden,
  menuOpen,
  setLoaderProgress,
  setLoaderHidden,
  setActiveSection,
  setMenuOpen,
  sectionIds
}) {
  useEffect(() => {
    const body = document.body;
    body.style.overflow = loaderHidden && !menuOpen ? 'auto' : 'hidden';

    return () => {
      body.style.overflow = 'auto';
    };
  }, [loaderHidden, menuOpen]);

  useEffect(() => {
    let hideTimeoutId;
    let safetyTimeoutId;
    const cleanups = [];

    const finish = (delay = 250) => {
      setLoaderProgress(100);
      window.clearTimeout(hideTimeoutId);
      hideTimeoutId = window.setTimeout(() => setLoaderHidden(true), delay);
    };

    const trackImages = () => {
      const images = Array.from(document.images);

      if (images.length === 0) {
        if (document.readyState === 'complete') {
          finish();
        } else {
          window.addEventListener('load', () => finish(), { once: true });
        }
        return;
      }

      let loaded = images.filter((img) => img.complete && img.naturalWidth > 0).length;
      const total = images.length;

      const update = () => {
        const pct = Math.min(99, Math.round((loaded / total) * 100));
        setLoaderProgress(pct);
        if (loaded >= total) {
          finish();
        }
      };

      update();

      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) return;
        const onDone = () => {
          loaded += 1;
          update();
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
        };
        img.addEventListener('load', onDone);
        img.addEventListener('error', onDone);
        cleanups.push(() => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
        });
      });
    };

    const rafId = window.requestAnimationFrame(trackImages);

    safetyTimeoutId = window.setTimeout(() => finish(150), 4000);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(hideTimeoutId);
      window.clearTimeout(safetyTimeoutId);
      cleanups.forEach((fn) => fn());
    };
  }, [setLoaderHidden, setLoaderProgress]);

  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!cursorDot || !cursorOutline || !canUseCustomCursor || reduceMotion) {
      return undefined;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let rafId;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      rafId = window.requestAnimationFrame(animateOutline);
    };

    const isInteractive = (target) =>
      target instanceof Element &&
      !!target.closest('a, button, .bento-item, .skill-card');

    const handleMouseOver = (event) => {
      if (isInteractive(event.target)) {
        cursorOutline.classList.add('hover');
      }
    };

    const handleMouseOut = (event) => {
      if (isInteractive(event.target)) {
        cursorOutline.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animateOutline();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const cursorLoader = document.querySelector('.cursor-loader');
    if (!cursorLoader || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    const handleMove = (event) => {
      cursorLoader.style.left = `${event.clientX}px`;
      cursorLoader.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (!revealElements.length) {
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -120px 0px', threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const setActiveNavLink = () => {
      const scrollPosition = window.scrollY + 120;
      let nextActive = null;

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && scrollPosition >= section.offsetTop) {
          nextActive = id;
        }
      }

      setActiveSection(nextActive);
    };

    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink, { passive: true });

    return () => {
      window.removeEventListener('scroll', setActiveNavLink);
    };
  }, [sectionIds, setActiveSection]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [setMenuOpen]);
}
