import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const res = await api.get(`/users?email=${email}&senha=${senha}`);
      if (res.data.length > 0) {
        setUser(res.data[0]);
        navigate('/');
      } else {
        setErro('Digite um e-mail e senha válidos.');
      }
    } catch (err) {
      setErro('Erro ao tentar fazer login');
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Digite o seu e-mail e senha</h2>
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', background: '#1671ED', color: '#fff', border: 'none', borderRadius: '4px', width: '100%', marginTop: '1rem' }}>Entrar</button>
        {erro && <p style={{ color: 'red', marginTop: '0.5rem' }}>{erro}</p>}
      </div>
    </div>
  );
}
