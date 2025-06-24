import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/cars/${id}`).then(res => {
      setCar({
        ...res.data,
        quilometragem: formatNumber(res.data.quilometragem),
        valor: formatNumber(res.data.valor)
      });
    });
  }, [id]);

  const formatNumber = (value) => {
    if (!value) return '';
    return parseInt(value.toString().replace(/\D/g, ''), 10).toLocaleString('pt-BR');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['quilometragem', 'valor'].includes(name)) {
      setCar({ ...car, [name]: formatNumber(value) });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  const handlePasteImage = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCar(prev => ({ ...prev, imagem: text }));
    } catch (err) {
      alert('Não foi possível acessar a área de transferência.');
    }
  };

  const handleSave = async () => {
    const payload = {
      ...car,
      quilometragem: car.quilometragem.replace(/\./g, ''),
      valor: car.valor.replace(/\./g, '')
    };
    await api.put(`/cars/${id}`, payload);
    setEditing(false);
  };

  const cancelEdit = () => {
    api.get(`/cars/${id}`).then(res => {
      setCar({
        ...res.data,
        quilometragem: formatNumber(res.data.quilometragem),
        valor: formatNumber(res.data.valor)
      });
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Deseja excluir este carro?')) {
      await api.delete(`/cars/${id}`);
      navigate('/cars');
    }
  };

  if (!car) return <p>Carregando...</p>;

  const formatValor = (value) => {
    if (!value) return '';
    return 'R$' + parseInt(value, 10).toLocaleString('pt-BR');
  };

  const formatQuilometragem = (value) => {
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('pt-BR');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Detalhes do veículo</h2>

      {editing ? (
        <>
          <label>Imagem (URL):</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              name="imagem"
              value={car.imagem}
              onChange={handleChange}
              style={inputStyle}
            />
            <button onClick={handlePasteImage} style={pasteButton}>Colar</button>
          </div>
          <small style={{ color: '#555', display: 'block', marginBottom: '1rem' }}>
            Envie sua imagem <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#1671ED' }}>aqui.</a>
          </small>

          <label>Marca:</label>
          <input type="text" name="marca" value={car.marca} onChange={handleChange} style={inputStyle} />
          <label>Modelo:</label>
          <input type="text" name="modelo" value={car.modelo} onChange={handleChange} style={inputStyle} />
          <label>Motorização:</label>
          <input type="text" name="motorizacao" value={car.motorizacao} onChange={handleChange} style={inputStyle} />
          <label>Ano:</label>
          <input type="number" name="ano" value={car.ano} onChange={handleChange} style={inputStyle} />
          <label>Quilometragem:</label>
          <input type="text" name="quilometragem" value={car.quilometragem} onChange={handleChange} style={inputStyle} />
          <label>Valor:</label>
          <input type="text" name="valor" value={car.valor} onChange={handleChange} style={inputStyle} />
          <label>Cidade:</label>
          <input type="text" name="cidade" value={car.cidade} onChange={handleChange} style={inputStyle} />

          <button onClick={handleSave} style={saveButton}>Salvar</button>
          <button onClick={cancelEdit} style={cancelButton}>Cancelar</button>
        </>
      ) : (
        <>
          {car.imagem && (
            <img src={car.imagem} alt="Carro" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
          )}
          <p><strong>Marca:</strong> {car.marca}</p>
          <p><strong>Modelo:</strong> {car.modelo}</p>
          <p><strong>Motorização:</strong> {car.motorizacao}</p>
          <p><strong>Ano:</strong> {car.ano}</p>
          <p><strong>Quilometragem:</strong> {formatQuilometragem(car.quilometragem)} km</p>
          <p><strong>Valor:</strong> {formatValor(car.valor)}</p>
          <p><strong>Cidade:</strong> {car.cidade}</p>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setEditing(true)} style={editButton}>Editar</button>
            <button onClick={handleDelete} style={deleteButton}>Excluir</button>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  margin: '0.5rem 0',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const pasteButton = {
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  background: '#1671ED',
  color: '#fff'
};

const saveButton = {
  padding: '0.5rem 1rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  marginRight: '0.5rem'
};

const cancelButton = {
  padding: '0.5rem 1rem',
  background: '#999',
  color: '#fff',
  border: 'none',
  borderRadius: '4px'
};

const editButton = {
  padding: '0.5rem 1rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  marginRight: '0.5rem'
};

const deleteButton = {
  padding: '0.5rem 1rem',
  background: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px'
};
