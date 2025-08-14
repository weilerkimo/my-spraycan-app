import { supabase } from '@/lib/supabase';

async function signedUrl(path: string) {
  const { data, error } = await supabase
    .storage.from('uploads')
    .createSignedUrl(path, 60 * 10); // 10 Minuten gültig
  if (error) return '';
  return data?.signedUrl ?? '';
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  // Bilder des Projekts laden
  const { data: images } = await supabase
    .from('images')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false });

  const urls = await Promise.all((images ?? []).map(i => signedUrl(i.path_original)));

  return (
    <main className="min-h-screen bg-[#100F10] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Projekt {params.id.slice(0, 8)}…</h1>
      {urls.length === 0 ? (
        <p className="text-[#777777]">Noch kein Bild.</p>
      ) : (
        <div className="grid gap-4 max-w-3xl">
          {urls.map((u, i) =>
            u ? <img key={i} src={u} alt="Upload" className="rounded border border-white/10" /> : null
          )}
        </div>
      )}
    </main>
  );
}