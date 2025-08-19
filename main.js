// main.js

const laranja = 'laranja';


function criaTabuleiro(){
  const tabuleiro = document.createElement('div');
  tabuleiro.classList.add('tabuleiro');

  return tabuleiro;
}

function criaCelula(){ 
    const celula = document.createElement('div');
    celula.classList.add('celula');
    return celula;
}


function criaPeca(cor, posicao){
    const peca = document.createElement('div');
    peca.classList.add('peca');
    peca.dataset.posicao = posicao;
    peca.dataset.cor = cor;
    return peca;
}



const tab = criaTabuleiro();
document.body.appendChild(tab);


  for(let i=0; i<49; i++){

    const celula = criaCelula();
    const peca = criaPeca(laranja,i);

    tab.appendChild(celula);
    celula.appendChild(peca);
   
  }


