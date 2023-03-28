const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
    criaItemLista(element);
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const itemExistente = itens.find(element => element.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(itemExistente) {
        itemAtual.id = itemExistente.id;
        
        atualizaItemLista(itemAtual)

        itens[itens.findIndex(element => element.id === itemExistente.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaItemLista(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaItemLista(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const novoItemNumero = document.createElement('strong');
    
    novoItemNumero.innerHTML = item.quantidade;
    novoItemNumero.dataset.id = item.id
    novoItem.appendChild(novoItemNumero);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaItemLista(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaItemLista(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaItemLista(item, id) {
    item.remove();

    itens.splice(itens.findIndex(element => element.id == id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}