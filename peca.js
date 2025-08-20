//peca.js

const tabuleiro = [
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1,0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
];

let pecaSelecionada = null;

export function getTabuleiro() {
  return tabuleiro.map(linha => [...linha]);
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

export function moverPeca(
  origemLinha,
  origemColuna,
  destinoLinha,
  destinoColuna
) {
  if (tabuleiro[destinoLinha][destinoColuna] !== 0) return false;
  if (
    Math.abs(destinoLinha - origemLinha) > 2 ||
    Math.abs(destinoColuna - origemColuna) > 2
  )
    return false;
  if (
    Math.abs(destinoLinha - origemLinha) === 2 &&
    Math.abs(destinoColuna - origemColuna) === 2
  ) {
    const meioLinha = (origemLinha + destinoLinha) / 2;
    const meioColuna = (origemColuna + destinoColuna) / 2;
    if (tabuleiro[meioLinha][meioColuna] !== 1) return false;
  } else if (
    Math.abs(destinoLinha - origemLinha) === 1 &&
    Math.abs(destinoColuna - origemColuna) === 1
  ) {
    if (tabuleiro[destinoLinha][destinoColuna] !== 0) return false;
  } else {
    if (
      tabuleiro[destinoLinha][destinoColuna] !== 0 ||
      tabuleiro[origemLinha][origemColuna] !== 1
    )
      return false;
  }

  tabuleiro[destinoLinha][destinoColuna] = 1;
  tabuleiro[origemLinha][origemColuna] = 0;

  if (
    Math.abs(destinoLinha - origemLinha) === 2 &&
    Math.abs(destinoColuna - origemColuna) === 2
  ) {
    const meioLinha = (origemLinha + destinoLinha) / 2;
    const meioColuna = (origemColuna + destinoColuna) / 2;
    tabuleiro[meioLinha][meioColuna] = 0; 
  }

  return true;
}



export function selecionaPeca(linha, coluna) {
 
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
