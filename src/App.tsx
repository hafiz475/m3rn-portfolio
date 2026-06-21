import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Journal } from './components/Journal';
import { JournalPostDetail } from './components/JournalPostDetail';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Track active section via IntersectionObserver for navbar synchronization
  useEffect(() => {
    if (isLoading || selectedPostId) return;

    const sections = ['home', 'work', 'journal', 'playground', 'contact'];
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
  }, [isLoading, selectedPostId]);

  // Smooth scroll handler
  const handleNavClick = (sectionId: string) => {
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
        <div className="relative min-h-screen bg-bg text-text-primary selection:bg-text-primary/25 selection:text-text-primary md:cursor-none">
          {/* Custom Cursor (desktop only) */}
          <CustomCursor />

          {selectedPostId ? (
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
              <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

              {/* Sections */}
              <main>
                {/* Hero Section */}
                <Hero
                  onSeeWorksClick={() => handleNavClick('work')}
                  onReachOutClick={() => handleNavClick('contact')}
                />

                {/* Selected Works Bento Grid */}
                <SelectedWorks />

                {/* Journal Entries */}
                <Journal onPostClick={(postId) => setSelectedPostId(postId)} />

                {/* Explorations Parallax Gallery */}
                <Explorations />

                {/* Stats Section */}
                <Stats />

                {/* Contact Section */}
                <Contact />
              </main>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
