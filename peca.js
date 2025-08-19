const tabuleiro = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
];

export function getTabuleiro() {
  return [...tabuleiro];
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
    tabuleiro[meioLinha][meioColuna] = 0; // Remove a peça pulada
  }

  return true;
}
