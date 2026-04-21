import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-black/95 border-b border-zinc-800 p-4 flex items-center justify-between">
      <Link to="/" className="text-brand font-bold text-xl">MalagasyFlix</Link>
      <nav className="flex gap-3 text-sm items-center">
        {user && <Link to="/favorites">Favoris</Link>}
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <button onClick={logout} className="bg-zinc-800 px-3 py-1 rounded">Déconnexion</button>
        ) : (
          <Link to="/auth" className="bg-brand px-3 py-1 rounded">Connexion</Link>
        )}
      </nav>
    </header>
  );
}
