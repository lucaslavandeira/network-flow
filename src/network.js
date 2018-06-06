import { Grafo } from "./grafo";
import { _ } from "underscore";
import { inspect } from "util";


function camino(grafo, s, p) {
    let bfs = Grafo.bfs(grafo, s);
    
    let adyacentes = bfs.adyacentes(s);
    let result = [s];
}

export { camino };