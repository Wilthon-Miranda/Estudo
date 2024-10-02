async function validar() {
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;

    // Fazendo a requisição para a URL
    fetch(`http://localhost:3000/usuarios?search=${usuario}`)
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Atribui
            const resultado = data;

            // Verifica se algum resultado foi encontrado
            if (resultado.length > 0) {
                // Exibindo o nome do primeiro resultado no alert
                if(senha == resultado[0].senha){
                window.alert(`Login efetuado com sucesso, seja bem vindo(a) (${resultado[0].usuario})`);
            }
            else{
                window.alert(`Senha do usuario (${resultado[0].usuario}) esta incorreta`);
            }
            } else {
                // Se nenhum resultado for encontrado, exibe uma mensagem de erro
                window.alert(`Nenhum usuário (${usuario}) encontrado.`);
            }
        })
        .catch(error => {
            // Tratamento de erro, caso a requisição falhe
            window.alert('Erro ao buscar os dados: ' + error);
        });
}
