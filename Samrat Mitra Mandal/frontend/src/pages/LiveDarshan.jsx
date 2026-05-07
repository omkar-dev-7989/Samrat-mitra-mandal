import { RefreshCcw, Wifi } from 'lucide-react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { aartiTimes } from '../data/content';

export default function LiveDarshan() {
  return (
    <>
      <SEO title="लाईव्ह दर्शन" description="सम्राट मित्र मंडळाचे लाईव्ह दर्शन, आरती वेळा आणि प्रसारण स्थिती." path="/live-darshan" />
      <section className="bg-[#170808] py-16 text-cream">
        <div className="section-shell">
          <SectionTitle eyebrow="लाईव्ह दर्शन" title="जिथे असाल तिथून दर्शन" center>भक्तिमय वातावरण, मोबाईलसाठी अनुकूल रचना आणि अद्ययावत लाईव्ह स्थितीसह दर्शनाचा अनुभव घ्या.</SectionTitle>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
            <div className="overflow-hidden rounded-lg border border-gold/30 bg-black shadow-divine">
              <div className="flex items-center justify-between border-b border-gold/30 px-5 py-4">
                <span className="inline-flex items-center gap-2 font-bold text-gold"><Wifi className="h-5 w-5" /> प्रसारण स्थिती: सुरू</span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-cream/70"><RefreshCcw className="h-4 w-4" /> दर ६० सेकंदांनी अपडेट</span>
              </div>
              <div className="aspect-video">
                <iframe className="h-full w-full" src="https://www.youtube.com/embed/live_stream?channel=UC_x5XG1OV2P6uZZ5FSM9Ttw" title="लाईव्ह दर्शन" allowFullScreen />
              </div>
            </div>
            <aside className="temple-panel rounded-lg p-6">
              <h3 className="text-2xl font-black text-gold">आरती वेळापत्रक</h3>
              <div className="mt-5 grid gap-3">
                {aartiTimes.map((item) => (
                  <div key={item.name} className="flex justify-between rounded-lg bg-white/10 p-4">
                    <span>{item.name}</span>
                    <strong className="text-gold">{item.time}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
