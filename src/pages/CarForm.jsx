// Importa os hooks necessários do React e do React Router
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

// Componente CarForm: utilizado tanto para cadastro quanto para edição de carros
export default function CarForm() {

  // Estado inicial do formulário com todos os campos do carro
  const [form, setForm] = useState({
    imagem: '',
    marca: '',
    modelo: '',
    motorizacao: '',
    ano: '',
    quilometragem: '',
    cidade: '',
    valor: ''
  });

  // Hook de navegação programática (para redirecionar após salvar)
  const navigate = useNavigate();

  // Hook para capturar o parâmetro "id" da URL (para saber se é edição ou cadastro)
  const { id } = useParams();

  // Quando o componente for carregado, se existir um ID, busca os dados para edição
  useEffect(() => {
    if (id) {
      api.get(`/cars/${id}`).then(res => {
        // Preenche o formulário com os dados do carro, já formatando os campos numéricos
        setForm({
          ...res.data,
          quilometragem: formatNumber(res.data.quilometragem),
          valor: formatNumber(res.data.valor)
        });
      });
    }
  }, [id]);

  // Função para formatar números com separador de milhar (ex: 10000 -> 10.000)
  const formatNumber = (value) => {
    if (!value) return '';
    return parseInt(value.toString().replace(/\D/g, ''), 10).toLocaleString('pt-BR');
  };

  // Manipula as alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formata somente os campos numéricos durante a digitação
    if (['quilometragem', 'valor'].includes(name)) {
      setForm({ ...form, [name]: formatNumber(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Permite colar diretamente um link de imagem copiado (usando API de clipboard)
  const handlePasteImage = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setForm(prev => ({ ...prev, imagem: text }));
    } catch (err) {
      alert('Não foi possível acessar a área de transferência.');
    }
  };

  // Envia o formulário para a API (cadastrar ou atualizar)
  const handleSubmit = async () => {
    // Monta o payload removendo os pontos dos números
    const payload = {
      ...form,
      quilometragem: form.quilometragem.replace(/\./g, ''),
      valor: form.valor.replace(/\./g, '')
    };

    try {
      if (id) {
        // Se existe ID, atualiza o carro existente (PUT)
        await api.put(`/cars/${id}`, payload);
      } else {
        // Se não existe ID, cria um novo carro (POST)
        await api.post('/cars', payload);
      }
      // Após salvar, redireciona para a listagem de carros
      navigate('/cars');
    } catch (err) {
      alert('Erro ao salvar carro');
    }
  };

  // Renderização do componente
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Título: define se é cadastro ou edição */}
        <h2 style={{ textAlign: 'center' }}>{id ? 'Editar Carro' : 'Preencha os dados do veículo'}</h2>

        {/* Área de preview da imagem */}
        <div style={{ 
          width: '100%', 
          height: '200px', 
          marginBottom: '1rem', 
          background: '#ddd', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: '8px'
        }}>
          {form.imagem ? (
            <img src={form.imagem} alt="Preview" style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '8px' }} />
          ) : (
            <span style={{ color: '#777' }}>Sem imagem</span>
          )}
        </div>

        {/* Campo de imagem com botão de colar */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="imagem"
            placeholder="Imagem (URL)"
            value={form.imagem}
            onChange={handleChange}
            style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button onClick={handlePasteImage} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: '#1671ED', color: '#fff' }}>
            Colar
          </button>
        </div>

        <small style={{ color: '#555' }}>
          Envie sua imagem <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#1671ED' }}>aqui.</a>
        </small>

        {/* Campos do formulário gerados dinamicamente */}
        {['marca', 'modelo', 'motorizacao', 'ano', 'quilometragem', 'cidade', 'valor'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ))}

        {/* Botão de salvar */}
        <button 
          onClick={handleSubmit} 
          style={{ padding: '0.5rem 1rem', background: '#1671ED', color: '#fff', border: 'none', borderRadius: '4px', width: '100%', marginTop: '1rem' }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
