import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { trustees } from '../data/content';

const timeline = [
  ['1998', 'लहानशा गणेश मूर्तीपासून सम्राट मित्र मंडळाची भक्तिमय सुरुवात.'],
  ['2005', 'गणेशोत्सवात रक्तदान आणि अन्नदान सेवेची नियोजित सुरुवात.'],
  ['2012', 'भजन संध्या, विद्यार्थी स्पर्धा आणि सांस्कृतिक कार्यक्रमांचा विस्तार.'],
  ['2018', 'डिजिटल दर्शन, ऑनलाईन देणगी नोंद आणि स्वयंसेवक नोंदणी सुरू.'],
  ['2026', 'जगभरातील भक्तांसाठी आधुनिक लाईव्ह समुदाय व्यासपीठ.']
];

export default function About() {
  return (
    <>
      <SEO title="मंडळाविषयी" description="सम्राट मित्र मंडळाचा इतिहास, विश्वस्त, सामाजिक कार्य, यश आणि गणेशोत्सव प्रवास." path="/about" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="मंडळाविषयी" title="भक्तीची मुळे, समाजाचा आधार">
          १९९८ मध्ये सुरू झालेले सम्राट मित्र मंडळ आज शिस्तबद्ध उत्सव व्यवस्था, समाजसेवा आणि सांस्कृतिक परंपरेसाठी ओळखले जाणारे विश्वासू गणेशोत्सव मंडळ आहे.
        </SectionTitle>
        <div className="grid gap-6 lg:grid-cols-3">
          {['शिस्तबद्ध भक्ती', 'पारदर्शक सेवा', 'महाराष्ट्रीय संस्कृती'].map((value) => (
            <div key={value} className="temple-panel rounded-lg p-6">
              <h3 className="text-xl font-extrabold">{value}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-cream/70">दिव्य, सुरक्षित आणि सर्वसमावेशक गणेशोत्सव साजरा करत वर्षभर समाजसेवा करणे हे आमचे ध्येय आहे.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#210b0b] py-16 text-cream">
        <div className="section-shell">
          <SectionTitle eyebrow="गणेशोत्सव प्रवास" title="मंडळाची वाटचाल" />
          <div className="relative border-l border-gold/50 pl-6">
            {timeline.map(([year, text]) => (
              <div key={year} className="mb-8 rounded-lg bg-white/8 p-5 backdrop-blur">
                <span className="-ml-9 mr-4 inline-grid h-10 w-10 place-items-center rounded-full bg-gold font-black text-maroon">{year.slice(-2)}</span>
                <h3 className="inline text-2xl font-black text-gold">{year}</h3>
                <p className="mt-3 text-cream/76">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionTitle eyebrow="विश्वस्त मंडळ" title="सेवेच्या मागची माणसे" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustees.map((member) => (
            <div key={member.name} className="rounded-lg border border-gold/30 bg-white p-6 text-center shadow-xl dark:bg-white/8">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-temple text-2xl font-black text-maroon">{member.name[5]}</div>
              <h3 className="mt-4 text-xl font-extrabold">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-temple dark:text-gold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-50 py-16 dark:bg-[#210b0b]">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="जुनी गॅलरी" title="मंडळ घडवणाऱ्या आठवणी" />
            <p className="leading-7 text-stone-700 dark:text-cream/72">स्थापनेचे फोटो, जुन्या मंडप सजावटी, संस्थापकांची छायाचित्रे, वृत्तपत्रातील कात्रणे, पुरस्कार आणि मिरवणुकीचे क्षण येथे जतन केले आहेत.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['/images/mandal/flower-darshan-red.jpg', '/images/mandal/silver-red-darshan.jpg', '/images/mandal/social-quote.png', '/images/mandal/devotional-poster.png'].map((item) => (
              <div key={item} className="h-40 overflow-hidden rounded-lg bg-maroon shadow-xl">
                <img src={item} alt="मंडळाच्या जुन्या आठवणी" className="h-full w-full object-cover opacity-80 sepia" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
