function validar() {
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;
    if (usuario == 123 && senha == 123) {
        window.alert("usuario: " + usuario + "\nsenha: " + senha + "\nLOGIN CORRETO!!!");
    }
    else {
        window.alert("usuario: " + usuario + "\nsenha: " + senha + "\nLOGIN INCORRETO!!!");
    }
}
function cadastrar() {
    //recebe os valores da tela de cadastro
    const nome = document.querySelector("#Nome").value;
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked').value;


    if (nome && usuario && senha && sexoSelecionado) {
        // Exibe o valor no console ou pode usar em qualquer outra lógica
        alert('Nome: ' + nome + '\nUsuario: ' + usuario + '\nSenha: ' + senha + '\nSexo selecionado: ' + sexoSelecionado);
    }
    else {
        alert('Favor preencher todos os campos');
    }
}
