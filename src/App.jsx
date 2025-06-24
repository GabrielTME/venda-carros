// Importações principais do React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Hook para gerenciar estado no React
import { useState } from 'react';
// Importa os componentes do sistema
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';
import Users from './pages/Users';

// Componente principal da aplicação
function App() {
  // Estado para controlar o usuário logado
  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* Navbar só aparece se houver usuário logado */}
      {user && <Navbar setUser={setUser} />}
      
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Rota principal (Home), só acessível se estiver logado, senão redireciona pro login */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

          {/* Rota para visualizar lista de carros */}
          <Route path="/cars" element={user ? <Cars /> : <Navigate to="/login" />} />

          {/* Rota para cadastro de novo carro */}
          <Route path="/cars/new" element={user ? <CarForm /> : <Navigate to="/login" />} />

          {/* Rota para visualizar detalhes do carro */}
          <Route path="/cars/:id" element={user ? <CarDetails /> : <Navigate to="/login" />} />

          {/* Rota para edição de carro (usa o mesmo form do cadastro) */}
          <Route path="/edit-car/:id" element={user ? <CarForm /> : <Navigate to="/login" />} />

          {/* Rota para gerenciar usuários */}
          <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />

          {/* Página de login (acessível mesmo sem estar logado) */}
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>

      {/* Footer só aparece se estiver logado */}
      {user && <Footer />}
    </Router>
  );
}

// Exporta o componente principal
export default App;
