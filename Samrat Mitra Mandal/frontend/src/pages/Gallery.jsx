import { useState } from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { gallery } from '../data/content';

const filters = ['सर्व', '२०२५', '२०२४', '२०२३', '२०२२'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const items = filter === 'सर्व' ? gallery : gallery.filter((item) => item.year === filter);

  return (
    <>
      <SEO title="गॅलरी" description="छायाचित्रे, व्हिडिओ, सजावट, विसर्जन क्षण आणि भक्तिमय उत्सव दृश्ये." path="/gallery" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="गॅलरी" title="छायाचित्रे, व्हिडिओ आणि भक्तिमय क्षण" />
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item} className={`rounded-full px-5 py-2 font-bold ${filter === item ? 'bg-maroon text-white' : 'border border-gold/40'}`} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <div className="masonry">
          {items.map((item) => (
            <button key={item.title} className={`masonry-item mb-4 w-full overflow-hidden rounded-lg bg-maroon text-left shadow-xl ${item.height}`} onClick={() => setActive(item)}>
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
              <div className="-mt-20 relative bg-gradient-to-t from-black/85 to-transparent p-4 text-cream">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{item.category} | {item.year}</p>
                <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>
      {active && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/82 p-4" onClick={() => setActive(null)}>
          <div className="max-w-4xl overflow-hidden rounded-lg bg-[#210b0b] text-cream shadow-divine">
            {active.video ? (
              <video src={active.video} className="max-h-[75vh] w-full" controls autoPlay />
            ) : (
              <img src={active.image} alt={active.title} className="max-h-[75vh] w-full object-contain" />
            )}
            <div className="p-5">
              <h3 className="text-2xl font-black">{active.title}</h3>
              <p className="text-gold">{active.category} | {active.year}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
