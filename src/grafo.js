class Grafo {

    constructor() {
        this.aristas = {};
    }

    agregarArista(nodo1, nodo2, peso=1, capacidad=1) {
        if (!this.aristas[nodo1]) {
            this.aristas[nodo1] = []
        }
        this.aristas[nodo1].push({'destino': nodo2, 'peso': peso, 'capacidad': capacidad});
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

        this._fill_parents(desde, padres);
        
        // Si no hay adyacentes, no hay camino
        if (Object.keys(padres).length === 0) {
            return [];
        }
        
        padres[desde] = null;
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
        for(let i = 0; i < adyacentes.length; i++) {
            const element = adyacentes[i];
            if (this.peso(nodo, element) === 0) {
                continue;
            }
        
            if (!padres.hasOwnProperty(element)) {
                padres[element] = nodo;
                this._fill_parents(element, padres);
            }
        }
    }

    peso(desde, hasta) {
        if (!this.aristas.hasOwnProperty(desde)) {
            throw EvalError("No existe nodo " + desde);
        }

        for(const arista of this.aristas[desde]) { 
            if (arista['destino'] === hasta) {
                return arista['peso'];
            }
        }
        throw EvalError("no existe arista " + desde + "-" + hasta);
    }

    actualizarPeso(desde, hasta, peso) {
        if (!this.aristas.hasOwnProperty(desde)) {
            throw EvalError("No existe nodo " + desde);
        }

        for(const arista of this.aristas[desde]) { 
            if (arista['destino'] === hasta) {
                arista['peso'] = peso;
                return;
            }
        }

        throw EvalError("No existe arista " + desde + "-" + hasta);
    }
}

const _Grafo = Grafo;
export { _Grafo as Grafo };
