// Importa hooks do React e do React Router
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Componente responsável por editar um carro existente
export default function EditCar() {
  // Obtém o ID do carro a partir da URL (parâmetro de rota)
  const { id } = useParams();

  // Hook de navegação para redirecionar o usuário após salvar
  const navigate = useNavigate();

  // Estado que armazena os dados do carro que será editado
  const [car, setCar] = useState({
    imagem: '',
    marca: '',
    modelo: '',
    motorizacao: '',
    ano: '',
    quilometragem: '',
    valor: ''
  });

  // Ao carregar o componente, busca os dados atuais do carro na API
  useEffect(() => {
    api.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  // Atualiza o estado conforme o usuário digita nos campos
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // Envia os dados atualizados para a API e redireciona
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita o comportamento padrão do formulário
    await api.put(`/cars/${id}`, car); // faz o update no backend
    navigate('/cars'); // volta para a lista de carros
  };

  // JSX da tela de edição
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          maxWidth: '400px', 
          width: '100%', 
          background: '#f9f9f9', 
          padding: '2rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Editar veículo</h2>

        {/* Campos de edição do formulário */}
        {['imagem', 'marca', 'modelo', 'motorizacao', 'ano', 'quilometragem', 'valor'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={car[field]}
            onChange={handleChange}
            style={{ 
              padding: '0.5rem', 
              margin: '0.5rem 0', 
              width: '100%', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
          />
        ))}

        {/* Botão de submit */}
        <button 
          type="submit" 
          style={{ 
            padding: '0.5rem', 
            background: '#1671ED', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            width: '100%' 
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
