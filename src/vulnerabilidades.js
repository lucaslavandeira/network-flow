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

    console.log("Flow: ", max_flow['flow']);
    console.log(inspect(residual, false, null));

    let max_cap = getMaxUsedCapacities(g, residual, CANTIDAD_EJES_A_VIGILAR);

    console.log(max_cap);
}

encontrar_vulnerabilidades();
