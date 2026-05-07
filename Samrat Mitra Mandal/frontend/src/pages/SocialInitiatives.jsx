import { HeartHandshake } from 'lucide-react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { initiatives } from '../data/content';

export default function SocialInitiatives() {
  return (
    <>
      <SEO title="सामाजिक उपक्रम" description="रक्तदान, वृक्षारोपण, शैक्षणिक मदत, वैद्यकीय शिबिरे, अन्नदान आणि आपत्ती मदत." path="/social-initiatives" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="सामाजिक उपक्रम" title="वर्षभर सुरू राहणारी सेवा">मंडळाचे उपक्रम, दात्यांचा विश्वास आणि स्वयंसेवकांचा सहभाग दाखवणारा प्रभाव अहवाल.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item) => (
            <article key={item.title} className="temple-panel rounded-lg p-6">
              <HeartHandshake className="mb-5 h-8 w-8 text-temple dark:text-gold" />
              <p className="text-5xl font-black text-maroon dark:text-gold">{item.stat}</p>
              <h3 className="mt-3 text-2xl font-extrabold">{item.title}</h3>
              <p className="mt-2 text-stone-600 dark:text-cream/72">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
