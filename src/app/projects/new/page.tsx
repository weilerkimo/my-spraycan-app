'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewProject() {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // 1) User prüfen
    const { data: u } = await supabase.auth.getUser();
    const user = u.user;
    if (!user) { alert('Bitte zuerst einloggen.'); setLoading(false); return; }

    // 2) Projekt anlegen
    const { data: proj, error: pErr } = await supabase
      .from('projects')
      .insert({ user_id: user.id, name })
      .select()
      .single();

    if (pErr || !proj) { alert(pErr?.message ?? 'Projektfehler'); setLoading(false); return; }

    // 3) Optional: Datei hochladen + DB-Eintrag
    if (file) {
      const path = `${user.id}/${proj.id}/${Date.now()}_${file.name}`;
      const { data: up, error: upErr } = await supabase
        .storage.from('uploads').upload(path, file);
      if (upErr) { alert(upErr.message); setLoading(false); return; }

      await supabase.from('images').insert({
        project_id: proj.id,
        path_original: up.path,
      });
    }

    setLoading(false);
    router.push(`/projects/${proj.id}`);
  }

  return (
    <main className="min-h-screen bg-[#100F10] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Neues Projekt</h1>
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <input
          className="w-full rounded bg-white/10 p-3 outline-none"
          placeholder="Projektname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full rounded bg-white/10 p-3"
        />
        <button
          disabled={loading}
          className="rounded bg-[#FCBA04] px-4 py-2 text-black font-semibold disabled:opacity-50"
        >
          {loading ? 'Speichere…' : 'Projekt anlegen'}
        </button>
      </form>
    </main>
  );
}