const getElement = (e) => document.getElementById(e)

const urlAPI = 'https://crudcrud.com/api/7aa9a6f809194ea294eb19923dfee153/clientes'

const criarCliente = (c) => {
    console.log(c)
    const novoCliente = document.createElement('ul');

    novoCliente.innerHTML = `
    <li>${c.cliente}</li>
    <li>${c.email}</li>
    <li>
    <button type="button" id="buttonexcluir">
    Excluir
    </button>
    </li>
    `;

    const buttonExcluir = novoCliente.querySelector('#buttonexcluir');

    buttonExcluir.addEventListener('click', () => excluirCliente(c._id));

    getElement('clientes').appendChild(novoCliente)
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
        .then(data => criarCliente(data))
        .catch(err => console.log('Erro no POST:', err))
})

const carregarLista = async () => {
    const exibirClientes = getElement('clientes');
    exibirClientes.innerHTML = '';

    await fetch(urlAPI)
        .then(response => response.json())
        .then(data => data.forEach(c => criarCliente(c)))
        .catch(err => console.log('erro no GET:', err))
}

carregarLista()