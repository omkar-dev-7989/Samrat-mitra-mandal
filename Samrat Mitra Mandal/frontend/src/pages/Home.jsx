import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, HandHeart, Play, Quote, ShieldCheck, Sparkles, Users } from 'lucide-react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import Countdown from '../components/Countdown';
import DiyaRow from '../components/DiyaRow';
import { aartiTimes, events, gallery, initiatives, testimonials } from '../data/content';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { t } = useApp();

  return (
    <>
      <SEO />
      <section className="relative -mt-[7.25rem] min-h-screen overflow-hidden bg-[#220908] pt-[7.25rem] text-cream">
        <img src="/images/mandal/closeup-blessing.jpg" alt="सम्राट मित्र मंडळ गणपती दर्शन" className="absolute inset-0 h-full w-full object-cover object-center opacity-78" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-maroon/35 to-[#170808]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#170808] to-transparent" />
        <div className="section-shell relative flex min-h-screen items-end pb-16 pt-32">
          <div className="max-w-4xl">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex rounded-full border border-gold/40 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur">
              पुणे गणेशोत्सव | समाजसेवा | लाईव्ह दर्शन
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl">
              <span className="gold-text animate-glow">गणपती बाप्पा मोरया</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg leading-8 text-cream/86">
              सम्राट मित्र मंडळात आपले स्वागत. भक्ती, महाराष्ट्रीय संस्कृती, उत्सवाची भव्यता आणि समाजसेवा यांचा दिव्य संगम येथे अनुभवायला मिळतो.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link to="/live-darshan" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-extrabold text-maroon shadow-gold"><Play className="h-5 w-5" /> लाईव्ह दर्शन पहा</Link>
              <Link to="/donations" className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-white/12 px-6 py-3 font-extrabold backdrop-blur"><HandHeart className="h-5 w-5" /> सेवेसाठी देणगी</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#170808] text-cream">
        <div className="section-shell grid gap-5 py-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="temple-panel rounded-lg p-5">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">{t.countdown}</p>
            <Countdown />
          </div>
          <div className="temple-panel rounded-lg p-5">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">आजचा सुविचार</p>
            <p className="text-2xl font-display font-bold">{t.quote}</p>
          </div>
        </div>
      </section>

      <DiyaRow />

      <section className="section-shell py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="overflow-hidden rounded-lg bg-[#160707] shadow-divine">
            <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4 text-cream">
              <span className="font-bold text-gold">लाईव्ह दर्शन</span>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black">LIVE</span>
            </div>
            <div className="aspect-video">
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/live_stream?channel=UC_x5XG1OV2P6uZZ5FSM9Ttw" title="सम्राट मित्र मंडळ लाईव्ह दर्शन" allowFullScreen loading="lazy" />
            </div>
          </div>
          <div className="temple-panel rounded-lg p-6">
            <SectionTitle eyebrow={t.aarti} title="आरती वेळापत्रक" />
            <div className="grid gap-3">
              {aartiTimes.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-white/70 p-4 dark:bg-white/8">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-temple dark:text-gold">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-orange-50 to-cream py-16 dark:from-[#210b0b] dark:to-[#170808]">
        <div className="section-shell">
          <SectionTitle eyebrow="उत्सव वेळापत्रक" title="आगामी कार्यक्रम" center>गणेशोत्सवातील धार्मिक विधी, सांस्कृतिक संध्या, स्पर्धा, सेवा उपक्रम आणि विसर्जन मिरवणूक एका सोप्या वेळापत्रकात.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((event) => (
              <motion.article whileHover={{ y: -6 }} key={event.title} className="rounded-lg border border-gold/30 bg-white p-5 shadow-xl dark:bg-white/8">
                <CalendarDays className="mb-5 h-8 w-8 text-temple dark:text-gold" />
                <p className="text-xs font-black uppercase tracking-[0.22em] text-saffron">{event.day}</p>
                <h3 className="mt-2 text-xl font-extrabold">{event.title}</h3>
                <p className="mt-3 text-sm text-stone-600 dark:text-cream/70">{event.date} | {event.time}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionTitle eyebrow="विशेष गॅलरी" title="उत्सवाचे भक्तिमय वातावरण" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.slice(0, 4).map((item) => (
            <div key={item.title} className="relative h-72 overflow-hidden rounded-lg bg-maroon shadow-divine">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-cream">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{item.category} | {item.year}</p>
                <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#210b0b] py-16 text-cream">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          <CTA icon={HandHeart} title="देणगी सेवा" copy="अन्नदान, सजावट, सामाजिक कार्य आणि उत्सव व्यवस्थेसाठी सुरक्षित ऑनलाईन देणगी द्या." to="/donations" />
          <CTA icon={Users} title="स्वयंसेवक बना" copy="कार्यक्रम व्यवस्था, वैद्यकीय शिबिरे, रक्तदान आणि गर्दी नियंत्रणासाठी नोंदणी करा." to="/volunteer" />
          <CTA icon={ShieldCheck} title="विश्वासू मंडळ" copy="पारदर्शक देणगी नोंद, व्यवस्थापन आणि समाजकेंद्रित कार्यपद्धती." to="/about" />
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionTitle eyebrow="सामाजिक उपक्रम" title="उत्सवापलीकडची सेवा" center />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.slice(0, 6).map((item) => (
            <motion.div whileHover={{ y: -5 }} key={item.title} className="temple-panel rounded-lg p-6">
              <Sparkles className="mb-5 h-7 w-7 text-temple dark:text-gold" />
              <p className="text-4xl font-black text-temple dark:text-gold">{item.stat}</p>
              <h3 className="mt-2 text-xl font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-cream/70">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-orange-50 py-16 dark:bg-[#210b0b]">
        <div className="section-shell">
          <SectionTitle eyebrow="भक्तांचे अनुभव" title="मनोगत" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((text) => (
              <div key={text} className="rounded-lg bg-white p-6 shadow-xl dark:bg-white/8">
                <Quote className="mb-4 h-7 w-7 text-gold" />
                <p className="leading-7 text-stone-700 dark:text-cream/78">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CTA({ icon: Icon, title, copy, to }) {
  return (
    <Link to={to} className="rounded-lg border border-gold/35 bg-white/8 p-6 backdrop-blur transition hover:bg-white/14">
      <Icon className="h-8 w-8 text-gold" />
      <h3 className="mt-5 text-2xl font-extrabold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-cream/76">{copy}</p>
    </Link>
  );
}
