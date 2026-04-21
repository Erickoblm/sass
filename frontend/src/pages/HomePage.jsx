import { useMemo, useState } from 'react';
import client from '../api/client';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import useContent from '../hooks/useContent';
import { useAuth } from '../context/AuthContext';

const categories = ['Film Malagasy', 'Série Malagasy', 'Comédie', 'Drame', 'Action'];

export default function HomePage() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState(null);
  const { isSubscribed } = useAuth();

  const filters = useMemo(() => ({ q, category }), [q, category]);
  const { items, loading } = useContent(filters);

  async function toggleFavorite(contentId) {
    await client.post('/user/favorites/toggle', { contentId });
  }

  return (
    <main className="p-4 space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input className="bg-zinc-900 p-2 rounded md:col-span-3" placeholder="Rechercher un film malgache..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="bg-zinc-900 p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Toutes catégories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </section>

      {!isSubscribed && <p className="bg-yellow-900/40 border border-yellow-700 p-2 rounded">Abonnement actif requis pour lire les vidéos.</p>}

      {selected && isSubscribed && (
        <section className="bg-zinc-900 p-4 rounded">
          <h2 className="font-semibold mb-2">Lecture: {selected.title}</h2>
          <VideoPlayer streamUrl={selected.streamUrl} streamType={selected.streamType} />
        </section>
      )}

      {loading ? <p>Chargement...</p> : (
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {items.map((item) => (
            <VideoCard key={item._id} item={item} onOpen={setSelected} onFavorite={toggleFavorite} />
          ))}
        </section>
      )}
    </main>
  );
}
