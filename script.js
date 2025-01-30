let nombres = [];

function normalizarTexto(texto) {
    return texto.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

document.getElementById("agregar").addEventListener("click", function() {
    const input = document.getElementById("nombre");
    const nombre = input.value.trim();
    
    if (!nombre) return;

    const nombreNormalizado = normalizarTexto(nombre);
    
    if (nombres.some(n => normalizarTexto(n) === nombreNormalizado)) {
        alert("Ya está introducido, ponga otro nombre por favor.");
        return;
    }

    nombres.push(nombre);
    actualizarLista();
    input.value = "";
    document.getElementById("sortear").disabled = nombres.length < 3;
});

document.getElementById("sortear").addEventListener("click", function() {
    if (nombres.length < 3) {
        alert("Debe haber al menos 3 participantes para realizar el sorteo.");
        return;
    }

    if (nombres.length % 2 !== 0) {
        const faltantes = 2 - (nombres.length % 2);
        alert(`No se puede sortear con un número impar de participantes. Añade ${faltantes} amigo(s) más.`);
        return;
    }

    document.getElementById("contador").textContent = "Mostrando resultado en 10 segundos...";

    let tiempo = 10;
    const interval = setInterval(() => {
        tiempo--;
        document.getElementById("contador").textContent = `Mostrando resultado en ${tiempo} segundos...`;
        if (tiempo === 0) {
            clearInterval(interval);
            sortearAmigos();
        }
    }, 1000);
});

document.getElementById("reiniciar").addEventListener("click", function() {
    nombres = [];
    actualizarLista();
    document.getElementById("sortear").disabled = true;
    document.getElementById("contador").textContent = "";
    document.getElementById("resultado").textContent = "";
});

function actualizarLista() {
    const lista = document.getElementById("lista-nombres");
    lista.innerHTML = "";
    nombres.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigos() {
    let mezclados = [...nombres].sort(() => Math.random() - 0.5);
    let resultado = {};

    for (let i = 0; i < mezclados.length; i++) {
        let siguiente = (i + 1) % mezclados.length;
        resultado[mezclados[i]] = mezclados[siguiente];
    }

    let resultadoTexto = "Resultados del sorteo:\n";
    for (let nombre in resultado) {
        resultadoTexto += `${nombre} → ${resultado[nombre]}\n`;
    }

    document.getElementById("resultado").textContent = resultadoTexto;
}
