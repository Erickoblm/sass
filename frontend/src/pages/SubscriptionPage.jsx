import { useState } from 'react';
import client from '../api/client';

const methods = ['MVola', 'Orange Money', 'Airtel Money'];

export default function SubscriptionPage() {
  const [form, setForm] = useState({ method: methods[0], phoneNumber: '', transactionRef: '' });
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    const { data } = await client.post('/payments', form);
    setMessage(`Paiement envoyé: ${data.status}`);
  }

  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Abonnement mensuel: 15 000 MGA</h1>
      <p className="text-zinc-400 mb-4">Renseignez votre transaction mobile money (Madagascar).</p>
      <form onSubmit={submit} className="space-y-3 bg-zinc-900 p-4 rounded">
        <select className="w-full p-2 bg-zinc-800 rounded" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
          {methods.map((m) => <option key={m}>{m}</option>)}
        </select>
        <input className="w-full p-2 bg-zinc-800 rounded" placeholder="Numéro téléphone" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
        <input className="w-full p-2 bg-zinc-800 rounded" placeholder="Référence transaction (auto-xxx pour validation auto)" value={form.transactionRef} onChange={(e) => setForm({ ...form, transactionRef: e.target.value })} />
        <button className="w-full bg-brand p-2 rounded">Valider</button>
      </form>
      {message && <p className="mt-3 text-green-400">{message}</p>}
    </main>
  );
}
