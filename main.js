

function criaTabuleiro(){
  const tabuleiro = document.createElement('div');
  tabuleiro.classList.add('tabuleiro');
  return tabuleiro;
}



const tab = criaTabuleiro();
document.body.appendChild(tab);