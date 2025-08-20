// main.js

import { getTabuleiro } from './peca.js';

const tabuleiro = getTabuleiro();


function criaTabuleiro(){
  const tabuleiro = document.createElement('div');
  tabuleiro.classList.add('tabuleiro');

  return tabuleiro;
}

function criaCelula(posicao){ 
    const celula = document.createElement('div');
    celula.classList.add('celula');
    celula.dataset.posicao = posicao;
    return celula;
}


function criaPeca(cor, posicao){
    const peca = document.createElement('div');
    peca.classList.add('peca', cor);
    peca.dataset.posicao = posicao;
    return peca;
}


const tab = criaTabuleiro();
document.body.appendChild(tab);



for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    // cria célula

   const posicao = `${i}-${j}`;
   const celula = criaCelula(posicao);

    // checa se é posição inválida (fora da cruz)
    if ((i < 2 || i > 4) && (j < 2 || j > 4)) {
       celula.classList.add('transparente');
      tab.appendChild(celula);
      continue; // pula pro próximo
    } 

    // posição válida → decide peça
    let corPeca = tabuleiro[i][j] === 1 ? 'preto' : 'branco';
    const peca = criaPeca(corPeca, posicao);

    celula.appendChild(peca);
    tab.appendChild(celula);
  }
}
