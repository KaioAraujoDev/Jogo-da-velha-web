
//Declarações de referências

const botoes = document.querySelectorAll('.sectionMain button');
const titulo = document.querySelector('.title');

const modal  = document.querySelector('.modal');
const botaoFechar = document.querySelector('.buttonClose');
      botaoFechar.onclick = resetar;
const botaoAgain = document.querySelector('.buttonAgain');
      botaoAgain.onclick = resetar;
const textVencedor = document.querySelector('.textVencedor');

let vezPrincipal = true;
let vencedor = false;

let arrayMarcados = [];

function hideModal (){
   modal.classList.add("modalHide");
}
function resetar(){
    vencedor = false;
    modal.classList.remove("modalVisivel");
    hideModal();
    titulo.innerText = "Clique para começar";
    for(let c = 0; c < arrayMarcados.length ; c++){
      if(arrayMarcados [c] !== undefined){
        switch(arrayMarcados[c]){
          case 1:
            botoes[c].classList.remove('x');
            break;
          case 2:
            botoes[c].classList.remove('circle');
            break;
        }
        
      }
    } 
    arrayMarcados = [];
}
//Passar rodada , a cada marco com a opção será trocado de jogador

function trocaJogador(){
   vezPrincipal = !vezPrincipal;
    if(vezPrincipal){
      titulo.innerText = "Jogador 1";
    }else{
      titulo.innerText = "Jogador 2";
    }
    
}
//Retorno ao jogador vencedor

function exibirVitoria(jogador){ 
    vencedor = true; 
    modal.classList.remove("modalHide");
    switch (jogador) {
      case 1:
        modal.classList.add("modalVisivel");
        textVencedor.innerText = "Jogador 1 venceu";
        break;
      case 2:
        modal.classList.add("modalVisivel");
        textVencedor.innerText = "Jogador 2 venceu";
        break;
    }
}

//Verificar as marcações do jogo da velha e possibilidades de vitória

function verificar () {
  
  //Comparando colunas
 
    if((arrayMarcados[0] === arrayMarcados[1] && ( arrayMarcados[0] !== undefined)) && (arrayMarcados[0] === arrayMarcados[2])){
       exibirVitoria(arrayMarcados[0]);
    }else if((arrayMarcados[3] === arrayMarcados[4]  && ( arrayMarcados[3] !== undefined)) && (arrayMarcados[3] === arrayMarcados[5])){
       exibirVitoria(arrayMarcados[3]);
    }else if((arrayMarcados[6] === arrayMarcados[7]  && ( arrayMarcados[6] !== undefined)) && (arrayMarcados[6] === arrayMarcados[8])){
       exibirVitoria(arrayMarcados[6]);
    }

    //Comparando linhas

    if((arrayMarcados[0] === arrayMarcados[3] && ( arrayMarcados[0] !== undefined)) && (arrayMarcados[0] === arrayMarcados[6])){
       exibirVitoria(arrayMarcados[0]);
    }else if((arrayMarcados[1] === arrayMarcados[4] && ( arrayMarcados[1] !== undefined)) && (arrayMarcados[1] === arrayMarcados[7])){
       exibirVitoria(arrayMarcados[1]);
    }else if((arrayMarcados[2] === arrayMarcados[5] && ( arrayMarcados[2] !== undefined)) && (arrayMarcados[2] === arrayMarcados[8])){
       exibirVitoria(arrayMarcados[2]);
    }
  
    //Comparando Diagonais

     if((arrayMarcados[0] === arrayMarcados[4] && ( arrayMarcados[0] !== undefined)) && (arrayMarcados[0] === arrayMarcados[8])){
       exibirVitoria(arrayMarcados[0]);
    }else if((arrayMarcados[2] === arrayMarcados[4] && ( arrayMarcados[2] !== undefined)) && (arrayMarcados[2] === arrayMarcados[6])){
       exibirVitoria(arrayMarcados[2]);
    }
   
   //Condição de empate
   //Verificando se todos os campos estão preenchidos e que não existe nenhum vencedor
   for(let c = 0; c < 9 ; c++ ){
      if(arrayMarcados[c] === undefined ){
        break;
      }
     
     if((c === 8) && (vencedor === false ) ) {
        textVencedor.innerText = "Empate";
        modal.classList.remove("modalHide");
        modal.classList.add("modalVisivel");
      }
     
   }
  
}

//Campo   = botao
//Posicao = posição em que vai ser armazenado no vetor

function marcar(campo,posicao){
    if(arrayMarcados[posicao] === undefined){
      switch(vezPrincipal){
          case true:
            arrayMarcados[posicao] = 1;
            campo.classList.add('x');
            break;
          case false:
             arrayMarcados[posicao] = 2;
             campo.classList.add('circle');
          break;
      }
      campo.style.animation="marcar 0.5s";
      campo.style.backgroundSize = "cover";
      
      verificar();
      trocaJogador();
     }
}
//Adicionando evento de clique a todos os botões

for(let c = 0; c < botoes.length ; c++){
  botoes[c].onclick = function(){
    marcar(botoes[c],c)
  }
}
