// Importa os hooks de estado e navegação
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Componente de Login, recebe a função setUser por props (para setar o usuário logado)
export default function Login({ setUser }) {
  // Estados locais para armazenar email, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Hook para redirecionamento de rotas
  const navigate = useNavigate();

  // Função chamada ao clicar no botão de login
  const handleLogin = async () => {
    // Verifica se os campos estão preenchidos
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      // Faz uma requisição GET filtrando usuários por email e senha
      const res = await api.get(`/users?email=${email}&senha=${senha}`);

      // Se encontrar algum usuário com as credenciais fornecidas
      if (res.data.length > 0) {
        setUser(res.data[0]); // seta o usuário logado no estado global
        navigate('/'); // redireciona para a página inicial
      } else {
        setErro('Digite um e-mail e senha válidos.');
      }
    } catch (err) {
      // Em caso de erro na requisição
      setErro('Erro ao tentar fazer login');
    }
  };

  // JSX da tela de login
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center' }}>Digite o seu e-mail e senha</h2>

        {/* Campo de email */}
        <input 
          placeholder="E-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            width: '100%', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }} 
        />

        {/* Campo de senha */}
        <input 
          placeholder="Senha" 
          type="password" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            width: '100%', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }} 
        />

        {/* Botão de login */}
        <button 
          onClick={handleLogin} 
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
          Entrar
        </button>

        {/* Exibe mensagem de erro, se houver */}
        {erro && <p style={{ color: 'red', marginTop: '0.5rem' }}>{erro}</p>}
      </div>
    </div>
  );
}
