import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cidade: '', telefone: '' });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      let cleaned = value.replace(/\D/g, '').slice(0, 11);
      let formatted = '';

      if (cleaned.length > 0) {
        formatted += '(' + cleaned.slice(0, 2);
      }
      if (cleaned.length >= 3) {
        formatted += ') ' + cleaned.slice(2, 7);
      }
      if (cleaned.length >= 8) {
        formatted += '-' + cleaned.slice(7, 11);
      }

      setForm({ ...form, telefone: formatted });
    } else {
      setForm({ ...form, [name]: value });
    }
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

      {['nome', 'email'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          style={inputStyle}
        />
      ))}

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          name="senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          style={{ ...inputStyle, flex: 1 }}
        />
        <button onClick={() => setShowPassword(!showPassword)} style={toggleButton}>
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <input
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="cidade"
        placeholder="Cidade"
        value={form.cidade}
        onChange={handleChange}
        style={inputStyle}
      />

      <button onClick={handleSubmit} style={submitButton}>
        {editId ? 'Salvar Alterações' : 'Adicionar'}
      </button>

      {editId && (
        <button
          onClick={() => { setEditId(null); setForm({ nome: '', email: '', senha: '', cidade: '', telefone: '' }) }}
          style={{ ...submitButton, background: '#aaa', marginTop: '0.5rem' }}
        >
          Cancelar Edição
        </button>
      )}

      <h3 style={{ marginTop: '2rem' }}>Usuários cadastrados</h3>
      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
        {users.map(u => (
          <li key={u.id} style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            <strong>{u.nome}</strong> - {u.email}
            <div style={{ marginTop: '0.25rem' }}>
              {!(u.email === 'admin@email.com' && u.senha === '123') && (
                <>
                  <button onClick={() => handleEdit(u)} style={editButton}>Editar</button>
                  <button onClick={() => handleDelete(u.id)} style={deleteButton}>Excluir</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  margin: '0.5rem 0',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const submitButton = {
  padding: '0.5rem 1rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  width: '100%',
  marginTop: '1rem'
};

const toggleButton = {
  padding: '0.5rem 0.75rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  height: '100%'
};

const editButton = {
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  padding: '0.3rem 0.5rem',
  borderRadius: '4px',
  marginRight: '0.5rem'
};

const deleteButton = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '0.3rem 0.5rem',
  borderRadius: '4px'
};
