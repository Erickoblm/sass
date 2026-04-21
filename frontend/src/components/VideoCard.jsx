import { Heart } from 'lucide-react';

export default function VideoCard({ item, onOpen, onFavorite }) {
  return (
    <article className="bg-zinc-900 rounded overflow-hidden hover:scale-[1.02] transition cursor-pointer" onClick={() => onOpen(item)}>
      <img src={item.posterUrl} alt={item.title} className="w-full h-52 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-xs text-zinc-400 mt-1">{item.category} • {item.year}</p>
        <button
          className="mt-3 text-xs inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(item._id);
          }}
        >
          <Heart size={14} /> Favori
        </button>
      </div>
    </article>
  );
}
