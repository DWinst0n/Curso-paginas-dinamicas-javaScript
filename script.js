const carrinhoDeCompras = [];
let contadorID = 0;

const diaDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const obterDataAtual = () => {
    const dataAtual = new Date();
    const dia = diaDaSemana[dataAtual.getDay()];
    const diaValor = dataAtual.getDate();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes().toString().padStart(2, "0");
    return `${dia} (${diaValor}/${mes}/${ano}) às ${horas}:${minutos}`;
};

function criarItemHTML(id, nome, data) {
    return `
        <li class="lista__item" id="${id}">
            <div class="item__container">
                <div class="item">
                    <div class="checkbox__container">
                        <label for="checkbox-${id}">
                            <input type="checkbox" class="checkbox-input" id="checkbox-${id}"/>
                            <div class="checkbox-customizado checked"></div>
                        </label>
                    </div>
                    <p class="nome__item">${nome}</p>
                </div>
                <div class="opcoes__lista">
                    <button class="opcao__lista" onclick="apagarItem(${id})">
                        <img src="img/delete.svg">
                    </button>
                    <button class="opcao__lista" onclick="editarItem(${id})">
                        <img src="img/edit.svg">
                    </button>
                </div>
            </div>
            <span class="data__horario">${data}</span>
        </li>`;
}

function adicionarItem() {
    let nome = document.getElementById("inserirNomeItem").value.trim();
    if (!nome) {
        alert("Por favor, insira um nome para o item.");
        apagarTextoInput();
        return;
    }
    document.getElementById("mensagemListaVazia").classList.add("invisivel");

    const id = contadorID++;
    const data = obterDataAtual();
    carrinhoDeCompras.push({ id, nome, data });

    const itemHTML = criarItemHTML(id, nome, data);
    document.getElementById('lista').innerHTML += itemHTML;
    apagarTextoInput();
}

function apagarTextoInput() {
    document.getElementById("inserirNomeItem").value = '';
}

function apagarItem(id) {
    document.getElementById(id).remove();
    const index = carrinhoDeCompras.findIndex(item => item.id === id);
    if (index > -1) carrinhoDeCompras.splice(index, 1);
    if (!carrinhoDeCompras.length) {
        document.getElementById("mensagemListaVazia").classList.remove("invisivel");
    }
}

// <li class="lista__item">
// <div class="item__container">
//     <div class="item comprado">
//         <div class="checkbox__container">
//             <label for="checkbox-1"">
//                 <input type="checkbox" class="checkbox-input" id="checkbox-1"/>
//             <div class="checkbox-customizado checked"></div>
//             </label>
//         </div>
//         <p class="nome__item">lorem ipsum</p></div>
//     <div class="opcoes__lista"><button class="opcao__lista"><img src="img/delete.svg" onclick="apagarItem()"></button><button class="opcao__lista"><img src="img/edit.svg" onclick="editarItem()"></button></div>
// </div>
// <span class="data__horario">`${dia} (${diaValor}/${mes}/${ano}) ás ${horas}:${minutos}.`</span>