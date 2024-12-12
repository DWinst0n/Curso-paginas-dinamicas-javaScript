import { criarItemDaLista } from "./criarItemDaLista.js";
import { criarDataHorario } from "./obterDataAtual.js";

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

export let id = gerarIdAleatorio();

function gerarIdAleatorio(){
    return parseInt(Math.random()*(10**8)*(contadorItensLista+contadorItensComprados))
}

export function gerenciarLista(evento) {
    evento.preventDefault();
//Adicionar Item
    const item = document.getElementById("inserirNomeItem");
    if (!item.value.trim()) {
        alert("Por favor, insira um nome para o item.");
        item.value = "";
        return;
    }
    if (contadorItensLista >= 1) {
        document.getElementById("listaTextoVazio").classList.add("invisivel");
    }

    const novoItem = criarItemDaLista(item);
    const { itemDaLista, botaoRemover, botaoEditar, labelCheckbox, imagemRemoverId, nomeDoItem } = novoItem;
    listaDeCompras.appendChild(itemDaLista);
//Botão Remover
    botaoRemover.addEventListener("click", function () {
        let confirmacao = confirm("Deseja excluir esse item?");
        if (confirmacao) {
            let idReferente = imagemRemoverId.replace("remover-", "");
            document.getElementById(`item${idReferente}`).remove();
            contarItens();
            if (contadorItensComprados === 0) {
                listaCompradosContainer.classList.add("invisivel");
                if (contadorItensLista <= 1) {
                    document.getElementById("listaTextoVazio").classList.remove("invisivel");
                }
            }
        }
    });
//botão Editar
    botaoEditar.addEventListener("click", function () {

    });
//checkbox
labelCheckbox.addEventListener("click", function (evento) {
    const checkboxInput = evento.currentTarget.querySelector(".input-checkbox");
    const checkboxCustomizado = evento.currentTarget.querySelector(".checkbox-customizado");

    if (checkboxInput.checked) {
        checkboxCustomizado.classList.add("checked");
        listaComprados.appendChild(itemDaLista);
        contarItens();
        nomeDoItem.style.textDecoration = "line-through";
        listaCompradosContainer.classList.remove("invisivel");
        botaoEditar.classList.add("invisivel");
        if (!itemDaLista.querySelector(".texto-data")) {
            const dataHorario = criarDataHorario();
            itemDaLista.appendChild(dataHorario);
        }
    } else {
        checkboxCustomizado.classList.remove("checked");
        botaoEditar.classList.remove("invisivel");
        nomeDoItem.style.textDecoration = "none";
        const dataHorarioExistente = itemDaLista.querySelector(".texto-data");
        if (dataHorarioExistente) {
            dataHorarioExistente.remove();
        }

        listaDeCompras.appendChild(itemDaLista);
        contarItens();
        if (contadorItensComprados === 0) {
            listaCompradosContainer.classList.add("invisivel");
        }
    }
});

    
//Atualização de valores
    item.value = "";
    id = gerarIdAleatorio();
    contarItens();
}


