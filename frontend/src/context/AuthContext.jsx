import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      client.get('/auth/me').then(({ data }) => setUser(data)).catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isSubscribed: ['active', 'trial'].includes(user?.subscriptionStatus),
      async login(email, password) {
        const { data } = await client.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
      },
      async register(payload) {
        const { data } = await client.post('/auth/register', payload);
        localStorage.setItem('token', data.token);
        setUser(data.user);
      },
      async logout() {
        await client.post('/auth/logout');
        localStorage.removeItem('token');
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
