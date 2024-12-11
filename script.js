const botaoSalvarItem = document.getElementById("adicionar-item");
const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-de-compras-compradas");
const listaCompradosContainer = document.getElementById("itensComprados")

let id = listaDeCompras.childElementCount;

botaoSalvarItem.addEventListener("click", formularLista);

function formularLista(evento) {
    evento.preventDefault()
    const item = document.getElementById("inserirNomeItem");
    if (!item.value.trim()) {
        alert("Por favor, insira um nome para o item.");
        item.value = "";
        return;
    }

    if (id <= 1){
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
    if (listaDeCompras.childElementCount <= 1 && listaComprados.childElementCount == 0)
        document.getElementById("listaTextoVazio").classList.remove("invisivel");
        listaCompradosContainer.classList.add("invisivel");
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
;
    listaDeCompras.appendChild(itemDaLista);

    labelCheckbox.addEventListener("click", function (evento){
        const checkboxInput = evento.currentTarget.querySelector(".input-checkbox");
        const checkboxCustomizado = evento.currentTarget.querySelector(".checkbox-customizado");

        if (checkboxInput.checked) {
            checkboxCustomizado.classList.add("checked");
            listaComprados.appendChild(itemDaLista);
            nomeDoItem.style.textDecoration = "line-through"
            listaCompradosContainer.classList.remove("invisivel");
        } else {
            checkboxCustomizado.classList.remove("checked");
            nomeDoItem.style.textDecoration = "none"
            listaDeCompras.appendChild(itemDaLista);
            if (listaComprados.childElementCount == ""){
                listaCompradosContainer.classList.add("invisivel");
            }
        }
    })
    item.value = ""
}
const obterDataAtual = (locale = "pt-BR") => {
    const dataAtual = new Date();
    const dia = dataAtual.toLocaleDateString(locale, { weekday: "long" });
    const diaValor = dataAtual.getDate();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours().toString().padStart(2, "0");
    const minutos = dataAtual.getMinutes().toString().padStart(2, "0");
    return `${dia} (${diaValor}/${mes}/${ano}) às ${horas}:${minutos}`;
};