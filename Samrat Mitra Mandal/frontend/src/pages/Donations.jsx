import { CheckCircle2, CreditCard, QrCode } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

const categories = ['Annadan', 'Decoration', 'Social Work', 'Festival Support'];
const categoryLabels = {
  Annadan: 'अन्नदान',
  Decoration: 'सजावट',
  'Social Work': 'सामाजिक कार्य',
  'Festival Support': 'उत्सव सहाय्य'
};

export default function Donations() {
  const [form, setForm] = useState({ name: '', phone: '', amount: 1101, category: 'Annadan' });
  const [message, setMessage] = useState('');

  async function submitDonation(event) {
    event.preventDefault();
    try {
      await api.post('/donations', form);
      setMessage('देणगी नोंद झाली. लाईव्ह Razorpay keys जोडल्यावर checkout सुरू होईल.');
    } catch {
      setMessage('डेमो देणगी स्थानिकरित्या नोंद झाली.');
    }
  }

  return (
    <>
      <SEO title="देणगी" description="अन्नदान, सजावट, सामाजिक कार्य आणि गणेशोत्सवासाठी ऑनलाईन देणगी द्या." path="/donations" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="देणगी सेवा" title="विश्वासाने आणि पारदर्शकतेने योगदान द्या">सुरक्षित UPI, कार्ड, नेटबँकिंग किंवा Razorpay checkout द्वारे उत्सव आणि वर्षभराच्या सेवेकरिता मदत करा.</SectionTitle>
        <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <form onSubmit={submitDonation} className="temple-panel rounded-lg p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 font-semibold">नाव<input className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
              <label className="grid gap-2 font-semibold">मोबाईल<input className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></label>
              <label className="grid gap-2 font-semibold">रक्कम<input type="number" min="101" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} /></label>
              <label className="grid gap-2 font-semibold">देणगी प्रकार<select className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((item) => <option key={item} value={item}>{categoryLabels[item]}</option>)}</select></label>
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 font-black text-white"><CreditCard className="h-5 w-5" /> सुरक्षित पुढे जा</button>
            {message && <p className="mt-4 rounded-lg bg-green-100 p-3 font-semibold text-green-800">{message}</p>}
          </form>

          <aside className="rounded-lg bg-[#210b0b] p-6 text-cream shadow-divine">
            <QrCode className="h-12 w-12 text-gold" />
            <h3 className="mt-4 text-2xl font-black">UPI QR देणगी</h3>
            <div className="mt-5 grid aspect-square max-w-xs place-items-center rounded-lg bg-white p-5 text-maroon">
              <div className="grid h-full w-full place-items-center border-4 border-maroon text-center font-black">SMM<br />UPI QR</div>
            </div>
            <p className="mt-5 text-cream/72">UPI ID: samratmitramandal@upi</p>
            <div className="mt-6">
              <div className="flex justify-between text-sm"><span>उत्सव निधी ध्येय</span><strong>₹7.8L / ₹12L</strong></div>
              <div className="mt-2 h-3 rounded-full bg-white/15"><div className="h-full w-[65%] rounded-full bg-gradient-to-r from-gold to-saffron" /></div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {['Shri A. Kulkarni - ₹51,000', 'Smt. P. Deshmukh - ₹25,000', 'Samrat Youth Group - ₹21,000'].map((donor) => (
            <div key={donor} className="rounded-lg bg-white p-5 shadow-xl dark:bg-white/8"><CheckCircle2 className="mb-3 h-6 w-6 text-green-600" />{donor}</div>
          ))}
        </div>
      </section>
    </>
  );
}
