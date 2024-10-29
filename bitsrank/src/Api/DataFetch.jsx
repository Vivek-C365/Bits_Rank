import { useState, useEffect, useCallback } from 'react';
import api from './api';

const useFetchData = (url, options = {}) => {
  const { method = 'GET', body = null } = options; // Default method is GET
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;

      // Handle different HTTP methods
      switch (method.toUpperCase()) {
        case 'POST':
          response = await api.post(url, body);
          break;
        case 'PUT':
          response = await api.put(url, body);
          break;
        case 'DELETE':
          response = await api.delete(url, { data: body }); // `data` is used for body in DELETE
          break;
        case 'GET':
        default:
          response = await api.get(url);
          break;
      }

      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Run the fetch function whenever the URL or options change

  return { data, loading, error };
};

export default useFetchData;
