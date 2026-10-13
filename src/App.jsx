import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
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

// Sub-pages live behind hash routes so they work on any static host without rewrites.
const pageRoutes = {
  webProjects: '#/web-projects',
  applications: '#/applications'
};

const pageTitles = {
  webProjects: `Web Projects | ${siteConfig.name}`,
  applications: `Applications | ${siteConfig.name}`
};

const getPageFromHash = () => {
  const match = Object.entries(pageRoutes).find(([, hash]) => hash === window.location.hash);
  return match ? match[0] : 'home';
};

const getHomeUrl = () => window.location.pathname + window.location.search;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const pageRef = useRef(currentPage);
  const homeScrollY = useRef(0);

  const whatsappHref = useWhatsAppHref(siteConfig.whatsappNumber, siteConfig.whatsappMessage);

  usePortfolioEffects({
    loaderHidden,
    menuOpen,
    currentPage,
    setLoaderProgress,
    setLoaderHidden,
    setActiveSection,
    setMenuOpen,
    sectionIds
  });

  // Swaps the rendered page, then puts the scroll position where the visitor expects it:
  // the top of a sub-page, or wherever they left the home page.
  const showPage = useCallback((page, { restoreScroll = true } = {}) => {
    const previousPage = pageRef.current;
    if (page === previousPage) return;

    if (previousPage === 'home') {
      homeScrollY.current = window.scrollY;
    }

    pageRef.current = page;
    flushSync(() => setCurrentPage(page));

    if (restoreScroll) {
      window.scrollTo({ top: page === 'home' ? homeScrollY.current : 0, behavior: 'auto' });
    }
  }, []);

  const goToPage = (page) => {
    setMenuOpen(false);
    if (page === pageRef.current) return;
    window.history.pushState(null, '', pageRoutes[page] ?? getHomeUrl());
    showPage(page);
  };

  useEffect(() => {
    const syncPageWithUrl = () => showPage(getPageFromHash());

    window.addEventListener('popstate', syncPageWithUrl);
    return () => window.removeEventListener('popstate', syncPageWithUrl);
  }, [showPage]);

  useEffect(() => {
    document.title = pageTitles[currentPage] ?? siteConfig.title;
  }, [currentPage]);

  const handleSectionScroll = (event, targetId) => {
    event.preventDefault();
    setMenuOpen(false);

    if (pageRef.current !== 'home') {
      window.history.pushState(null, '', getHomeUrl());
      showPage('home', { restoreScroll: false });
    }

    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  };

  return (
    <>
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
