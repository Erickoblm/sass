import { useEffect, useState } from 'react';
import client from '../api/client';

export default function useContent(filters = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client
      .get('/content', { params: filters })
      .then(({ data }) => setItems(data))
      .finally(() => setLoading(false));
  }, [filters.q, filters.category]);

  return { items, loading };
}
