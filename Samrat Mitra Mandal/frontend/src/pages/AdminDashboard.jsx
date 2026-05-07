import { BellRing, CalendarPlus, ImageUp, Radio, Shield, UserCheck, Users, WalletCards } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

const modules = [
  { title: 'कार्यक्रम व्यवस्थापन', icon: CalendarPlus, copy: 'गणेशोत्सव वेळापत्रक तयार, संपादित आणि प्रकाशित करा.' },
  { title: 'गॅलरी अपलोड', icon: ImageUp, copy: 'फोटो, व्हिडिओ लिंक, वर्ष, प्रकार आणि featured स्थिती जोडा.' },
  { title: 'लाईव्ह नियंत्रण', icon: Radio, copy: 'YouTube/Facebook live URL आणि stream स्थिती अपडेट करा.' },
  { title: 'घोषणा', icon: BellRing, copy: 'ticker संदेश आणि push notification drafts व्यवस्थापित करा.' },
  { title: 'देणगी नोंद', icon: WalletCards, copy: 'देणगी प्रकार, payment status आणि पावत्या पहा.' },
  { title: 'स्वयंसेवक मंजुरी', icon: UserCheck, copy: 'स्वयंसेवक approve, reject आणि कार्यक्रम assign करा.' },
  { title: 'युजर व्यवस्थापन', icon: Users, copy: 'Admin, editor आणि volunteer साठी role based access.' },
  { title: 'Push Notifications', icon: Shield, copy: 'दर्शन, आरती आणि गर्दीबाबत तातडीचे update पाठवा.' }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const statLabels = {
    events: 'कार्यक्रम',
    donations: 'देणगी',
    volunteers: 'स्वयंसेवक',
    announcements: 'घोषणा',
    users: 'युजर्स'
  };

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data)).catch(() => setStats({
      events: 10,
      donations: 128,
      volunteers: 64,
      announcements: 4
    }));
  }, []);

  return (
    <>
      <SEO title="अॅडमिन डॅशबोर्ड" path="/admin" />
      <section className="section-shell py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTitle eyebrow="अॅडमिन डॅशबोर्ड" title="मंडळ व्यवस्थापन" />
          {!localStorage.getItem('smm_token') && <Link to="/login" className="rounded-full bg-maroon px-5 py-3 font-black text-white">अॅडमिन लॉगिन</Link>}
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(stats || { events: 0, donations: 0, volunteers: 0, announcements: 0 }).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-white p-5 shadow-xl dark:bg-white/8">
              <p className="text-4xl font-black text-maroon dark:text-gold">{value}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-[0.22em] text-saffron">{statLabels[key] || key}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map(({ title, icon: Icon, copy }) => (
            <article key={title} className="temple-panel rounded-lg p-6">
              <Icon className="mb-5 h-8 w-8 text-temple dark:text-gold" />
              <h3 className="text-xl font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-cream/70">{copy}</p>
              <button className="mt-5 rounded-full border border-gold/40 px-4 py-2 text-sm font-black">व्यवस्थापित करा</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
