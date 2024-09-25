//Inicializa o valor da tela como vazio
tela = ""

//
function preencher(tela){
    document.getElementById('tela').innerHTML = tela;
}

//adiciona o proximo valor pressionado
function receber(campo){
    tela += campo;
    preencher(tela);
};

//apaga a ultima informação digitada na tela
function apagar(){
    tela = tela.slice(0, -1);  // Obtém o conteúdo como string
    preencher(tela);
}

//apaga todas as informações preenchidas na tela
function limpar(){
    tela = ''
    preencher(tela);
}

//Exibe o valor do calculo na tela
function calcular(){
    calculo = tela;
    resultado = eval(calculo);
    tela = resultado
    preencher(resultado);
}