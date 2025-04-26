const getElement = (e) => document.getElementById(e)

const urlAPI = 'https://crudcrud.com/api/e25f8a2219a74a8d8bd2f657d926bb2c/clientes'

const criarElementoCliente = (clienteData) => {
    const exibirClientes = getElement('clientes');
    const novoCliente = document.createElement('ul');
    const nomeCliente = document.createElement('li');
    const emailCliente = document.createElement('li');
    const buttonExcluir = document.createElement('button');

    exibirClientes.appendChild(novoCliente);
    novoCliente.appendChild(nomeCliente);
    novoCliente.appendChild(emailCliente);
    novoCliente.appendChild(buttonExcluir);

    nomeCliente.textContent = clienteData.cliente;
    emailCliente.textContent = clienteData.email;
    buttonExcluir.textContent = 'Excluir';

    buttonExcluir.addEventListener('click', () => excluirCliente(clienteData._id));

    return novoCliente;
};

const excluirCliente = async (id) => {
    await fetch(`${urlAPI}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => carregarLista())
        .catch(err => console.error("Erro no DELETE:", err));
};

const buttonCadastrar = getElement('buttonCadastrar')
buttonCadastrar.addEventListener('click', async () => {
    const nome = getElement('nome').value
    const email = getElement('email').value

    await fetch(urlAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cliente: nome, email: email }),
    })
        .then(response => response.json())
        .then(data => criarElementoCliente(data))
        .catch(err => console.log('Erro no POST:', err))
})

const carregarLista = async () => {
    const exibirClientes = getElement('clientes');
    exibirClientes.innerHTML = '';

    await fetch(urlAPI)
        .then(response => response.json())
        .then(data => data.forEach(c => criarElementoCliente(c)))
        .catch(err => console.log('erro no GET:', err))
}

carregarLista()


//excluir
