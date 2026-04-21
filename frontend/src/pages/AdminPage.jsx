import { useEffect, useState } from 'react';
import client from '../api/client';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    Promise.all([
      client.get('/admin/dashboard'),
      client.get('/admin/users'),
      client.get('/admin/payments')
    ]).then(([dashboard, usersRes, paymentsRes]) => {
      setStats(dashboard.data);
      setUsers(usersRes.data);
      setPayments(paymentsRes.data);
    });
  }, []);

  async function validate(paymentId) {
    await client.patch(`/payments/${paymentId}/validate`);
    setPayments((prev) => prev.map((p) => (p._id === paymentId ? { ...p, status: 'validated' } : p)));
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {stats && (
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-900 p-3 rounded">Utilisateurs: {stats.usersCount}</div>
          <div className="bg-zinc-900 p-3 rounded">Abonnés actifs: {stats.activeSubscriptions}</div>
          <div className="bg-zinc-900 p-3 rounded">Revenus: {stats.monthlyRevenueMGA} MGA</div>
        </section>
      )}
      <section className="bg-zinc-900 p-3 rounded">
        <h2 className="font-semibold mb-2">Paiements</h2>
        {payments.map((p) => (
          <div key={p._id} className="flex items-center justify-between border-b border-zinc-800 py-2 text-sm">
            <span>{p.user?.email} • {p.method} • {p.status}</span>
            {p.status === 'pending' && <button className="bg-brand px-2 py-1 rounded" onClick={() => validate(p._id)}>Valider</button>}
          </div>
        ))}
      </section>
      <section className="bg-zinc-900 p-3 rounded">
        <h2 className="font-semibold mb-2">Utilisateurs</h2>
        {users.map((u) => <p key={u._id} className="text-sm py-1">{u.email} — {u.subscriptionStatus}</p>)}
      </section>
    </main>
  );
}
