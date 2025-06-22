import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CarForm() {
  const [form, setForm] = useState({
    imagem: '',
    marca: '',
    modelo: '',
    motorizacao: '',
    ano: '',
    quilometragem: '',
    valor: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/cars/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await api.put(`/cars/${id}`, form);
      } else {
        await api.post('/cars', form);
      }
      navigate('/cars');
    } catch (err) {
      alert('Erro ao salvar carro');
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>{id ? 'Editar veículo' : 'Preencha os dados do veículo'}</h2>
        <input
          type="text"
          name="imagem"
          placeholder="Imagem (URL)"
          value={form.imagem}
          onChange={handleChange}
          style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {['marca', 'modelo', 'motorizacao', 'ano', 'quilometragem', 'valor'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ))}
        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', background: '#1671ED', color: '#fff', border: 'none', borderRadius: '4px', width: '100%', marginTop: '1rem' }}>
          Salvar
        </button>
      </div>
    </div>
  );
}
