import { inspect } from "util";
import { readInputFile } from "./read_input";
import { maxFlow, getMaxUsedCapacities } from "./network";

const FUENTE = '0';
const SUMIDERO = '1';
const CANTIDAD_EJES_A_VIGILAR = 2;

function encontrar_vulnerabilidades() {
    let g = readInputFile("redsecreta.map");

    let max_flow = maxFlow(g, '0', '1');
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

    max_flow = maxFlow(g, '0', '1');
    console.log("Flujo máximo después del sabotaje: ", max_flow['flow']);
}

encontrar_vulnerabilidades();
