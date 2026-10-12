import { useEffect, useRef, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Seo } from './components/Seo';
import { sectionIds } from './data/siteContent';
import { siteConfig } from './data/siteConfig';
import { usePortfolioEffects } from './hooks/usePortfolioEffects';
import { useWhatsAppHref } from './hooks/useWhatsAppHref';
import { AboutSection } from './sections/AboutSection';
import { AboutStatsSection } from './sections/AboutStatsSection';
import { ApplicationsPage } from './sections/ApplicationsPage';
import { FooterSection } from './sections/FooterSection';
import { GithubSection } from './sections/GithubSection';
import { HeroSection } from './sections/HeroSection';
import { SkillsSection } from './sections/SkillsSection';
import { WebProjectsPage } from './sections/WebProjectsPage';
import { WorkSection } from './sections/WorkSection';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const isFirstPageRender = useRef(true);

  const whatsappHref = useWhatsAppHref(siteConfig.whatsappNumber, siteConfig.whatsappMessage);

  usePortfolioEffects({
    loaderHidden,
    menuOpen,
    setLoaderProgress,
    setLoaderHidden,
    setActiveSection,
    setMenuOpen,
    sectionIds
  });

  const goToPage = (page) => {
    setMenuOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    if (isFirstPageRender.current) {
      isFirstPageRender.current = false;
      return undefined;
    }
    const id = window.requestAnimationFrame(() => {
      document
        .querySelectorAll('.scroll-reveal:not(.visible)')
        .forEach((el) => el.classList.add('visible'));
    });
    return () => window.cancelAnimationFrame(id);
  }, [currentPage]);

  const handleSectionScroll = (event, targetId) => {
    event.preventDefault();
    setMenuOpen(false);

    if (targetId === '#') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTarget = () => {
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    };

    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToTarget);
      });
      return;
    }

    scrollToTarget();
  };

  return (
    <>
      <Seo />
      <Loader hidden={loaderHidden} progress={loaderProgress} />
      <CustomCursor />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} onNavigate={handleSectionScroll} />
      <main id="main">
        {currentPage === 'webProjects' && (
          <WebProjectsPage onBack={() => goToPage('home')} />
        )}
        {currentPage === 'applications' && (
          <ApplicationsPage onBack={() => goToPage('home')} />
        )}
        {currentPage === 'home' && (
          <>
            <HeroSection onNavigate={handleSectionScroll} />
            <AboutStatsSection />
            <WorkSection
              onViewAllWeb={() => goToPage('webProjects')}
              onViewAllApps={() => goToPage('applications')}
            />
            <GithubSection />
            <SkillsSection />
            <AboutSection />
          </>
        )}
      </main>
      <FooterSection whatsappHref={whatsappHref} onNavigate={handleSectionScroll} />
    </>
  );
}

export default App;
