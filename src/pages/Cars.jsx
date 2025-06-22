import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = () => {
    api.get('/cars').then(res => setCars(res.data));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      await api.delete(`/cars/${id}`);
      fetchCars();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {cars.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Nenhum carro cadastrado.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {cars.map(car => (
            <div key={car.id} style={{ border: '1px solid #ccc', borderRadius: '8px', width: '250px', padding: '1rem', position: 'relative' }}>
              {car.imagem && <img src={car.imagem} alt="Carro" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
              <h3>{car.marca} {car.modelo}</h3>
              <p><strong>Motorização:</strong> {car.motorizacao}</p>
              <p><strong>Ano:</strong> {car.ano}</p>
              <p><strong>KM:</strong> {car.quilometragem}</p>
              <p><strong>Valor:</strong> R${car.valor}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <button onClick={() => navigate(`/edit-car/${car.id}`)} style={{ background: '#1671ED', color: '#fff', border: 'none', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>Editar</button>
                <button onClick={() => handleDelete(car.id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
