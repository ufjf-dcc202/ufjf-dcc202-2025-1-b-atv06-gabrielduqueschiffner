// main.js
import { getTabuleiro, selecionaPeca } from "./peca.js";

function criaTabuleiro() {
  const tabuleiro = document.createElement("div");
  tabuleiro.classList.add("tabuleiro");
  return tabuleiro;
}

function criaCelula(posicao) {
  const celula = document.createElement("div");
  celula.classList.add("celula");
  celula.dataset.posicao = posicao;
  return celula;
}

function criaPeca(cor) {
  const peca = document.createElement("div");
  peca.classList.add("peca", cor);
  return peca;
}

// container DOM do tabuleiro
const tab = criaTabuleiro();
document.body.appendChild(tab);

function renderizaTudo() {
  const estado = getTabuleiro();   // estado do jogo (MATRIZ)
  tab.innerHTML = "";              // limpa o DOM 

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const posicao = `${i}-${j}`;
      const celula = criaCelula(posicao);

      // fora da cruz, xispa criatura maligna
      if ((i < 2 || i > 4) && (j < 2 || j > 4)) {
        celula.classList.add("transparente");
        tab.appendChild(celula); // append no DOM
        continue;
      }

      celula.classList.add("casa");

      if (estado[i][j] === 1) {
        celula.appendChild(criaPeca("preto"));
      } else {
        celula.classList.add("branco");
      }

      tab.appendChild(celula);
    }
  }
}
renderizaTudo();

tab.addEventListener("click", function (evento) {
  const celula = evento.target.closest(".celula");
  if (!celula || !tab.contains(celula)) return;
  const [i, j] = celula.dataset.posicao.split("-").map(Number);

  selecionaPeca(i, j);   // altera o tabuleiro interno em peca.js

  // redesenha a partir do estado atualizado
  renderizaTudo();
});


