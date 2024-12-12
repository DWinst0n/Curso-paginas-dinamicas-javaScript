import { id } from "./gerenciarLista.js";

export function criarItemDaLista(item){

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

    const imagemEditar = document.createElement("img");
    imagemEditar.src = "img/edit.svg";
    imagemEditar.alt = "Editar";
    imagemEditar.id = `editar-${id}`

    botaoRemover.appendChild(imagemRemover);
    botaoEditar.appendChild(imagemEditar);
    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);
    
    containerItemLista.appendChild(containerNomeDoItem);
    containerItemLista.appendChild(containerBotoes);
    itemDaLista.appendChild(containerItemLista);
    
    return {
        itemDaLista: itemDaLista,
        nomeDoItem: nomeDoItem,
        botaoRemover: botaoRemover,
        labelCheckbox: labelCheckbox,
        imagemRemoverId: imagemRemover.id,
        imagemEditarId: imagemEditar.id,
        botaoEditar: botaoEditar
    };
}