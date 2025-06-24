// Importa os hooks useState e useEffect do React
import { useState, useEffect } from 'react';
// Importa o serviço de API (axios configurado)
import api from '../services/api';

// Componente principal para cadastro e gerenciamento de usuários
export default function Users() {
  // Estado que armazena todos os usuários carregados do backend
  const [users, setUsers] = useState([]);
  // Estado para armazenar o formulário (tanto para criar quanto para editar)
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cidade: '', telefone: '' });
  // Estado para controlar se está em modo de edição (editId indica qual usuário está sendo editado)
  const [editId, setEditId] = useState(null);
  // Estado para controlar a exibição ou não da senha em texto
  const [showPassword, setShowPassword] = useState(false);

  // useEffect executado ao carregar o componente (montagem)
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  // Função para tratar alterações nos inputs do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo alterado for telefone, aplica máscara de formatação
    if (name === 'telefone') {
      let cleaned = value.replace(/\D/g, '').slice(0, 11);
      let formatted = '';

      if (cleaned.length > 0) formatted += '(' + cleaned.slice(0, 2);
      if (cleaned.length >= 3) formatted += ') ' + cleaned.slice(2, 7);
      if (cleaned.length >= 8) formatted += '-' + cleaned.slice(7, 11);

      setForm({ ...form, telefone: formatted });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Função de envio do formulário (salva ou edita usuário)
  const handleSubmit = async () => {
    if (editId) {
      await api.put(`/users/${editId}`, form);
    } else {
      await api.post('/users', form);
    }

    // Limpa o formulário e volta ao modo de inserção
    setForm({ nome: '', email: '', senha: '', cidade: '', telefone: '' });
    setEditId(null);
    fetchUsers(); // Atualiza lista de usuários
  };

  // Preenche o formulário com os dados do usuário a ser editado
  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  // Deleta o usuário, com confirmação
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      await api.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  // Renderização do componente
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{editId ? 'Editar usuário' : 'Preencha os dados do usuário'}</h2>

      {/* Campos Nome e Email (reutilizando código com map) */}
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

      {/* Campo de senha com botão para mostrar/ocultar */}
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

      {/* Campo telefone com máscara */}
      <input
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Campo cidade */}
      <input
        name="cidade"
        placeholder="Cidade"
        value={form.cidade}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Botão principal de submit (salvar ou editar) */}
      <button onClick={handleSubmit} style={submitButton}>
        {editId ? 'Salvar Alterações' : 'Adicionar'}
      </button>

      {/* Botão de cancelar a edição */}
      {editId && (
        <button
          onClick={() => { 
            setEditId(null); 
            setForm({ nome: '', email: '', senha: '', cidade: '', telefone: '' }) 
          }}
          style={{ ...submitButton, background: '#aaa', marginTop: '0.5rem' }}
        >
          Cancelar Edição
        </button>
      )}

      {/* Lista de usuários cadastrados */}
      <h3 style={{ marginTop: '2rem' }}>Usuários cadastrados</h3>
      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
        {users.map(u => (
          <li key={u.id} style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            <strong>{u.nome}</strong> - {u.email}
            <div style={{ marginTop: '0.25rem' }}>
              {/* Impede a edição e exclusão do usuário admin */}
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

// Estilos dos componentes (inline style)

// Estilo dos inputs
const inputStyle = {
  padding: '0.5rem',
  margin: '0.5rem 0',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

// Botão de submit (salvar/adicionar)
const submitButton = {
  padding: '0.5rem 1rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  width: '100%',
  marginTop: '1rem'
};

// Botão de mostrar/ocultar senha
const toggleButton = {
  padding: '0.5rem 0.75rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  height: '100%'
};

// Botão de editar usuário
const editButton = {
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  padding: '0.3rem 0.5rem',
  borderRadius: '4px',
  marginRight: '0.5rem'
};

// Botão de excluir usuário
const deleteButton = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '0.3rem 0.5rem',
  borderRadius: '4px'
};
