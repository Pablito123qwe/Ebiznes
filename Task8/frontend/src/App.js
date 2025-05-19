import React, { useState } from 'react';

const API = 'http://localhost:5000';

function App() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(API + '/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Rejestracja udana');
      setView('login');
    } else {
      setMessage(data.error || 'Błąd rejestracji');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setView('profile');
      setMessage('');
    } else {
      setMessage(data.error || 'Błąd logowania');
    }
  };

  const handleProfile = async () => {
    setMessage('');
    const res = await fetch(API + '/api/profile', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();
    if (res.ok && data.user) {
      setProfile(data.user);
      setMessage('');
    } else {
      setMessage(data.error || 'Błąd pobierania profilu');
      setProfile(null);
      if (res.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        setView('login');
      }
    }
  };

  React.useEffect(() => {
    if (view === 'profile' && token) {
      handleProfile();
    }
  }, [view, token]);

  const logout = () => {
    setToken('');
    setProfile(null);
    localStorage.removeItem('token');
    setView('login');
  };

  return (
    <div>
      {view === 'login' && (
        <form onSubmit={handleLogin}>
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Hasło"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Zaloguj</button>
          <button type="button" onClick={() => setView('register')}>Rejestracja</button>
        </form>
      )}
      {view === 'register' && (
        <form onSubmit={handleRegister}>
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Hasło"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Zarejestruj</button>
          <button type="button" onClick={() => setView('login')}>Logowanie</button>
        </form>
      )}
      {view === 'profile' && profile && (
        <div>
          <div>Email: {profile.email}</div>
          <button onClick={logout}>Wyloguj</button>
        </div>
      )}
      {message && <div>{message}</div>}
    </div>
  );
}

export default App;
