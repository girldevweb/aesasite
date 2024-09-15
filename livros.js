document.addEventListener('DOMContentLoaded', function() {
  const livrosGrid = document.getElementById('livros-grid');
  const categoriaDropdown = document.getElementById('categoria-dropdown');
  
  if (!livrosGrid) {
      console.error('Elemento #livros-grid não encontrado!');
      return;
  }

  const livros = [
      { id: 1, titulo: "A Jornada da Fé", autor: "Rev. Antônio Elias", imagem: "images/livro-1.png", categoria: "teologia", descricao: "Uma exploração profunda sobre os desafios e recompensas de uma vida de fé." },
      { id: 2, titulo: "Sermões para o Coração", autor: "Rev. Antônio Elias", imagem: "images/livro-2.png", categoria: "devocional", descricao: "Uma coleção de sermões inspiradores que tocam a alma e elevam o espírito." },
      { id: 3, titulo: "Reflexões Diárias", autor: "Maria José Elias", imagem: "images/livro-3.png", categoria: "devocional", descricao: "365 meditações para fortalecer sua caminhada espiritual diariamente." },
      { id: 4, titulo: "O Poder da Oração", autor: "Rev. Antônio Elias", imagem: "images/livro-4.png", categoria: "devocional", descricao: "Um guia prático para desenvolver uma vida de oração eficaz e transformadora." },
      { id: 5, titulo: "Família e Fé", autor: "Maria José Elias", imagem: "images/livro-5.png", categoria: "familia", descricao: "Conselhos sábios para construir uma família forte alicerçada em princípios cristãos." },
      { id: 6, titulo: "Liderança Cristã", autor: "Rev. Antônio Elias", imagem: "images/livro-6.png", categoria: "lideranca", descricao: "Princípios bíblicos de liderança para servir na igreja e na comunidade." },
      { id: 7, titulo: "Estudos Bíblicos Aprofundados", autor: "Rev. Antônio Elias", imagem: "images/livro-7.png", categoria: "teologia", descricao: "Uma análise detalhada de passagens-chave das Escrituras para um entendimento mais profundo." },
      { id: 8, titulo: "Testemunhos de Graça", autor: "Maria José Elias", imagem: "images/livro-8.png", categoria: "evangelismo", descricao: "Histórias reais de vidas transformadas pelo poder do evangelho." },
      { id: 9, titulo: "O Desafio do Discipulado", autor: "Rev. Antônio Elias", imagem: "images/livro-4.png", categoria: "lideranca", descricao: "Um chamado para viver uma vida de discípulo autêntico de Jesus Cristo." },
      { id: 10, titulo: "Adoração em Espírito e Verdade", autor: "Maria José Elias", imagem: "images/livro-5.png", categoria: "devocional", descricao: "Explorando o significado e a prática da verdadeira adoração cristã." },
      { id: 11, titulo: "Evangelismo no Século XXI", autor: "Rev. Antônio Elias", imagem: "images/livro-6.png", categoria: "evangelismo", descricao: "Estratégias modernas para compartilhar o evangelho em um mundo em constante mudança." },
      { id: 12, titulo: "A Graça Transformadora", autor: "Maria José Elias", imagem: "images/livro-1.png", categoria: "teologia", descricao: "Um olhar profundo sobre como a graça de Deus pode mudar vidas." },
      { id: 13, titulo: "Missões: Um Chamado Global", autor: "Rev. Antônio Elias", imagem: "images/livro-2.png", categoria: "evangelismo", descricao: "Inspirando e equipando cristãos para o campo missionário local e global." }
  ];

  function renderizarLivros(livrosFiltrados) {
      livrosGrid.innerHTML = '';
      livrosFiltrados.forEach(livro => {
          const livroCard = document.createElement('div');
          livroCard.className = 'livro-card';
          livroCard.innerHTML = `
              <div class="livro-imagem">
                  <img src="${livro.imagem}" alt="${livro.titulo}">
                  <a href="livro.html?id=${livro.id}" class="ver-livro" data-id="${livro.id}">Ver livro</a>
              </div>
              <h3 class="livro-titulo">${livro.titulo}</h3>
              <p class="livro-autor">${livro.autor}</p>
          `;
          livrosGrid.appendChild(livroCard);
      });
  }

  renderizarLivros(livros);

  if (categoriaDropdown) {
      categoriaDropdown.addEventListener('change', function() {
          const categoriaSelecionada = this.value;
          const livrosFiltrados = categoriaSelecionada === 'todos' 
              ? livros 
              : livros.filter(livro => livro.categoria === categoriaSelecionada);
          renderizarLivros(livrosFiltrados);
      });
  }

  livrosGrid.addEventListener('click', function(e) {
      if (e.target.classList.contains('ver-livro')) {
          e.preventDefault();
          const livroId = parseInt(e.target.getAttribute('data-id'));
          const livroUrl = e.target.href;
          console.log('Link "Ver livro" clicado:', { id: livroId, url: livroUrl });
          
          if (livroUrl) {
              window.location.href = livroUrl;
          } else {
              console.error('URL do livro não definida');
          }
      }
  });
});