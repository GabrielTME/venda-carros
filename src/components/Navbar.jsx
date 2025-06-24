import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{ background: '#1671ED', padding: '1rem 2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/cars" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Gerenciar carros</Link>
        <Link to="/cars/new" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Cadastrar carro</Link>
        <Link to="/users" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Gerenciar usuários</Link>
      </div>

      <div>
        <span onClick={handleLogout} style={{ margin: '0 1rem', color: '#fff', cursor: 'pointer' }}>Sair</span>
      </div>

    </nav>
  );
}
