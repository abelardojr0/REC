import { useState, useEffect } from "react";

function useJwtToken(tempoEmDias) {
  const [token, setToken] = useState(null);

  function setTokenWithExpiry(token) {
    const now = new Date();
    const expiry = new Date(now.getTime() + tempoEmDias * 24 * 60 * 60 * 1000);
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiry.toISOString());
    setToken(token);
  }

  function getTokenWithExpiry() {
    const expiry = localStorage.getItem("expiry");
    if (!expiry) {
      setToken(null);
      return null;
    }
    const now = new Date();
    if (now.getTime() > new Date(expiry).getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      localStorage.removeItem("nome");
      setToken(null);
      return null;
    }
    const token = localStorage.getItem("token");
    setToken(token);
    return token;
  }

  useEffect(() => {
    getTokenWithExpiry();
  }, []);

  return [token, setTokenWithExpiry, getTokenWithExpiry];
}
export { useJwtToken };
