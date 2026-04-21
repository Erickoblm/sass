import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    if (isRegister) await register(form);
    else await login(form.email, form.password);
    navigate('/');
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Créer un compte' : 'Connexion'}</h1>
      <form onSubmit={submit} className="space-y-3">
        {isRegister && <input className="w-full p-2 rounded bg-zinc-900" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="w-full p-2 rounded bg-zinc-900" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="w-full p-2 rounded bg-zinc-900" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-brand p-2 rounded">Continuer</button>
      </form>
      <button className="mt-3 text-sm text-zinc-400" onClick={() => setIsRegister((v) => !v)}>
        {isRegister ? 'Déjà inscrit ? Se connecter' : 'Nouveau ? Créer un compte'}
      </button>
    </main>
  );
}
