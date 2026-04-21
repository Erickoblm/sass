import { useEffect, useState } from 'react';
import client from '../api/client';

export default function FavoritesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    client.get('/user/favorites').then(({ data }) => setItems(data));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Mes favoris</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map((item) => (
          <article key={item._id} className="bg-zinc-900 rounded overflow-hidden">
            <img src={item.posterUrl} alt={item.title} className="h-44 w-full object-cover" />
            <p className="p-2 text-sm">{item.title}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
