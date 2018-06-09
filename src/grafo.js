class Grafo {

    constructor() {
        this.aristas = {};
    }

    agregarArista(nodo1, nodo2, peso) {
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

    peso(desde, hasta) {
        if (!this.aristas.hasOwnProperty(desde)) {
            throw EvalError("No existe nodo " + desde);
        }

        console.log(this.aristas[desde]);
        for(const arista of this.aristas[desde]) { 
            console.log(arista);
            if (arista['destino'] === hasta) {
                return arista['peso'];
            }
        }
        throw EvalError("no existe arista desde -> hasta");
    }
}

const _Grafo = Grafo;
export { _Grafo as Grafo };
