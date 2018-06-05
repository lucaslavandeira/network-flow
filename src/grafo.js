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

    adyacentes(nodo) {
        return _.map(this.aristas[nodo], (nodo) => nodo.destino);
    }

    borrarNodo(nodo) {
        var reverse_adj = []
        for(let other_node in this.aristas) {
            for (let i = 0; i < this.aristas[other_node].length; i++) {
                if (this.aristas[other_node][i].destino == nodo) {
                    reverse_adj.push(other_node);
                    this.aristas[other_node].splice(i, 1);
                }
            }
        }
        return reverse_adj;
    }

    static bfs(grafo, actual, result=new Grafo(), visitados=[]) {
        if (!visitados.length) {
            visitados.push(actual);
        }
        
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
