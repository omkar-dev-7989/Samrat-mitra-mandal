import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  return (
    <>
      <SEO title="संपर्क" description="फोन, WhatsApp, ईमेल, सोशल मीडिया आणि चौकशी फॉर्मद्वारे सम्राट मित्र मंडळाशी संपर्क करा." path="/contact" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="संपर्क" title="मंडळाशी संपर्क साधा" />
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="grid gap-4">
            <Info icon={MapPin} title="पत्ता" copy="सम्राट मित्र मंडळ चौक, पुणे, महाराष्ट्र" />
            <Info icon={Phone} title="फोन" copy="+91 99999 99999" />
            <Info icon={Mail} title="ईमेल" copy="seva@samratmitramandal.org" />
            <a href="https://wa.me/919999999999" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-black text-white"><MessageCircle /> WhatsApp संपर्क</a>
          </div>
          <form className="temple-panel rounded-lg p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="नाव" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" />
              <input placeholder="मोबाईल" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" />
              <input placeholder="ईमेल" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950 sm:col-span-2" />
              <textarea placeholder="चौकशी" rows="5" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950 sm:col-span-2" />
            </div>
            <button className="mt-5 rounded-full bg-maroon px-6 py-3 font-black text-white">चौकशी पाठवा</button>
          </form>
        </div>
        <div className="mt-8 overflow-hidden rounded-lg border border-gold/30 shadow-xl">
          <iframe title="सम्राट मित्र मंडळ नकाशा" className="h-96 w-full" loading="lazy" src="https://maps.google.com/maps?q=Pune%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed" />
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, title, copy }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-xl dark:bg-white/8">
      <Icon className="mb-3 h-7 w-7 text-temple dark:text-gold" />
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mt-1 text-stone-600 dark:text-cream/72">{copy}</p>
    </div>
  );
}
