import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@samratmitramandal.org', password: 'GanpatiBappa@108' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('smm_token', data.token);
      navigate('/admin');
    } catch {
      setError('लॉगिन अयशस्वी. Backend seed किंवा credentials तपासा.');
    }
  }

  return (
    <>
      <SEO title="अॅडमिन लॉगिन" path="/login" />
      <section className="section-shell grid min-h-[70vh] place-items-center py-16">
        <form onSubmit={submit} className="temple-panel w-full max-w-md rounded-lg p-6">
          <SectionTitle eyebrow="अॅडमिन" title="डॅशबोर्ड लॉगिन" />
          <div className="grid gap-4">
            <input type="email" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="rounded-lg border border-gold/30 bg-white/80 px-4 py-3 text-stone-950" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-800">{error}</p>}
          <button className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-black text-white">लॉगिन करा</button>
        </form>
      </section>
    </>
  );
}
