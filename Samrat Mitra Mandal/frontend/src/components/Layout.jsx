import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bell, HandHeart, Home, Languages, Menu, Moon, Music2, Radio, Sun, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { navItems, announcements } from '../data/content';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, festiveMode, setFestiveMode, soundOn, setSoundOn } = useApp();

  function toggleBellSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (!next) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const context = new AudioCtx();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.8);
    [523.25, 784, 1046.5].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.03);
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.03);
      oscillator.stop(context.currentTime + 1.85);
    });
    gain.connect(context.destination);
  }

  return (
    <div className="min-h-screen bg-cream text-stone-950 transition-colors dark:bg-[#170808] dark:text-cream">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <div className="absolute left-6 top-24 h-24 w-24 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-8 top-1/3 h-28 w-28 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-28 w-28 rounded-full bg-temple/15 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-maroon/95 text-sm text-cream shadow-lg backdrop-blur">
          <div className="section-shell flex h-9 items-center overflow-hidden">
            <Bell className="mr-3 h-4 w-4 text-gold" />
            <div className="no-scrollbar flex min-w-[900px] animate-ticker gap-10 whitespace-nowrap">
              {[...announcements, ...announcements].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <nav className="border-b border-gold/20 bg-white/82 backdrop-blur-xl dark:bg-[#210b0b]/82">
          <div className="section-shell flex h-20 items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <img src="/images/mandal/new samarat.png" alt="Samrat Mitra Mandal" className="h-20 w-20 flex-shrink-0 drop-shadow-lg" />
              <div>
                <p className="mandal-title font-display text-2xl sm:text-4xl leading-tight animate-glow">सम्राट मित्र मंडळ</p>
              </div>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-temple text-white shadow-lg' : 'hover:bg-saffron/10'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/60 dark:bg-white/10" title="भाषा" onClick={() => setLanguage('mr')}>
                <Languages className="h-5 w-5" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/60 dark:bg-white/10" title="उत्सवी मोड" onClick={() => setFestiveMode(!festiveMode)}>
                {festiveMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/60 dark:bg-white/10" title="मंदिर घंटानाद" onClick={toggleBellSound}>
                <Music2 className={`h-5 w-5 ${soundOn ? 'text-temple dark:text-gold' : ''}`} />
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-white xl:hidden" title="मेनू" onClick={() => setOpen(!open)}>
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {open && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="section-shell pb-5 xl:hidden">
              <div className="grid gap-2 rounded-lg border border-gold/25 bg-white/95 p-3 shadow-xl dark:bg-[#210b0b]">
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 font-semibold hover:bg-saffron/10">
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      <main className="relative z-10 pb-20 pt-[7.25rem] md:pb-0">
        <Outlet />
      </main>

      <Footer />
      <FloatingActions />
      <MobileBottomNav />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 bg-[#210b0b] text-cream">
      <div className="section-shell grid gap-8 py-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <h2 className="font-display text-3xl font-bold gold-text">Samrat Mitra Mandal</h2>
          <p className="mt-3 max-w-xl text-cream/78">दर्शन, सेवा, संस्कृती आणि सामाजिक जबाबदारीला वाहिलेले समाजकेंद्रित गणेशोत्सव मंडळ.</p>
          <div className="mt-5 flex gap-3 text-sm font-semibold">
            <a className="rounded-full bg-gold px-4 py-2 text-maroon" href="https://wa.me/919999999999">WhatsApp अपडेट्स</a>
            <a className="rounded-full border border-gold/40 px-4 py-2" href="/contact">संपर्क</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold">संपर्क</h3>
          <p className="mt-3 text-sm text-cream/78">सम्राट मित्र मंडळ चौक, पुणे, महाराष्ट्र</p>
          <p className="mt-2 text-sm text-cream/78">+91 99999 99999</p>
          <p className="mt-2 text-sm text-cream/78">seva@samratmitramandal.org</p>
        </div>
        <div>
          <h3 className="font-bold text-gold">सोशल मीडिया</h3>
          <div className="mt-3 grid gap-2 text-sm text-cream/78">
            <a href="https://instagram.com">Instagram</a>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://youtube.com">YouTube लाईव्ह</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-4">
      <Link to="/donations" className="rounded-full bg-gradient-to-r from-gold to-saffron px-5 py-3 text-sm font-extrabold text-maroon shadow-gold">देणगी</Link>
      <Link to="/live-darshan" className="rounded-full bg-maroon px-5 py-3 text-sm font-extrabold text-white shadow-divine">लाईव्ह दर्शन</Link>
    </div>
  );
}

function MobileBottomNav() {
  const items = [
    { to: '/', icon: Home, label: 'होम' },
    { to: '/live-darshan', icon: Radio, label: 'दर्शन' },
    { to: '/donations', icon: HandHeart, label: 'देणगी' },
    { to: '/volunteer', icon: UserPlus, label: 'जॉईन' }
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-white/90 px-2 py-2 backdrop-blur-xl dark:bg-[#210b0b]/92 md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `grid place-items-center rounded-lg py-2 text-[11px] font-black ${isActive ? 'bg-gold text-maroon' : 'text-stone-700 dark:text-cream/72'}`}>
            <Icon className="mb-1 h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
