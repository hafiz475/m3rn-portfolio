import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { ScrollVideoBackground } from './ScrollVideoBackground';
import { JOURNAL_POSTS } from '../data/journalPosts';

// Re-export for Journal.tsx consumption
export { JOURNAL_POSTS } from '../data/journalPosts';
export type { JournalPost, ContentBlock } from '../data/journalPosts';

interface JournalPostDetailProps {
  postId: string;
  onBack: () => void;
}

export const JournalPostDetail: React.FC<JournalPostDetailProps> = ({ postId, onBack }) => {
  const post = JOURNAL_POSTS.find((p) => p.id === postId) || JOURNAL_POSTS[0];
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const storageKey = `portfolio-journal-likes-${post.id}`;
    const storedLikes = localStorage.getItem(storageKey);
    const hasLiked = localStorage.getItem(`${storageKey}-liked`);

    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10));
    } else {
      const initialVal = Math.floor(Math.random() * 50) + 75;
      setLikes(initialVal);
      localStorage.setItem(storageKey, String(initialVal));
    }

    if (hasLiked) {
      setLiked(true);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const range = docHeight - vh;
      if (range > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / range)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id]);

  const handleLike = () => {
    const storageKey = `portfolio-journal-likes-${post.id}`;
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
      localStorage.setItem(storageKey, String(likes - 1));
      localStorage.removeItem(`${storageKey}-liked`);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);
      localStorage.setItem(storageKey, String(likes + 1));
      localStorage.setItem(`${storageKey}-liked`, 'true');
    }
  };

  const isCinematicPost = post.id === 'entry-1';
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4';

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-text-primary/25 pb-24">
      {isCinematicPost && (
        <ScrollVideoBackground videoUrl={videoUrl} overlayOpacity={0.65} zIndex={0} />
      )}

      {/* Floating Reader Header */}
      <div className="sticky top-6 left-0 right-0 z-50 w-full max-w-[90%] md:max-w-[750px] mx-auto px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full flex items-center justify-between bg-surface/85 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 shadow-xl pointer-events-auto"
        >
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-semibold text-muted hover:text-text-primary transition-colors cursor-pointer group focus:outline-none">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
          <span className="hidden sm:inline-block text-xs font-medium text-muted/80 truncate max-w-[280px]">{post.title}</span>
          <div className="flex items-center gap-3">
            <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer focus:outline-none ${liked ? 'bg-text-primary border-transparent text-bg font-bold scale-105' : 'bg-bg/40 border-white/5 text-text-primary hover:bg-stroke/40 hover:scale-105'}`}>
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-stroke rounded-full overflow-hidden">
            <div className="h-full accent-gradient transition-all duration-75" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className={`relative z-10 w-full max-w-[800px] mx-auto px-6 md:px-8 mt-16 sm:mt-24`}>
        {/* Cover Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="bg-surface border border-white/5 rounded-full px-3.5 py-1.5 font-semibold text-text-primary tracking-wide">{post.category}</span>
            <div className="flex items-center gap-1.5 ml-2"><Calendar className="w-3.5 h-3.5" /><span>{post.date}</span></div>
            <span className="w-1.5 h-1.5 bg-stroke rounded-full" />
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{post.readTime}</span></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary font-display font-medium leading-[1.15] tracking-tight">{post.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted font-body leading-relaxed max-w-[700px] border-l-2 border-stroke pl-5 italic mt-2">{post.summary}</p>
          {!isCinematicPost && (
            <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-stroke shadow-xl mt-6">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
        </motion.div>

        {/* Article Body */}
        <div className={`mt-10 sm:mt-16 flex flex-col gap-8 text-text-primary/95 font-body text-[15px] sm:text-base leading-[1.85] ${isCinematicPost ? 'bg-bg/65 backdrop-blur-md p-6 sm:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl' : ''}`}>
          {post.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={idx} className="font-light tracking-wide text-text-primary/90">{block.value}</p>;
              case 'heading':
                return <h2 key={idx} className="text-xl sm:text-2xl md:text-3xl text-text-primary font-display font-semibold tracking-tight mt-6">{block.value}</h2>;
              case 'quote':
                return (
                  <div key={idx} className="bg-surface/40 border-y border-stroke/70 py-8 px-6 sm:px-10 rounded-[20px] my-4 flex flex-col gap-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Sparkles className="w-16 h-16 text-text-primary" /></div>
                    <p className="text-base sm:text-lg md:text-xl font-display font-medium italic text-text-primary/90 leading-relaxed">"{block.value}"</p>
                  </div>
                );
              case 'code':
                return (
                  <div key={idx} className="w-full rounded-2xl bg-black border border-stroke overflow-hidden my-4">
                    <div className="flex items-center justify-between bg-surface/50 border-b border-stroke px-5 py-3 text-xs text-muted font-mono">
                      <span>{block.language || 'code'}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
                        <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
                        <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
                      </div>
                    </div>
                    <pre className="p-5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-text-primary/80"><code>{block.value}</code></pre>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-24 border-t border-stroke pt-12 flex flex-col items-center justify-center text-center gap-6">
          <div className="w-12 h-12 rounded-full border border-stroke flex items-center justify-center bg-surface"><BookOpen className="w-5 h-5 text-muted" /></div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-text-primary font-display">Enjoyed this thought?</h3>
            <p className="text-xs sm:text-sm text-muted max-w-[320px] leading-relaxed">Show your appreciation by giving a heart or share your thoughts.</p>
          </div>
          <button onClick={handleLike} className={`group relative rounded-full text-sm font-semibold p-[1.5px] focus:outline-none overflow-visible transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer ${liked ? 'scale-105' : ''}`}>
            <span className="absolute inset-0 rounded-full accent-gradient" />
            <span className={`relative flex items-center gap-2 rounded-full px-8 py-3.5 transition-colors duration-300 font-bold ${liked ? 'bg-text-primary text-bg' : 'bg-surface hover:bg-bg/90 text-text-primary'}`}>
              <Heart className={`w-4 h-4 transition-transform duration-300 ${liked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
              <span>{liked ? 'Liked Post' : 'Like Post'}</span>
              <span className="w-px h-3 bg-stroke/50 mx-1" />
              <span>{likes}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
