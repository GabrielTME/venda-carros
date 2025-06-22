import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ background: '#1671ED', padding: '1rem', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
      <Link to="/cars" style={{ margin: '0 1rem', color: '#fff' }}>Gerenciar carros</Link>
      <Link to="/cars/new" style={{ margin: '0 1rem', color: '#fff' }}>Cadastrar carro</Link>
      <Link to="/users" style={{ margin: '0 1rem', color: '#fff' }}>Gerenciar usuários</Link>
    </nav>
  );
}
