import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/departments');
    } catch {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdf0f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        border: '0.5px solid #f4c0d1',
        borderRadius: '16px',
        padding: '40px',
        width: '360px',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#4B1528', marginBottom: '6px' }}>
          Hoş geldiniz
        </h1>
        <p style={{ fontSize: '13px', color: '#993556', marginBottom: '28px' }}>
          University Management System
        </p>

        {error && (
          <div style={{
            background: '#FCEBEB',
            color: '#791F1F',
            fontSize: '13px',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#993556', display: 'block', marginBottom: '6px' }}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '0.5px solid #f4c0d1',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fdf0f5',
                color: '#4B1528',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', color: '#993556', display: 'block', marginBottom: '6px' }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '0.5px solid #f4c0d1',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fdf0f5',
                color: '#4B1528',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '11px',
              background: '#D4537E',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}