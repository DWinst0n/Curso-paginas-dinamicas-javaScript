function obterDataAtual(locale = "pt-BR") {
    const dataAtual = new Date();
    const dia = dataAtual.toLocaleDateString(locale, { weekday: "long" });
    const diaValor = dataAtual.getDate();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours().toString().padStart(2, "0");
    const minutos = dataAtual.getMinutes().toString().padStart(2, "0");
    return `${dia} (${diaValor}/${mes}/${ano}) às ${horas}:${minutos}`;
};

export function criarDataHorario() {
    const dataHorario = document.createElement("span");
    dataHorario.innerText = obterDataAtual();
    dataHorario.classList.add("texto-data");
    return dataHorario;
}