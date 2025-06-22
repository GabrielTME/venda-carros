import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';
import Users from './pages/Users';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/cars" element={user ? <Cars /> : <Navigate to="/login" />} />
          <Route path="/cars/new" element={user ? <CarForm /> : <Navigate to="/login" />} />
          <Route path="/cars/:id" element={user ? <CarDetails /> : <Navigate to="/login" />} />
          <Route path="/edit-car/:id" element={user ? <CarForm /> : <Navigate to="/login" />} />
          <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
      {user && <Footer />}
    </Router>
  );
}

export default App;
