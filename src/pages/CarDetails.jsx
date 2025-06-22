import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    api.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  if (!car) return <p style={{ padding: '2rem' }}>Carregando...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{car.marca} {car.modelo}</h2>
      {car.imagem && (
        <img src={car.imagem} alt="Carro" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '1rem', borderRadius: '6px' }} />
      )}
      <p><strong>Motorização:</strong> {car.motorizacao}</p>
      <p><strong>Ano:</strong> {car.ano}</p>
      <p><strong>Quilometragem:</strong> {car.quilometragem} km</p>
      <p><strong>Valor:</strong> R${car.valor}</p>
    </div>
  );
}
