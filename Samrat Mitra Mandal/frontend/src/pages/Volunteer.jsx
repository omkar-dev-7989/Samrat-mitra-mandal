import { Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

const skills = ['गर्दी व्यवस्थापन', 'आरती सहाय्य', 'वैद्यकीय शिबिर', 'छायाचित्रण', 'सजावट', 'रक्तदान'];

export default function Volunteer() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', skills: [], availability: 'सायंकाळ', bloodDonation: false });
  const [done, setDone] = useState(false);

  async function submit(event) {
    event.preventDefault();
    try {
      await api.post('/volunteers', form);
    } finally {
      setDone(true);
    }
  }

  function toggleSkill(skill) {
    const skillsNext = form.skills.includes(skill) ? form.skills.filter((item) => item !== skill) : [...form.skills, skill];
    setForm({ ...form, skills: skillsNext });
  }

  return (
    <>
      <SEO title="स्वयंसेवक नोंदणी" description="कार्यक्रम, सेवा आणि रक्तदान उपक्रमांसाठी सम्राट मित्र मंडळाचा स्वयंसेवक बना." path="/volunteer" />
      <section className="section-shell py-16">
        <SectionTitle eyebrow="स्वयंसेवक नोंदणी" title="मंडळाच्या सेवा टीममध्ये सामील व्हा" />
        <form onSubmit={submit} className="temple-panel max-w-4xl rounded-lg p-6">
          <div className="mb-6 flex gap-2">
            {[1, 2, 3].map((item) => <span key={item} className={`h-2 flex-1 rounded-full ${step >= item ? 'bg-gold' : 'bg-stone-200 dark:bg-white/15'}`} />)}
          </div>
          {done ? (
            <div className="grid min-h-80 place-items-center text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-600 text-white"><Check className="h-10 w-10" /></div>
                <h3 className="mt-5 text-3xl font-black">नोंदणी सबमिट झाली</h3>
                <p className="mt-2 text-stone-600 dark:text-cream/70">मंजुरीची माहिती WhatsApp किंवा ईमेलद्वारे कळवली जाईल.</p>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-semibold">नाव<input required className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                <label className="grid gap-2 font-semibold">मोबाईल<input required className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
                <label className="grid gap-2 font-semibold sm:col-span-2">ईमेल<input type="email" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              </div>}
              {step === 2 && <div className="grid gap-3 sm:grid-cols-2">
                {skills.map((skill) => <button type="button" key={skill} onClick={() => toggleSkill(skill)} className={`rounded-lg border p-4 text-left font-bold ${form.skills.includes(skill) ? 'border-gold bg-gold/20' : 'border-gold/30'}`}>{skill}</button>)}
              </div>}
              {step === 3 && <div className="grid gap-4">
                <label className="grid gap-2 font-semibold">उपलब्ध वेळ<select className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}><option>सकाळ</option><option>दुपार</option><option>सायंकाळ</option><option>पूर्ण दिवस</option></select></label>
                <label className="flex items-center gap-3 rounded-lg border border-gold/30 p-4 font-semibold"><input type="checkbox" checked={form.bloodDonation} onChange={(e) => setForm({ ...form, bloodDonation: e.target.checked })} /> रक्तदान शिबिरासाठी नोंदणी करा</label>
              </div>}
              <div className="mt-6 flex justify-between">
                <button type="button" className="rounded-full border border-gold/40 px-5 py-3 font-bold" onClick={() => setStep(Math.max(1, step - 1))}>मागे</button>
                {step < 3 ? <button type="button" className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 font-bold text-white" onClick={() => setStep(step + 1)}>पुढे <ChevronRight /></button> : <button className="rounded-full bg-gold px-6 py-3 font-black text-maroon">सबमिट</button>}
              </div>
            </>
          )}
        </form>
      </section>
    </>
  );
}
