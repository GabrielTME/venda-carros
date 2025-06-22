import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cidade: '', telefone: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await api.put(`/users/${editId}`, form);
    } else {
      await api.post('/users', form);
    }

    setForm({ nome: '', email: '', senha: '', cidade: '', telefone: '' });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      await api.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{editId ? 'Editar usuário' : 'Preencha os dados do usuário'}</h2>
      
      {['nome', 'email', 'senha', 'cidade', 'telefone'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            margin: '0.5rem 0',
            width: '100%',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      ))}
      
      <button
        onClick={handleSubmit}
        style={{
          padding: '0.5rem 1rem',
          background: '#1671ED',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          width: '100%',
          marginTop: '1rem'
        }}
      >
        {editId ? 'Salvar Alterações' : 'Adicionar'}
      </button>

      <h3 style={{ marginTop: '2rem' }}>Usuários cadastrados</h3>
      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
        {users.map(u => (
          <li key={u.id} style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            <strong>{u.nome}</strong> - {u.email}
            <div style={{ marginTop: '0.25rem' }}>
              <button
                onClick={() => handleEdit(u)}
                style={{ marginRight: '0.5rem', background: '#1671ED', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                style={{ background: 'red', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
