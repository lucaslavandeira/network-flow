import { readInputFile } from "./read_input";
import { maxFlow, getMaxUsedCapacities } from "./network";

const FUENTE = '0';
const SUMIDERO = '1';
const CANTIDAD_EJES_A_VIGILAR = 2;
const INFINITO = 999999;

function encontrar_vulnerabilidades() {
    let g = readInputFile("redsecreta.map");

    let max_flow = maxFlow(g, FUENTE, SUMIDERO);
    if (!max_flow['flow']) {
        console.log("No hay flujo posible en el grafo");
        return;
    }
    const residual = max_flow['grafo_residual'];

    console.log("Flujo máximo antes de sabotaje: ", max_flow['flow']);

    let max_cap = getMaxUsedCapacities(g, residual, CANTIDAD_EJES_A_VIGILAR);
    const str = max_cap
        .map((x) => [x['fuente'] + " -> " + x['destino']] + ' (' + x['capacidad_usada'] + ')')
        .reduce((x, y) => x + ", " + y);

    console.log("Aristas más relevantes", str);

    max_cap.forEach((x) => g.borrarArista(x['fuente'], x['destino']));

    max_flow = maxFlow(g, FUENTE, SUMIDERO);
    console.log("Flujo máximo después del sabotaje: ", max_flow['flow']);
}

function vulnerabilidades2() {
    let g = readInputFile("redsecreta.map");

    let max_flow = maxFlow(g, FUENTE, SUMIDERO);
    const originalFlow = max_flow['flow']
    if (!originalFlow) {
        console.log("No hay flujo posible en el grafo");
        return;
    }

    let residual = max_flow['grafo_residual'];
    let victima = getVictima(residual);
    let ataques = [{flujo: max_flow['flow'] - victima.cap, atacada: victima}];
    let firstLoop = true;
    while (true) {
        g.actualizarPeso(victima.desde, victima.hasta, INFINITO);
        max_flow = maxFlow(g, FUENTE, SUMIDERO);
        residual = max_flow['grafo_residual'];
        victima = getVictima(residual);
        let nuevoFlujo = max_flow['flow'] - victima.cap;
        ataques.push({flujo: nuevoFlujo, atacada: victima});
        
        if (ataques.length > 2) {
            let minFlujo = ataques
                .map((x) => x.flujo)
                .reduce((x, y) => x < y ? x : y);

            for (let i = 0; i < ataques.length; i++) {
                if (ataques[i].flujo === minFlujo) {
                    ataques.splice(i, 1);
                    break;
                }                
            }
        }
        let maxFlujo = ataques
            .map((x) => x.flujo)
            .reduce((x, y) => x > y ? x : y);

        if (!firstLoop && nuevoFlujo >= maxFlujo) {
            break;
        }

        firstLoop = false;
    }

    console.log(ataques);
    return ataques;
}

function getVictima(residual, ataques) {
    const cut = residual.getCut(FUENTE);
    if (!cut.length) {
        return;
    }
    let maxArista = cut
        .map((x) => {
            x.cap = residual.peso(x.desde, x.hasta) + residual.peso(x.hasta, x.desde); 
            return x;
        })
        .filter((x) => {  // Filtro ataques que ya estén incluidos anteriormente
            for(let ataque in ataques) {
                if (ataque.desde == x.desde && ataque.hasta == x.hasta) {
                    return false;
                }
            }
            if (x.cap === INFINITO) {
                return false;
            }
            return true;
        })
        .reduce((x, y) =>  (x.cap > y.cap) ? x : y);
    
    return maxArista;
}

vulnerabilidades2();
