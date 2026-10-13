import { useEffect } from 'react';

export function usePortfolioEffects({
  loaderHidden,
  menuOpen,
  currentPage,
  setLoaderProgress,
  setLoaderHidden,
  setActiveSection,
  setMenuOpen,
  sectionIds
}) {
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('scroll-locked', !loaderHidden || menuOpen);

    return () => {
      body.classList.remove('scroll-locked');
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
      // lazy images below the fold may never start loading, so they must not hold the splash
      const images = Array.from(document.images).filter((img) => img.loading !== 'lazy');

      if (images.length === 0) {
        if (document.readyState === 'complete') {
          finish();
        } else {
          const onLoad = () => finish();
          window.addEventListener('load', onLoad, { once: true });
          cleanups.push(() => window.removeEventListener('load', onLoad));
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

    const observePending = () => {
      document.querySelectorAll('.scroll-reveal:not(.visible)').forEach((element) => {
        revealObserver.observe(element);
      });
    };

    observePending();

    // pages and filtered project cards mount after the first render, so pick those up too
    const mutationObserver = new MutationObserver(observePending);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
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
  }, [sectionIds, setActiveSection, currentPage]);

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

    const handleOutsidePress = (event) => {
      if (event.target instanceof Element && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('pointerdown', handleOutsidePress);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('pointerdown', handleOutsidePress);
      window.removeEventListener('resize', handleResize);
    };
  }, [setMenuOpen]);
}
