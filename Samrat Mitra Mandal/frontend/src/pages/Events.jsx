import { Download, Send } from 'lucide-react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { events } from '../data/content';

export default function Events() {
  return (
    <>
      <SEO title="कार्यक्रम व उत्सव वेळापत्रक" description="गणेशोत्सव दिवसनिहाय वेळापत्रक, महा आरती, सांस्कृतिक कार्यक्रम, स्पर्धा आणि मिरवणूक तपशील." path="/events" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="गणेशोत्सव वेळापत्रक" title="दिवसनिहाय उत्सव कॅलेंडर" />
        <div className="mb-8 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 font-bold text-white"><Download className="h-5 w-5" /> PDF वेळापत्रक डाउनलोड</button>
          <button className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 font-bold"><Send className="h-5 w-5" /> WhatsApp अपडेट्स मिळवा</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {events.map((event) => (
            <article key={event.title} className="rounded-lg border border-gold/30 bg-white p-5 shadow-xl dark:bg-white/8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">{event.day}</p>
              <h3 className="mt-3 text-xl font-extrabold">{event.title}</h3>
              <p className="mt-3 text-sm text-stone-600 dark:text-cream/70">{event.date}</p>
              <p className="mt-1 font-bold text-temple dark:text-gold">{event.time}</p>
              <span className="mt-4 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-maroon dark:bg-white/10 dark:text-gold">{event.type}</span>
              <button className="mt-5 w-full rounded-full bg-gold px-4 py-2 font-black text-maroon">नोंदणी करा</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
