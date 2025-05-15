import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthGuard() {
      const navigate = useNavigate();

      useEffect(() => {
            const interval = setInterval(() => {
                  const expireAt = localStorage.getItem('token_expire_at');
                  if (!expireAt || Date.now() > parseInt(expireAt)) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_expire_at');
                        navigate('/login');
                  }
            }, 10000); // vérifie toutes les 10 secondes

            return () => clearInterval(interval);
      }, [navigate]);

      return null;
}
