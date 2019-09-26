let nome = document.querySelector("#nome")

let peso = document.querySelector("#peso")

let altura = document.querySelector("#altura")

let tabela =  document.querySelector('.table')

let mensagem = document.querySelector('#mensagem')


// Função para preencher a tabela
function addTabela(nome, peso, altura, imc, indice){

  // Mapeando os dados 
  let colunaNome = document.createElement('td')
  colunaNome.innerHTML = nome

  let colunaPeso = document.createElement('td')
  colunaPeso.innerHTML = peso

  let colunaAltura = document.createElement('td')
  colunaAltura.innerHTML = altura

  let colunaImc = document.createElement('td')
  colunaImc.innerHTML = imc

  // let colunaResultado = document.createElement('td')
  // colunaResultado.innerHTML = resultado

  let colunaDeletar = document.createElement('td')

  let btnDeletar = document.createElement('button')
  btnDeletar.innerHTML = '<img src = "assets/images/delete.svg" alt = "Deletar IMC">'
  btnDeletar.classList.add('btn')
  btnDeletar.classList.add('btn-danger')


  btnDeletar.addEventListener("click", () =>{
    event.preventDefault()
    deletarLinha(indice)
  })

  colunaDeletar.appendChild(btnDeletar)


  let linha = document.createElement('tr');

  // inserindo nas colunas da tabelas os respectivos dados
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaImc);
  // linha.appendChild(colunaResultado);
  linha.appendChild(colunaDeletar);

  tabela.appendChild(linha);
}

// Função para Armazenar dados no localStorage
function addlocalStorage(nome, peso, altura, imc){

  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if(localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"))
    listaIMC.push(pessoa)
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC))
  
  } else{
    let listaIMC = []
    listaIMC.push(pessoa)
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC))
  }

  mostrarMensagens("IMC Adicionado", "add")
}


// Função para pegar os dados do localStorage e colocalos na tabela 
function carregarLocalStorage(){
   limparTabela()

   let listaIMC = JSON.parse(localStorage.getItem("listaIMC"))

   if(localStorage.getItem("listaIMC")){
      listaIMC.forEach((pessoa, indice ) => {
        addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc.toFixed(2), indice)
      });
    }else{

       mostrarMensagens("Nenhum IMC a ser exebido","table")
    }
}

// Função para Limpar a tabela
function limparTabela(){
  let qtsLinhas =  tabela.rows.length
  
  for(let i = qtsLinhas -1 ; i > 0; i --){
    tabela.deleteRow(i)
  }
}

// Função para Limpar o Formulário
function limparFormulario(){
  nome.value = ""
  peso.value = ""
  altura.value = ""

  nome.focus()

}


// Função de deletar com botão
function deletarLinha(index){
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"))
  pessoas.splice(index, 1);

  localStorage.setItem("listaIMC", JSON.stringify(pessoas))
  carregarLocalStorage()

  mostrarMensagens("IMC Deletado com Sucesso", "delete")
}


// Funçõ de calcular o imc
function calcularIMC(peso, altura){
  return peso / (altura * altura)
}

// Função de mostrar mensagens
function mostrarMensagens(msg, tipo){

  mensagem.innerHTML = msg
  mensagem.classList.add("d-block")

  if(tipo == 'add'){
    mensagem.classList.add("alert-success")
  }else if(tipo == 'delete'){
    mensagem.classList.add("alert-danger")
  }else if(tipo == 'table'){
    mensagem.classList.add('alert-warning')
  }


  setTimeout(() => {
    mensagem.innerHTML = ""
    mensagem.classList.remove("alert-danger");
    mensagem.classList.remove("alert-success");
    mensagem.classList.remove("alert-warning");
    mensagem.classList.remove("d-none");

  }, 2000);
}


// Função qUe exibe o resultado do IMC 
function resultadoIMC(imc){
  
  if(imc < 18.5){
    
  }

}



// Fezendo Click do Botão
document.querySelector("#btn-calcular").addEventListener("click", () => {

  // Essa função abaixo serve para não recarregar a pagina quando o botão for clicado
  event.preventDefault();

  let imc = calcularIMC(peso.value, altura.value)

  addlocalStorage(nome.value, peso.value, altura.value, imc)
  
  carregarLocalStorage();

  limparFormulario()

  console.log(imc.toFixed(2))
})



