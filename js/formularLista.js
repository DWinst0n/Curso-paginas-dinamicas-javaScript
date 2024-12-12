import { obterDataAtual } from "./obterDataAtual.js";

const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-de-compras-compradas");
const listaCompradosContainer = document.getElementById("itensComprados");

let contadorItensLista;
let contadorItensComprados;
function contarItens() {
    contadorItensLista = listaDeCompras.childElementCount;
    contadorItensComprados = listaComprados.childElementCount;
    return { contadorItensLista, contadorItensComprados };
}
contarItens();

let id = gerarIdAleatorio();

function gerarIdAleatorio(){
    return parseInt(Math.random()*(10**8)*(contadorItensLista+contadorItensComprados))
}

export function formularLista(evento) {
    evento.preventDefault()
    const item = document.getElementById("inserirNomeItem");
    if (!item.value.trim()) {
        alert("Por favor, insira um nome para o item.");
        item.value = "";
        return;
    }
    if (contadorItensLista >= 1){
        document.getElementById("listaTextoVazio").classList.add("invisivel");
    }

    const itemDaLista = document.createElement("li");
    itemDaLista.id = `item${id}`;
    const containerItemLista = document.createElement("div");
    containerItemLista.classList.add("lista-item-container");

    const containerNomeDoItem = document.createElement("div");

    const containerCheckbox = document.createElement("div");
    containerCheckbox.classList.add("container-checkbox");

    const checkboxInput = document.createElement("input");
    checkboxInput.type ="checkbox";
    checkboxInput.classList.add("input-checkbox");
    checkboxInput.id = `checkbox-${id}`;
    const caixaCheckbox = document.createElement("div");
    caixaCheckbox.classList.add("checkbox-customizado");
    const labelCheckbox = document.createElement("label");
    labelCheckbox.setAttribute('for', checkboxInput.id);

    labelCheckbox.appendChild(caixaCheckbox);
    labelCheckbox.appendChild(checkboxInput);

    containerCheckbox.appendChild(labelCheckbox);
    containerNomeDoItem.appendChild(containerCheckbox);

    const nomeDoItem = document.createElement("p");
    nomeDoItem.id = `Item-${id}`;
    nomeDoItem.innerText = item.value;
    containerNomeDoItem.appendChild(nomeDoItem);

    const containerBotoes = document.createElement("div");
    const botaoRemover = document.createElement("button");
    const botaoEditar = document.createElement("button");
    botaoRemover.classList.add("item-lista-button");
    botaoEditar.classList.add("item-lista-button");

    const imagemRemover = document.createElement("img");
    imagemRemover.src = "img/delete.svg";
    imagemRemover.alt = "Remover";
    imagemRemover.id = `remover-${id}`;

    imagemRemover.addEventListener("click", function () {
        let idReferente = imagemRemover.id.replace("remover-", "");
        document.getElementById(`item${idReferente}`).remove();
        contarItens();
        if (contadorItensComprados === 0){
            listaCompradosContainer.classList.add("invisivel");
            if (contadorItensLista <= 1) {
                document.getElementById("listaTextoVazio").classList.remove("invisivel");
            }
        }
    })

    const imagemEditar = document.createElement("img");
    imagemEditar.src = "img/edit.svg";
    imagemEditar.alt = "Editar";
    imagemEditar.id = `editar-${id}`

    imagemEditar.addEventListener("click", function () {
        let input = document.createElement("input");
        input.value = item.innerText;
        item.innerHTML = "";
        item.appendChild(input);
        input.addEventListener("blur", function() {
            item.innerText = input.value;
        });
        input.focus();
    });

    botaoRemover.appendChild(imagemRemover);
    botaoEditar.appendChild(imagemEditar);
    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);

    containerItemLista.appendChild(containerNomeDoItem);
    containerItemLista.appendChild(containerBotoes);
    itemDaLista.appendChild(containerItemLista);

    const dataHorario = document.createElement("span");
    dataHorario.innerText = obterDataAtual();
    dataHorario.classList.add("texto-data");
    itemDaLista.appendChild(dataHorario);

    listaDeCompras.appendChild(itemDaLista);

    labelCheckbox.addEventListener("click", function (evento){
        const checkboxInput = evento.currentTarget.querySelector(".input-checkbox");
        const checkboxCustomizado = evento.currentTarget.querySelector(".checkbox-customizado");
        if (checkboxInput.checked) {
            checkboxCustomizado.classList.add("checked");
            listaComprados.appendChild(itemDaLista);
            contarItens();
            nomeDoItem.style.textDecoration = "line-through"
            listaCompradosContainer.classList.remove("invisivel");
            botaoEditar.classList.add("invisivel");
        } else {
            checkboxCustomizado.classList.remove("checked");
            botaoEditar.classList.remove("invisivel");
            nomeDoItem.style.textDecoration = "none"
            listaDeCompras.appendChild(itemDaLista);
            contarItens();
            if (contadorItensComprados === 0){
                listaCompradosContainer.classList.add("invisivel");
            }
        }
    })
    item.value = ""
    id = gerarIdAleatorio();
    contarItens();
}
