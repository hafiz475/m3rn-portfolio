import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Journal } from './components/Journal';
import { JournalPostDetail } from './components/JournalPostDetail';
import { Explorations } from './components/Explorations';
import { TechStack } from './components/TechStack';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';
import { GlobalVideoBackground } from './components/GlobalVideoBackground';
import { CompassModal } from './components/CompassModal';
import { CaseStudies } from './components/CaseStudies';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { CASE_STUDIES_HASH, caseStudyHash } from './components/caseStudyShared';
import { CASE_STUDIES } from './data/caseStudies';

type Route = { view: 'home' } | { view: 'case-studies' } | { view: 'case-study'; id: string };

const routeFromHash = (): Route => {
  const hash = window.location.hash;
  if (hash === CASE_STUDIES_HASH) return { view: 'case-studies' };
  if (hash.startsWith(`${CASE_STUDIES_HASH}/`)) {
    const id = decodeURIComponent(hash.slice(CASE_STUDIES_HASH.length + 1));
    return CASE_STUDIES.some((study) => study.id === id) ? { view: 'case-study', id } : { view: 'case-studies' };
  }
  return { view: 'home' };
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCompassOpen, setIsCompassOpen] = useState(false);
  // Section to scroll to once the home view has mounted again
  const pendingSection = useRef<string | null>(null);
  // Whether the open case study was reached by a click here, so Back can return to it
  const caseOpenedInApp = useRef(false);
  const view = route.view;
  const routeKey = route.view === 'case-study' ? `case-study:${route.id}` : route.view;

  // Keep the view in sync with the URL so Back/Forward and shared links work
  useEffect(() => {
    const handleHashChange = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Each view starts at the top. Coming back home, return to the section the visitor left from.
  useEffect(() => {
    if (view !== 'home') {
      window.scrollTo(0, 0);
      return;
    }
    const target = pendingSection.current;
    pendingSection.current = null;
    const el = target ? document.getElementById(target) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'auto' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [routeKey, view]);

  // Track active section via IntersectionObserver for navbar synchronization
  useEffect(() => {
    if (isLoading || selectedPostId || view !== 'home') return;

    const sections = ['home', 'work', 'case-studies', 'journal', 'playground', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger activation when section takes up the main view area
          rootMargin: '-40% 0px -50% 0px',
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isLoading, selectedPostId, view]);

  const openCaseStudy = (id: string, fromSection: string | null) => {
    if (fromSection) pendingSection.current = fromSection;
    caseOpenedInApp.current = true;
    window.location.hash = caseStudyHash(id);
  };

  // Next/previous replace the current entry, so Back still leads out of the reader
  const switchCaseStudy = (id: string) => {
    history.replaceState(null, '', caseStudyHash(id));
    setRoute({ view: 'case-study', id });
  };

  const closeCaseStudy = () => {
    if (caseOpenedInApp.current) {
      caseOpenedInApp.current = false;
      history.back();
    } else {
      window.location.hash = CASE_STUDIES_HASH;
    }
  };

  // Smooth scroll handler
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'case-studies') {
      if (view === 'case-studies') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = CASE_STUDIES_HASH;
      }
      return;
    }

    if (view !== 'home') {
      pendingSection.current = sectionId;
      setActiveSection(sectionId);
      history.pushState(null, '', window.location.pathname + window.location.search);
      setRoute({ view: 'home' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen text-text-primary selection:bg-text-primary/25 selection:text-text-primary md:cursor-none">
          {/* Global Video Background */}
          {!selectedPostId && view !== 'case-study' && <GlobalVideoBackground />}
          {/* Custom Cursor (desktop only) */}
          <CustomCursor />

          {route.view === 'case-study' ? (
            <CaseStudyDetail
              id={route.id}
              onBack={closeCaseStudy}
              onSwitch={switchCaseStudy}
              onViewAll={() => {
                caseOpenedInApp.current = false;
                window.location.hash = CASE_STUDIES_HASH;
              }}
            />
          ) : selectedPostId ? (
            <JournalPostDetail
              postId={selectedPostId}
              onBack={() => {
                setSelectedPostId(null);
                setTimeout(() => {
                  const el = document.getElementById('journal');
                  if (el) {
                    el.scrollIntoView({ behavior: 'auto' });
                  }
                }, 50);
              }}
            />
          ) : (
            <>
              {/* Navigation */}
              <Navbar
                activeSection={view === 'case-studies' ? 'case-studies' : activeSection}
                onNavClick={handleNavClick}
                onCompassClick={() => setIsCompassOpen(true)}
              />

              {view === 'case-studies' ? (
                <CaseStudies />
              ) : (
                <main>
                  {/* Hero Section */}
                  <Hero
                    onSeeWorksClick={() => handleNavClick('work')}
                    onReachOutClick={() => handleNavClick('contact')}
                  />

                  {/* Selected Works Bento Grid */}
                  <SelectedWorks onOpenCaseStudy={(id) => openCaseStudy(id, 'work')} />

                  {/* Case studies, opening into the reader */}
                  <CaseStudiesSection
                    onOpen={(id) => openCaseStudy(id, 'case-studies')}
                    onViewAll={() => {
                      window.location.hash = CASE_STUDIES_HASH;
                    }}
                  />

                  {/* Journal Entries */}
                  <Journal onPostClick={(postId) => setSelectedPostId(postId)} />

                  {/* Explorations Parallax Gallery */}
                  <Explorations />

                  {/* Tech Stack marquees */}
                  <TechStack />

                  {/* Stats Section */}
                  <Stats />

                  {/* Contact Section */}
                  <Contact />
                </main>
              )}
            </>
          )}
        </div>
      )}
      <AnimatePresence>
        {isCompassOpen && (
          <CompassModal onClose={() => setIsCompassOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
