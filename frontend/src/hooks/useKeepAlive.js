import { useEffect } from 'react';
import api from '../api/axios';

export default function useKeepAlive() {
  useEffect(() => {
    const ping = () => {
      api.get('/ping').catch(() => {});
    };
    const interval = setInterval(ping, 600_000); // 10 minutes
    return () => clearInterval(interval);
  }, []);
}
