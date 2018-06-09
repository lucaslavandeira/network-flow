class Grafo {

    constructor() {
        this.nodos = [];
        this.aristas = {};
    }

    agregarNodo(n) {
        this.nodos.push(n);
    }

    agregarArista(nodo1, nodo2, peso) {
        if (!this.nodos.includes(nodo1)) {
            this.nodos.push(nodo1);
        }

        if (!this.nodos.includes(nodo2)) {
            this.nodos.push(nodo2);
        }

        if (!this.aristas[nodo1]) {
            this.aristas[nodo1] = []
        }
        this.aristas[nodo1].push({'destino': nodo2, 'peso': peso});
    }

    adyacentes(nodo) {
        if (this.aristas[nodo]) {
            return this.aristas[nodo].map((nodo) => nodo.destino);
        }
        return [];
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

    camino(desde, hasta) {
        let padres = {}
        padres[desde] = null;

        this._fill_parents(desde, padres);
        
        let result = [hasta];
        let actual = hasta;
        while (result[0] !== desde) {
            actual = padres[actual];
            result.unshift(actual)
        }
        return result;
    }

    _fill_parents(nodo, padres) {
        let adyacentes = this.adyacentes(nodo);
        adyacentes.forEach(element => {
            padres[element] = nodo;
            this._fill_parents(element, padres);
        });
    }
}

const _Grafo = Grafo;
export { _Grafo as Grafo };
