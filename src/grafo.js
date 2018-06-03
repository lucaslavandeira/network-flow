import { _ } from "underscore";

class Grafo {

    constructor() {
        this.nodos = [];
        this.aristas = {};
    }

    agregarNodo(n) {
        this.nodos.push(n);
    }

    agregarArista(nodo1, nodo2, peso) {
        if (!_.contains(this.nodos, nodo1)) {
            this.nodos.push(nodo1);
        }

        if (!_.contains(this.nodos, nodo2)) {
            this.nodos.push(nodo2);
        }

        if (!this.aristas[nodo1]) {
            this.aristas[nodo1] = []
        }
        this.aristas[nodo1].push({'destino': nodo2, 'peso': peso});
    }

    static bfs(grafo, actual, result=new Grafo(), visitados=[]) {
        if (!visitados.length) {
            visitados.push(actual);
        }
        console.log("Llamo BFS, inicio: " + actual + ", visitados: ", visitados.toString());
        
        let adjyacentes = _.filter(grafo.aristas[actual], 
            (nodo) => !_.contains(visitados, nodo.destino));

        _.each(adjyacentes, (nodo) => {
            visitados.push(nodo.destino)
            result.agregarArista(actual, nodo.destino, nodo.peso);
        });
        _.each(adjyacentes, (nodo) => 
            Grafo.bfs(grafo, nodo.destino, result, visitados)
        );
        return result;
    }
}

const _Grafo = Grafo;
export { _Grafo as Grafo };
