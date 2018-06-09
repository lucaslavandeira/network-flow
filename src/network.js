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

export {bottleneck};