

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



const tab = criaTabuleiro();
document.body.appendChild(tab);

  for(let i=0; i<49; i++){
    const celula = criaCelula();
    tab.appendChild(celula);
   
  }

