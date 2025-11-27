'use client'

import { useState, useEffect } from 'react';


export type TokenData = {
  username: string;
  sbdiId: string;
  //roles?: string[];      // optional
  isAdmin?: boolean;     // optional
};

export default function useToken() {
  console.log("usetoken");
  
  const [token, setTokenState] = useState<Token>(null);


  useEffect(() => {

    const tokenString = localStorage.getItem('token');
    if (tokenString !== null) {
      try {
        const parsed: TokenData = JSON.parse(tokenString);
        setTokenState(parsed);
      } catch (e) {
        // If token stored as a plain string (backwards compatibility),
        // treat it as username
        setTokenState({ username: tokenString });
      }
    } else {
      setTokenState(null);
    }
  }, []);

  const setToken = (userToken: string) => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken));
      setTokenState(userToken);
    } else {
      localStorage.removeItem('token');
      setTokenState(null); // 👈 important!
    }
  };

  return { token, setToken };  
}
