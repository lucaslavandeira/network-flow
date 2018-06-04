import { Grafo } from "./grafo";
import { _ } from "underscore";
import { inspect } from "util";


function caminos(grafo, s, p) {
    let rev_adj = grafo.borrarNodo(p);
    let bfs = Grafo.bfs(grafo, s);
    _.each(rev_adj, (nodo) => {
        bfs.agregarArista(nodo, p, '1');
    })

    console.log(inspect(bfs, false, null));

    let adyacentes = bfs.adyacentes(s);
    let result = [];
    _.each(bfs.adyacentes(s), (adj) => {
        result.push([s].concat(caminos_in(bfs, adj, p)));
    })
    return result;
}

function caminos_in(grafo, nodo, final) {
    console.log("llamo caminos con nodo " + nodo + " y final " + final);
    if (nodo === final) {
        return [final];
    }

    let result = [];
    _.each(grafo.adyacentes(nodo), 
        (adj) => result.concat([nodo].concat(caminos_in(grafo, adj, final))));
    return result;
}

export { caminos };