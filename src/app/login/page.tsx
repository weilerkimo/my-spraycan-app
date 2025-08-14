'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const redirect = typeof window !== 'undefined'
      ? `${window.location.origin}/dashboard`
      : undefined;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirect },
    });

    setLoading(false);
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#100F10] text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-[#777777]">Wir senden dir einen Magic‑Link.</p>
        <input
          type="email" required placeholder="dein@mail.ch"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          className="w-full rounded bg-white/10 p-3 outline-none"
        />
        <button disabled={loading}
          className="w-full rounded bg-[#FCBA04] p-3 text-black font-semibold disabled:opacity-50">
          {loading ? 'Sende…' : 'Magic‑Link senden'}
        </button>
        {sent && <div className="text-sm text-[#C879FF]">Mail gesendet – Postfach prüfen.</div>}
      </form>
    </main>
  );
}