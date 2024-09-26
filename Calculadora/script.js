//Inicializa o valor da tela como vazio
tela = ""

//digita o valores na tela
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

//limpa todas informações preenchidas na tela
function limpar(){
    tela = ''
    preencher(tela);
}

//Exibe o valor do calculo na tela
function calcular(){
    calculo = tela;
    resultado = eval(calculo); //eval faz com que a variavel venha ser intepretado como codigo
    tela = resultado;
    preencher(tela);
}