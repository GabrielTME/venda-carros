// Importa o axios (cliente HTTP)
import axios from 'axios';

// Cria uma instância de axios pré-configurada com a URL base da API
const api = axios.create({
  baseURL: 'http://localhost:3001' // Backend local (JSON Server)
});

// Exporta essa instância para ser usada em todo o projeto
export default api;
