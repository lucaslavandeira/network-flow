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
            residual.agregarArista(arista['destino'], nodo, 0, true);
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

function maxFlow(grafo, inicial, final) {
    let residual = init_residual_graph(grafo);
    let camino = residual.camino(inicial, final);
    let flow = 0;
    while (camino.length) {
        flow += bottleneck(residual, camino);
        update_residual_graph(residual, camino);
        camino = residual.camino(inicial, final);
    }
    return {'flow': flow, 'grafo_residual': residual};
}

function getMaxUsedCapacities(grafo, residual, cantidad) {
    let max_used_capacities = [];
    while(max_used_capacities.length < cantidad) {
        for (let nodo in grafo.aristas) {
            for (let arista of grafo.aristas[nodo]) {
                let used_capacity = residual.peso(arista['destino'], nodo);
                let remaining_capacity = residual.peso(nodo, arista['destino']);

                const min = Math.min(...max_used_capacities.map((x) => x['capacidad_usada']));
                if (max_used_capacities.length < cantidad || used_capacity > min) {
                    if (max_used_capacities.length == cantidad) {
                        max_used_capacities =  max_used_capacities.filter((x) => x['capacidad_usada'] !== min);
                    }
                    max_used_capacities.push({
                        'capacidad': used_capacity + remaining_capacity, 
                        'capacidad_usada': used_capacity,
                        'capacidad_restante': remaining_capacity,
                        'fuente': nodo, 
                        'destino': arista['destino']
                    });
                }
            }
        }
    }
    return max_used_capacities;
}

export {bottleneck, init_residual_graph, update_residual_graph, maxFlow, getMaxUsedCapacities};