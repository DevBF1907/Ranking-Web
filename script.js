document.addEventListener("DOMContentLoaded", () => {
  function ordenarRanking() {
    const tbody = document.getElementById("rankingBody");
    const linhas = Array.from(tbody.querySelectorAll("tr"));

    const equipes = [];

    linhas.forEach(tr => {
      const tds = tr.querySelectorAll("td");
      if (tds.length >= 3) {
        const nome = tds[1].textContent.trim();
        const tempoTexto = tds[2].textContent.trim().replace(",", ".");
        const tempo = parseFloat(tempoTexto);

        equipes.push({
          nome,
          tempo: isNaN(tempo) ? null : tempo,
          linhaOriginal: tr.cloneNode(true)
        });
       

      }
    });

    const equipesComTempo = equipes.filter(e => e.tempo !== null);
    equipesComTempo.sort((a, b) => a.tempo - b.tempo);
    const equipesSemTempo = equipes.filter(e => e.tempo === null);

    const rankingFinal = [...equipesComTempo, ...equipesSemTempo];

    tbody.innerHTML = "";

    rankingFinal.slice(0, 10).forEach((equipe, index) => {
      const novaLinha = equipe.linhaOriginal.cloneNode(true);
      const tds = novaLinha.querySelectorAll("td");

      if (tds.length > 0) {
        tds[0].textContent = index + 1;
      }

      if (tds.length > 0) {
  if (index === 0) tds[0].textContent = "🥇";
  else if (index === 1) tds[0].textContent = "🥈";
  else if (index === 2) tds[0].textContent = "🥉";
  else tds[0].textContent = index + 1;
}

     
      novaLinha.classList.remove("top1", "top2", "top3");
      if (index === 0) novaLinha.classList.add("top1");
      if (index === 1) novaLinha.classList.add("top2");
      if (index === 2) novaLinha.classList.add("top3");

      tbody.appendChild(novaLinha);
    });
  }

  ordenarRanking();
});
