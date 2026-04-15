import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { getRole } from '../services/authService';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', lastName: '', studentNumber: '', departmentId: '' });
  const role = getRole();

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get('/students');
    setStudents(res.data);
  };

  const fetchDepartments = async () => {
    const res = await api.get('/departments');
    setDepartments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, departmentId: parseInt(form.departmentId) };
    if (editItem) {
      await api.put(`/students/${editItem.id}`, { ...payload, id: editItem.id });
    } else {
      await api.post('/students', payload);
    }
    setShowForm(false);
    setEditItem(null);
    setForm({ name: '', lastName: '', studentNumber: '', departmentId: '' });
    fetchStudents();
  };

  const handleEdit = (s) => {
    setEditItem(s);
    setForm({ name: s.name, lastName: s.lastName, studentNumber: s.studentNumber, departmentId: s.departmentId });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      await api.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  const inputStyle = { width: '100%', padding: '9px 12px', border: '0.5px solid #f4c0d1', borderRadius: '8px', fontSize: '13px', background: '#fdf0f5', color: '#4B1528', outline: 'none' };
  const labelStyle = { fontSize: '13px', color: '#993556', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f5' }}>
      <Navbar />
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '500', color: '#4B1528' }}>Students</h1>
          <p style={{ fontSize: '13px', color: '#993556', marginTop: '3px' }}>Toplam {students.length} öğrenci kayıtlı</p>
        </div>

        {showForm && (
          <div style={{ background: '#fff', border: '0.5px solid #f4c0d1', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '500', color: '#4B1528', marginBottom: '16px' }}>
              {editItem ? 'Öğrenciyi Düzenle' : 'Yeni Öğrenci Ekle'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Ad</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Soyad</label>
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Öğrenci No</label>
                  <input value={form.studentNumber} onChange={(e) => setForm({ ...form, studentNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Bölüm</label>
                  <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} style={inputStyle}>
                    <option value="">Seçiniz</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" style={{ background: '#D4537E', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                  {editItem ? 'Güncelle' : 'Ekle'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditItem(null); setForm({ name: '', lastName: '', studentNumber: '', departmentId: '' }); }}
                  style={{ background: 'transparent', color: '#993556', border: '0.5px solid #f4c0d1', borderRadius: '20px', padding: '8px 20px', fontSize: '13px', cursor: 'pointer' }}>
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#fff', border: '0.5px solid #f4c0d1', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #f4c0d1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4B1528' }}>Öğrenci Listesi</span>
            {role === 'Admin' && (
              <button onClick={() => setShowForm(true)} style={{ background: '#D4537E', border: 'none', color: '#fff', fontSize: '12px', fontWeight: '500', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}>
                + Yeni Ekle
              </button>
            )}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                {['ID', 'Ad', 'Soyad', 'Öğrenci No', 'Bölüm', 'İşlemler'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: '#993556', fontWeight: '500', borderBottom: '0.5px solid #f4c0d1', background: '#fdf0f5' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td style={{ padding: '10px 16px', color: '#4B1528', borderBottom: '0.5px solid #fbeaf0' }}>{s.id}</td>
                  <td style={{ padding: '10px 16px', color: '#4B1528', borderBottom: '0.5px solid #fbeaf0' }}>{s.name}</td>
                  <td style={{ padding: '10px 16px', color: '#4B1528', borderBottom: '0.5px solid #fbeaf0' }}>{s.lastName}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid #fbeaf0' }}>
                    <span style={{ background: '#FBEAF0', color: '#72243E', padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' }}>{s.studentNumber}</span>
                  </td>
                  <td style={{ padding: '10px 16px', color: '#4B1528', borderBottom: '0.5px solid #fbeaf0' }}>{s.department?.name || '-'}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid #fbeaf0' }}>
                    {role === 'Admin' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleEdit(s)} style={{ background: '#fbeaf0', border: 'none', color: '#72243E', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>Düzenle</button>
                        <button onClick={() => handleDelete(s.id)} style={{ background: '#FCEBEB', border: 'none', color: '#791F1F', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>Sil</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}