import { Grafo } from "./grafo";


function bottleneck(grafo, camino) {
    let bottleneck = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < camino.length - 1; i++) {
        const current = camino[i];
        const next = camino[i + 1];
        const peso = grafo.peso(current, next);
        bottleneck = peso < bottleneck ? peso : bottleneck;
    }
    return bottleneck;
}

// asume un grafo SIN CICLOS, es decir una red de flujos
function init_residual_graph(grafo) {
    let residual = new Grafo();
    for(let nodo in grafo.aristas) {
        for(let arista of grafo.aristas[nodo]) {
            residual.agregarArista(nodo, arista['destino'], arista['peso']);;
            residual.agregarArista(arista['destino'], nodo, 0);
        }
    }
    return residual;
}

function update_residual_graph(grafo, camino) {
    let max_flow = bottleneck(grafo, camino);
    for (let i = 0; i < camino.length - 1; i++) {
        const current = camino[i];
        const next = camino[i + 1];
        const peso = grafo.peso(current, next);
        if(peso < max_flow) {
            throw EvalError("Flujo a reducir es mayor que el actual");
        }

        grafo.actualizarPeso(current, next, peso - max_flow);
        const peso_inverso = grafo.peso(next, current);
        grafo.actualizarPeso(next, current, peso_inverso + max_flow);
    }
}

export {bottleneck, init_residual_graph, update_residual_graph};