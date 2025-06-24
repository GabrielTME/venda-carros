// Importa o componente Link (para navegação entre páginas sem recarregar) 
// e o hook useNavigate (para redirecionamento programático) da biblioteca react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// Define e exporta o componente Navbar, que recebe a função setUser como propriedade (props)
export default function Navbar({ setUser }) {
  // Hook do react-router-dom que permite navegar entre rotas via código (sem clique de usuário)
  const navigate = useNavigate();

  // Função chamada quando o usuário clica no botão "Sair"
  const handleLogout = () => {
    setUser(null); // Reseta o usuário (efetivamente faz logout)
    navigate('/login'); // Redireciona o usuário para a página de login
  };

  // Retorna o JSX que representa a barra de navegação (navbar)
  return (
    <nav 
      style={{ 
        background: '#1671ED', // Cor de fundo azul
        padding: '1rem 2rem', // Espaçamento interno: 1rem vertical, 2rem horizontal
        color: '#fff', // Cor do texto branca
        display: 'flex', // Layout flexível (Flexbox)
        justifyContent: 'space-between', // Espaça os itens nas extremidades (esquerda e direita)
        alignItems: 'center' // Alinha verticalmente os itens ao centro
      }}
    >
      {/* Bloco com os links de navegação */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Cada Link representa um atalho para uma rota da aplicação */}
        <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/cars" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Gerenciar carros</Link>
        <Link to="/cars/new" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Cadastrar carro</Link>
        <Link to="/users" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Gerenciar usuários</Link>
      </div>

      {/* Bloco com o botão de logout */}
      <div>
        {/* O logout é acionado ao clicar neste texto */}
        <span 
          onClick={handleLogout} 
          style={{ margin: '0 1rem', color: '#fff', cursor: 'pointer' }}
        >
          Sair
        </span>
      </div>

    </nav>
  );
}
