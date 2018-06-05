import { Grafo } from "./grafo";
import { _ } from "underscore";
import { inspect } from "util";


function camino(grafo, s, p) {
    let adyacentes = grafo.adyacentes(s);
    let current = s;
    let result = [];

    while (adyacentes.length) {
        result.push(current);
        current = adyacentes[0];
        adyacentes = grafo.adyacentes(adyacentes[0]);
    }
    result.push(current);
    return result;
}

export { camino };