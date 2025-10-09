document.addEventListener("DOMContentLoaded", () => {
  // Dados das equipes
  let equipes = [];
  let rankingAtual = [];

  // Elementos DOM
  const rankingBody = document.getElementById("rankingBody");
  const totalTeamsEl = document.getElementById("totalTeams");
  const completedRunsEl = document.getElementById("completedRuns");
  const bestTimeEl = document.getElementById("bestTime");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Inicialização
  function inicializar() {
    carregarEquipes();
    ordenarRanking();
    atualizarEstatisticas();
    configurarFiltros();
    adicionarEfeitosVisuais();
  }

  // Carregar dados das equipes
  function carregarEquipes() {
    const linhas = Array.from(rankingBody.querySelectorAll("tr"));

    equipes = linhas.map(tr => {
      const tds = tr.querySelectorAll("td");
      if (tds.length >= 4) {
        const nome = tds[1].textContent.trim();
        const tempoTexto = tds[2].textContent.trim().replace(",", ".");
        const tempo = parseFloat(tempoTexto);
        const status = tds[3].querySelector('.status');

        return {
          nome,
          tempo: isNaN(tempo) ? null : tempo,
          status: status ? status.textContent.trim() : 'Pendente',
          linhaOriginal: tr.cloneNode(true)
        };
      }
      return null;
    }).filter(equipe => equipe !== null);
  }

  // Ordenar ranking
  function ordenarRanking() {
    const equipesComTempo = equipes.filter(e => e.tempo !== null);
    equipesComTempo.sort((a, b) => a.tempo - b.tempo);
    const equipesSemTempo = equipes.filter(e => e.tempo === null);

    rankingAtual = [...equipesComTempo, ...equipesSemTempo];
    renderizarRanking(rankingAtual);
  }

  // Renderizar ranking na tabela
  function renderizarRanking(equipesParaRenderizar) {
    rankingBody.innerHTML = "";

    equipesParaRenderizar.slice(0, 10).forEach((equipe, index) => {
      const novaLinha = equipe.linhaOriginal.cloneNode(true);
      const tds = novaLinha.querySelectorAll("td");

      // Atualizar posição
      if (tds.length > 0) {
        if (index === 0) tds[0].textContent = "🥇";
        else if (index === 1) tds[0].textContent = "🥈";
        else if (index === 2) tds[0].textContent = "🥉";
        else tds[0].textContent = index + 1;
      }

      // Aplicar classes de posição
      novaLinha.classList.remove("top1", "top2", "top3", "sem-tempo");
      if (index === 0) novaLinha.classList.add("top1");
      else if (index === 1) novaLinha.classList.add("top2");
      else if (index === 2) novaLinha.classList.add("top3");

      if (equipe.tempo === null) {
        novaLinha.classList.add("sem-tempo");
      }

      // Adicionar animação de entrada
      novaLinha.style.opacity = "0";
      novaLinha.style.transform = "translateY(20px)";

      rankingBody.appendChild(novaLinha);

      // Animar entrada
      setTimeout(() => {
        novaLinha.style.transition = "all 0.5s ease";
        novaLinha.style.opacity = "1";
        novaLinha.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // Atualizar estatísticas
  function atualizarEstatisticas() {
    const totalEquipes = equipes.length;
    const equipesComTempo = equipes.filter(e => e.tempo !== null);
    const melhorTempo = equipesComTempo.length > 0
      ? Math.min(...equipesComTempo.map(e => e.tempo)).toFixed(2) + "s"
      : "N/A";

    totalTeamsEl.textContent = totalEquipes;
    completedRunsEl.textContent = equipesComTempo.length;
    bestTimeEl.textContent = melhorTempo;

    // Animar números
    animarNumero(totalTeamsEl, totalEquipes);
    animarNumero(completedRunsEl, equipesComTempo.length);
  }

  // Animar números
  function animarNumero(elemento, valorFinal) {
    const valorInicial = 0;
    const duracao = 1000;
    const incremento = valorFinal / (duracao / 16);
    let valorAtual = valorInicial;

    const timer = setInterval(() => {
      valorAtual += incremento;
      if (valorAtual >= valorFinal) {
        elemento.textContent = valorFinal;
        clearInterval(timer);
      } else {
        elemento.textContent = Math.floor(valorAtual);
      }
    }, 16);
  }

  // Configurar filtros
  function configurarFiltros() {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remover classe active de todos os botões
        filterBtns.forEach(b => b.classList.remove("active"));
        // Adicionar classe active ao botão clicado
        btn.classList.add("active");

        const filtro = btn.dataset.filter;
        filtrarRanking(filtro);
      });
    });
  }

  // Filtrar ranking
  function filtrarRanking(filtro) {
    let equipesFiltradas = [];

    switch (filtro) {
      case "completed":
        equipesFiltradas = rankingAtual.filter(e => e.tempo !== null);
        break;
      case "pending":
        equipesFiltradas = rankingAtual.filter(e => e.tempo === null);
        break;
      default:
        equipesFiltradas = rankingAtual;
    }

    renderizarRanking(equipesFiltradas);
  }

  // Adicionar efeitos visuais
  function adicionarEfeitosVisuais() {
    // Efeito de hover nas linhas da tabela
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("tbody tr")) {
        const linha = e.target.closest("tbody tr");
        linha.style.transform = "scale(1.02)";
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("tbody tr")) {
        const linha = e.target.closest("tbody tr");
        linha.style.transform = "scale(1)";
      }
    });

    // Efeito de clique nos botões de filtro
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });
  }

  // Função para adicionar nova equipe (para uso futuro)
  function adicionarEquipe(nome, tempo = null) {
    const novaEquipe = {
      nome,
      tempo,
      status: tempo ? 'Concluído' : 'Pendente',
      linhaOriginal: null
    };

    equipes.push(novaEquipe);
    ordenarRanking();
    atualizarEstatisticas();
  }

  // Função para atualizar tempo de uma equipe
  function atualizarTempo(nomeEquipe, novoTempo) {
    const equipe = equipes.find(e => e.nome === nomeEquipe);
    if (equipe) {
      equipe.tempo = novoTempo;
      equipe.status = 'Concluído';
      ordenarRanking();
      atualizarEstatisticas();
    }
  }

  // Função para obter estatísticas detalhadas
  function obterEstatisticas() {
    const equipesComTempo = equipes.filter(e => e.tempo !== null);
    const tempos = equipesComTempo.map(e => e.tempo);

    return {
      totalEquipes: equipes.length,
      equipesComTempo: equipesComTempo.length,
      equipesPendentes: equipes.length - equipesComTempo.length,
      melhorTempo: tempos.length > 0 ? Math.min(...tempos) : null,
      piorTempo: tempos.length > 0 ? Math.max(...tempos) : null,
      tempoMedio: tempos.length > 0 ? tempos.reduce((a, b) => a + b, 0) / tempos.length : null
    };
  }

  // Adicionar funcionalidade de busca (opcional)
  function adicionarBusca() {
    const inputBusca = document.createElement("input");
    inputBusca.type = "text";
    inputBusca.placeholder = "Buscar equipe...";
    inputBusca.className = "search-input";

    const filtrosContainer = document.querySelector(".filters");
    filtrosContainer.parentNode.insertBefore(inputBusca, filtrosContainer);

    inputBusca.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();
      const equipesFiltradas = rankingAtual.filter(equipe =>
        equipe.nome.toLowerCase().includes(termo)
      );
      renderizarRanking(equipesFiltradas);
    });
  }

  // Função para exportar dados (opcional)
  function exportarDados() {
    const dados = {
      timestamp: new Date().toISOString(),
      estatisticas: obterEstatisticas(),
      ranking: rankingAtual.map((equipe, index) => ({
        posicao: index + 1,
        nome: equipe.nome,
        tempo: equipe.tempo,
        status: equipe.status
      }))
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ranking-buzzline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Adicionar teclas de atalho
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault();
          document.querySelector('[data-filter="all"]').click();
          break;
        case "2":
          e.preventDefault();
          document.querySelector('[data-filter="completed"]').click();
          break;
        case "3":
          e.preventDefault();
          document.querySelector('[data-filter="pending"]').click();
          break;
        case "e":
          e.preventDefault();
          exportarDados();
          break;
      }
    }
  });

  // Expor funções para uso externo
  window.RankingBuzzLine = {
    adicionarEquipe,
    atualizarTempo,
    obterEstatisticas,
    exportarDados,
    ordenarRanking
  };

  // Inicializar aplicação
  inicializar();

  // Log de inicialização
  console.log("🏆 Ranking Buzz Line inicializado com sucesso!");
  console.log("📊 Estatísticas:", obterEstatisticas());
  console.log("⌨️ Atalhos: Ctrl+1 (Todas), Ctrl+2 (Com tempo), Ctrl+3 (Pendentes), Ctrl+E (Exportar)");
});