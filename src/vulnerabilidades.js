import { inspect } from "util";
import { readInputFile } from "./read_input";
import { maxFlow, getMaxUsedCapacity } from "./network";

const FUENTE = '0';
const SUMIDERO = '1';
const CANTIDAD_EJES_A_VIGILAR = 2;

function encontrar_vulnerabilidades() {
    let g = readInputFile("redsecreta.map");

    let max_flow = maxFlow(g, '0', '1');
    const residual = max_flow['grafo_residual'];


    let ejes_a_vigilar = []
    while (ejes_a_vigilar.length < CANTIDAD_EJES_A_VIGILAR) {
        let max_cap = getMaxUsedCapacity(g, residual);
        ejes_a_vigilar.push(max_cap);
        g.borrarArista(max_cap['fuente'], max_cap['destino']);
    }
    console.log(ejes_a_vigilar);
}

encontrar_vulnerabilidades();
