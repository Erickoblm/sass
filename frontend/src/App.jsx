import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FavoritesPage from './pages/FavoritesPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AdminPage from './pages/AdminPage';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/subscribe" element={<Protected><SubscriptionPage /></Protected>} />
        <Route path="/favorites" element={<Protected><FavoritesPage /></Protected>} />
        <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
      </Routes>
    </div>
  );
}
