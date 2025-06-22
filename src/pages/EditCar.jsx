import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    imagem: '',
    marca: '',
    modelo: '',
    motorizacao: '',
    ano: '',
    quilometragem: '',
    valor: ''
  });

  useEffect(() => {
    api.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/cars/${id}`, car);
    navigate('/cars');
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Editar veículo</h2>
        {['imagem', 'marca', 'modelo', 'motorizacao', 'ano', 'quilometragem', 'valor'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={car[field]}
            onChange={handleChange}
            style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ))}
        <button type="submit" style={{ padding: '0.5rem', background: '#1671ED', color: 'white', border: 'none', borderRadius: '4px', width: '100%' }}>
          Salvar
        </button>
      </form>
    </div>
  );
}
