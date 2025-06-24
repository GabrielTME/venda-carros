// Importa hooks do React e React Router
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Componente principal: lista e filtra os carros
export default function Cars() {

  // Estado com a lista completa de carros vinda da API
  const [cars, setCars] = useState([]);

  // Estado com a lista de carros filtrados (exibidos na tela)
  const [filteredCars, setFilteredCars] = useState([]);

  // Estados auxiliares para montar opções de filtro dinâmicas de marca e modelo
  const [marcaOptions, setMarcaOptions] = useState([]);
  const [modeloOptions, setModeloOptions] = useState([]);

  // Estado para armazenar os valores preenchidos nos filtros
  const [filtro, setFiltro] = useState({
    marca: '',
    modelo: '',
    anoMin: '',
    anoMax: '',
    kmMin: '',
    kmMax: '',
    valorMin: '',
    valorMax: ''
  });

  // Hook de navegação para redirecionar o usuário
  const navigate = useNavigate();

  // Função que busca os carros na API e carrega no estado
  const fetchCars = () => {
    api.get('/cars').then(res => {
      setCars(res.data);
      setFilteredCars(res.data); // inicialmente, sem filtros aplicados

      // Extrai marcas distintas da lista de carros para montar o filtro de marcas
      const marcas = [...new Set(res.data.map(car => car.marca))];
      setMarcaOptions(marcas);
    });
  };

  // Quando o componente for carregado, busca os dados
  useEffect(() => {
    fetchCars();
  }, []);

  // Quando o filtro de marca muda, atualiza as opções de modelo relacionadas
  useEffect(() => {
    if (filtro.marca) {
      const modelos = [...new Set(cars.filter(car => car.marca === filtro.marca).map(car => car.modelo))];
      setModeloOptions(modelos);
    } else {
      setModeloOptions([]);
    }
  }, [filtro.marca, cars]);

  // Formata o valor numérico digitado pelo usuário (ex.: KM e Valor)
  const formatNumberInput = (value) => {
    value = value.replace(/\D/g, ''); // remove qualquer caractere não numérico
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('pt-BR');
  };

  // Manipula alterações nos campos de filtro
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;

    if (['kmMin', 'kmMax', 'valorMin', 'valorMax'].includes(name)) {
      const formatted = formatNumberInput(value);
      setFiltro({ ...filtro, [name]: formatted });
    } else {
      setFiltro({ ...filtro, [name]: value });
    }
  };

  // Aplica os filtros preenchidos pelo usuário na lista de carros
  const aplicarFiltros = () => {
    let filtrados = [...cars];

    if (filtro.marca)
      filtrados = filtrados.filter(car => car.marca === filtro.marca);

    if (filtro.modelo)
      filtrados = filtrados.filter(car => car.modelo === filtro.modelo);

    if (filtro.anoMin)
      filtrados = filtrados.filter(car => parseInt(car.ano) >= parseInt(filtro.anoMin));

    if (filtro.anoMax)
      filtrados = filtrados.filter(car => parseInt(car.ano) <= parseInt(filtro.anoMax));

    if (filtro.kmMin)
      filtrados = filtrados.filter(car => parseInt(car.quilometragem) >= parseInt(filtro.kmMin.replace(/\./g, '')));

    if (filtro.kmMax)
      filtrados = filtrados.filter(car => parseInt(car.quilometragem) <= parseInt(filtro.kmMax.replace(/\./g, '')));

    if (filtro.valorMin)
      filtrados = filtrados.filter(car => parseInt(car.valor) >= parseInt(filtro.valorMin.replace(/\./g, '')));

    if (filtro.valorMax)
      filtrados = filtrados.filter(car => parseInt(car.valor) <= parseInt(filtro.valorMax.replace(/\./g, '')));

    setFilteredCars(filtrados);
  };

  // Formata quilometragem para exibição com separador de milhar
  const formatQuilometragem = (value) => {
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('pt-BR');
  };

  // Formata valor monetário para exibição
  const formatValor = (value) => {
    if (!value) return '';
    return 'R$' + parseInt(value, 10).toLocaleString('pt-BR');
  };

  // JSX principal que renderiza o filtro e a lista de carros
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Filtros</h2>

      {/* Área de filtros */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        {/* Filtro de marca */}
        <select name="marca" value={filtro.marca} onChange={handleFiltroChange} style={selectStyle}>
          <option value="">Marca</option>
          {marcaOptions.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Filtro de modelo (só aparece se marca for selecionada) */}
        <select name="modelo" value={filtro.modelo} onChange={handleFiltroChange} disabled={!filtro.marca} style={selectStyle}>
          <option value="">Modelo</option>
          {modeloOptions.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Filtros adicionais */}
        <input type="number" name="anoMin" placeholder="Ano mín." value={filtro.anoMin} onChange={handleFiltroChange} style={inputStyle} />
        <input type="number" name="anoMax" placeholder="Ano máx." value={filtro.anoMax} onChange={handleFiltroChange} style={inputStyle} />
        <input type="text" name="kmMin" placeholder="KM mín." value={filtro.kmMin} onChange={handleFiltroChange} style={inputStyle} />
        <input type="text" name="kmMax" placeholder="KM máx." value={filtro.kmMax} onChange={handleFiltroChange} style={inputStyle} />
        <input type="text" name="valorMin" placeholder="Valor mín." value={filtro.valorMin} onChange={handleFiltroChange} style={inputStyle} />
        <input type="text" name="valorMax" placeholder="Valor máx." value={filtro.valorMax} onChange={handleFiltroChange} style={inputStyle} />

        {/* Botão de aplicar filtros */}
        <button onClick={aplicarFiltros} style={buttonStyle}>
          Filtrar
        </button>
      </div>

      {/* Se não houver carros após o filtro */}
      {filteredCars.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Nenhum carro encontrado.</p>
      ) : (
        // Lista de cards dos carros
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {filteredCars.map(car => (
            <div key={car.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '250px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              background: '#fff'
            }}>
              {/* Imagem do carro */}
              {car.imagem && <img src={car.imagem} alt="Carro" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
              <h3>{car.marca} {car.modelo}</h3>
              <p><strong>Ano:</strong> {car.ano}</p>
              <p><strong>KM:</strong> {formatQuilometragem(car.quilometragem)}</p>
              <p><strong>Valor:</strong> {formatValor(car.valor)}</p>

              {/* Botão para ir aos detalhes */}
              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <button onClick={() => navigate(`/cars/${car.id}`)} style={viewButton}>Ver Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Estilos utilizados

const selectStyle = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  minWidth: '130px'
};

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '110px'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const viewButton = {
  background: '#1671ED',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  width: '100%'
};
