document.addEventListener('DOMContentLoaded', function() {
  const livroDetalhes = document.getElementById('livro-detalhes');
  const urlParams = new URLSearchParams(window.location.search);
  const livroId = parseInt(urlParams.get('id'));

  const livros = [
      { id: 1, titulo: "A Jornada da Fé", autor: "Rev. Antônio Elias", imagem: "livro-1.png", descricao: "Uma exploração profunda sobre os desafios e recompensas de uma vida de fé.", preco: 29.90 },
      { id: 2, titulo: "Sermões para o Coração", autor: "Rev. Antônio Elias", imagem: "livro-2.png", descricao: "Uma coleção de sermões inspiradores que tocam a alma e elevam o espírito.", preco: 34.50 },
      { id: 3, titulo: "Reflexões Diárias", autor: "Maria José Elias", imagem: "livro-3.png", descricao: "365 meditações para fortalecer sua caminhada espiritual diariamente.", preco: 39.90 },
      { id: 4, titulo: "O Poder da Oração", autor: "Rev. Antônio Elias", imagem: "livro-4.png", descricao: "Um guia prático para desenvolver uma vida de oração eficaz e transformadora.", preco: 27.80 },
      { id: 5, titulo: "Família e Fé", autor: "Maria José Elias", imagem: "livro-5.png", descricao: "Conselhos sábios para construir uma família forte alicerçada em princípios cristãos.", preco: 32.00 },
      { id: 6, titulo: "Liderança Cristã", autor: "Rev. Antônio Elias", imagem: "livro-6.png", descricao: "Princípios bíblicos de liderança para servir na igreja e na comunidade.", preco: 36.90 },
      { id: 7, titulo: "Estudos Bíblicos Aprofundados", autor: "Rev. Antônio Elias", imagem: "livro-7.png", descricao: "Uma análise detalhada de passagens-chave das Escrituras para um entendimento mais profundo.", preco: 42.00 },
      { id: 8, titulo: "Testemunhos de Graça", autor: "Maria José Elias", imagem: "livro-8.png", descricao: "Histórias reais de vidas transformadas pelo poder do evangelho.", preco: 29.90 },
      { id: 9, titulo: "O Desafio do Discipulado", autor: "Rev. Antônio Elias", imagem: "livro-9.png", descricao: "Um chamado para viver uma vida de discípulo autêntico de Jesus Cristo.", preco: 31.50 },
      { id: 10, titulo: "Adoração em Espírito e Verdade", autor: "Maria José Elias", imagem: "livro-10.png", descricao: "Explorando o significado e a prática da verdadeira adoração cristã.", preco: 33.00 },
      { id: 11, titulo: "Evangelismo no Século XXI", autor: "Rev. Antônio Elias", imagem: "livro-11.png", descricao: "Estratégias modernas para compartilhar o evangelho em um mundo em constante mudança.", preco: 35.90 },
      { id: 12, titulo: "A Graça Transformadora", autor: "Maria José Elias", imagem: "livro-12.png", descricao: "Um olhar profundo sobre como a graça de Deus pode mudar vidas.", preco: 30.50 },
      { id: 13, titulo: "Missões: Um Chamado Global", autor: "Rev. Antônio Elias", imagem: "livro-13.png", descricao: "Inspirando e equipando cristãos para o campo missionário local e global.", preco: 37.80 }
  ];

  function encontrarLivro(id) {
      return livros.find(livro => livro.id === id);
  }

  function formatarPreco(preco) {
      return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function exibirDetalhesLivro(livro) {
      if (livro) {
          livroDetalhes.innerHTML = `
              <h1>${livro.titulo}</h1>
              <div class="livro-conteudo">
                  <div class="livro-imagem-container">
                      <img src="${livro.imagem}" alt="${livro.titulo}">
                  </div>
                  <div class="livro-info">
                      <p><strong>Autor:</strong> ${livro.autor}</p>
                      <p><strong>Preço:</strong> ${formatarPreco(livro.preco)}</p>
                      <p>${livro.descricao}</p>
                      <a href="#" class="botao-comprar">Comprar</a>
                      <a href="livros.html" class="botao-voltar">Voltar para a lista de livros</a>
                  </div>
              </div>
          `;
      } else {
          livroDetalhes.innerHTML = '<p>Livro não encontrado. <a href="livros.html">Voltar para a lista de livros</a></p>';
      }
  }

  const livro = encontrarLivro(livroId);
  exibirDetalhesLivro(livro);

  // Adicionar evento de clique ao botão de compra
  livroDetalhes.addEventListener('click', function(e) {
      if (e.target.classList.contains('botao-comprar')) {
          e.preventDefault();
          alert(`Obrigado por comprar "${livro.titulo}"! Este é apenas um exemplo. Em um site real, você seria redirecionado para o processo de checkout.`);
      }
  });
});