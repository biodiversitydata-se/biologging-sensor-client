'use client'

import { useState, useEffect } from 'react';


export type TokenData = {
  username: string;
  sbdiId: string | null;
  //roles?: string[];      // optional
  isAdmin?: boolean;     // optional
};

export default function useToken() {
  console.log("usetoken");
  
  const [token, setTokenState] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true); // new

  useEffect(() => {

    const tokenString = localStorage.getItem('token');
    if (tokenString !== null) {
      try {
        const parsed: TokenData = JSON.parse(tokenString);
        setTokenState(parsed);
      } catch (e) {
        // If token stored as a plain string (backwards compatibility),
        // treat it as username
        setTokenState({ username: tokenString!, sbdiId: null, isAdmin: false });
      }
    } else {
      setTokenState(null);
    }
    setLoading(false); // done loading
  }, []);


  const setToken = (userToken: TokenData | null) => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken));
      setTokenState(userToken);
    } else {
      localStorage.removeItem('token');
      setTokenState(null); // 👈 important!
    }
  };

  return { token, setToken, loading };  
}
