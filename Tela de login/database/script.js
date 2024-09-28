async function createUsuario() {
    const nome = document.querySelector("#Nome").value;
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;

    const dados = { nome, usuario, senha, sexo };

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
}
