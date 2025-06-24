// Exporta o componente Footer como padrão deste arquivo
export default function Footer() {
  // Retorna o JSX que define o conteúdo e o estilo do rodapé (footer)
  return (
    <footer 
      style={{ 
        background: '#1C1C1C', // Cor de fundo escura (cinza quase preto)
        color: '#fff', // Cor do texto branca
        padding: '1rem', // Espaçamento interno de 1 unidade rem (aprox. 16px)
        textAlign: 'center', // Centraliza o texto horizontalmente
        marginTop: 'auto' // Garante que o rodapé fique na parte inferior da página, ocupando o espaço restante
      }}
    >
      {/* Texto exibido no rodapé */}
      © 2025 Projeto de Front-end: Sistema de Venda de Carros Usados
    </footer>
  );
}
