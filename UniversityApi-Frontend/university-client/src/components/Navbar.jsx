import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getRole } from '../services/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      background: '#fbeaf0',
      borderBottom: '0.5px solid #f4c0d1',
      padding: '0 24px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{ fontSize: '16px', fontWeight: '500', color: '#993556' }}>
        University Management
      </span>

      <div style={{ display: 'flex', gap: '4px' }}>
        {['departments', 'teachers', 'students'].map((page) => (
          <button
            key={page}
            onClick={() => navigate(`/${page}`)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              background: isActive(`/${page}`) ? '#f4c0d1' : 'transparent',
              color: isActive(`/${page}`) ? '#4B1528' : '#993556',
              fontWeight: isActive(`/${page}`) ? '500' : '400',
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: '#ED93B1', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '12px', fontWeight: '500', color: '#4B1528',
        }}>
          {role === 'Admin' ? 'AD' : 'US'}
        </div>
        <span style={{ fontSize: '13px', color: '#993556' }}>
          {role === 'Admin' ? 'admin' : 'user'}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '0.5px solid #f4c0d1',
            color: '#993556',
            fontSize: '12px',
            padding: '5px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Çıkış
        </button>
      </div>
    </div>
  );
}