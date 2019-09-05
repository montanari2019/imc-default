let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura")

function calcularIMC(peso,altura){
  return peso / (altura * altura)
}

let tabela = document.querySelector(".table");
function addTabela(nome, altura, imc, peso, indice){
 
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;
  
  let colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc;

  let colunaDeletar = document.createElement('td');
  let bttnDeletar = document.createElement('td');
  bttnDeletar.innerHTML = "<img src = 'assets/images/delete.svg'>";
  bttnDeletar.classList.add('btn');
  bttnDeletar.classList.add('btn-danger');
  colunaDeletar.appendChild(bttnDeletar);

  //Listerner para deletar
  bttnDeletar.addEventListener("click", (event) =>{

    event.preventDefault();
    deletarLinha(indice);

  });

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaDeletar);  

  tabela.appendChild(linha);
}

function limparCampos(){
  nome.value = "";
  peso.value = "";
  altura.value = "";
  nome.focus();
}

function addLocalStorage(nome, peso, altura, imc){
  
  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if(localStorage.getItem("listaIMC")){
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }else{
    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }
  mostrarMensagem('Imc Castrado', 'add' );
 
}

function limparTabela(){
  let qtdLinhas = tabela.rows.length;
  for(let i = qtdLinhas - 1; i>0; i--){
    tabela.deleteRow(i);
  }
}



function carregarStorage(){

  limparTabela();

  if(localStorage.getItem("listaIMC")){
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc,indice);
    });
  }
}

function deletarLinha(indice){
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(indice, 1);
  localStorage.setItem("listaIMC" , JSON.stringify(pessoas));
  carregarStorage();
  mostrarMensagem("Imc Deletado", "delete");
}


let mensagem = document.querySelector("#mensagem");
function mostrarMensagem(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.remove('d-none');

  if(tipo == 'add'){
    mensagem.classList.add('alert-success');
  }else if (tipo == 'delete'){
    mensagem.classList.add('alert-danger');
  }
}

  

setTimeout(() =>{
  mensagem.innerHTML = "";
  mensagem.classList.remove('alert-success');
  mensagem.classList.remove('alert-danger');
  mensagem.classList.add('d-none');
},2000);

document.querySelector("#btn-calcular").addEventListener("click",(event) => {

  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  
  // addTabela(nome.value,altura.value,imc.toFixed(2),peso.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc.toFixed(2));
  carregarStorage();
  
 
  













  limparCampos();
  console.log("Nome: " + nome.value);
  console.log("IMC: " + imc.toFixed(2));

  


});
