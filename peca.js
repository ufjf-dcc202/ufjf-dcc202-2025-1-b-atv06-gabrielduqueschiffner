//peca.js

const tabuleiro = [
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
];

let pecaSelecionada = null;

export function getTabuleiro() {
  return tabuleiro.map((linha) => [...linha]);
}

export function posicaoValida(linha, coluna) {
  return (
    linha >= 0 &&
    linha < 7 &&
    coluna >= 0 &&
    coluna < 7 &&
    tabuleiro[linha][coluna] !== -1
  );
}

/**
 * Move uma peça no tabuleiro.
 * @param {number} origemLinha - A posição de origem da peça.
 * @param {number} origemColuna - A posição de origem da peça.
 * @param {number} destinoLinha - A posição de destino da peça.
 * @param {number} destinoColuna - A posição de destino da peça.
 * @returns {boolean} True se o movimento foi realizado, false caso contrário.
 */


export function moverPeca(origemLinha, origemColuna, destinoLinha, destinoColuna) {
  // valida posições no tabuleiro
  if (!posicaoValida(origemLinha, origemColuna) || !posicaoValida(destinoLinha, destinoColuna)) return false;

  // origem precisa ter peça e destino precisa estar vazio
  if (tabuleiro[origemLinha][origemColuna] !== 1 || tabuleiro[destinoLinha][destinoColuna] !== 0) return false;

  const dL = destinoLinha - origemLinha;
  const dC = destinoColuna - origemColuna;

  // só permite movimento cimabaixo e lados exatamente 2 casas (não diagonal)
  const moveVertical = Math.abs(dL) === 2 && dC === 0;
  const moveHorizontal = Math.abs(dC) === 2 && dL === 0;
  if (!moveVertical && !moveHorizontal) return false;

  // posição do meio
  const meioLinha = origemLinha + dL / 2;
  const meioColuna = origemColuna + dC / 2;

  // precisa haver peça no meio
  if (tabuleiro[meioLinha][meioColuna] !== 1) return false;

  // executa movimento
  tabuleiro[origemLinha][origemColuna] = 0;
  tabuleiro[meioLinha][meioColuna] = 0;
  tabuleiro[destinoLinha][destinoColuna] = 1;

  return true;
}


export function selecionaPeca(linha, coluna) {
  if (!posicaoValida(linha, coluna)) {
    return { status: "invalido" };
  }

  if (pecaSelecionada === null) {
    if (tabuleiro[linha][coluna] === 1) {
      pecaSelecionada = { linha, coluna };
      return { status: "selecionada", posicao: pecaSelecionada };
    }
    return { status: "invalido" };
  }

  if (pecaSelecionada.linha === linha && pecaSelecionada.coluna === coluna) {
    pecaSelecionada = null;
    return { status: "desmarcada" };
  }

  const origem = pecaSelecionada;
  const sucesso = moverPeca(origem.linha, origem.coluna, linha, coluna);

  pecaSelecionada = null;

  if (sucesso) {
    return { status: "movido", origem, destino: { linha, coluna } };
  } else {
    return { status: "falha" };
  }
}
