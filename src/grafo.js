class Grafo {

    constructor() {
        this.aristas = {};
    }

    agregarArista(nodo1, nodo2, peso=1) {
        if (!this.aristas[nodo1]) {
            this.aristas[nodo1] = [];
        }

        if (!this.aristas[nodo2]) {
            this.aristas[nodo2] = [];
        }

        this.aristas[nodo1].push({'destino': nodo2, 'peso': peso});
    }

    borrarArista(desde, hasta) {
        if (!this.aristas.hasOwnProperty(desde)) {
            throw EvalError("No existe nodo " + desde);
        }

        for (let i = 0; i < this.aristas[desde].length; i++) {
            const arista = this.aristas[desde][i];
            if (arista['destino'] === hasta) {
                this.aristas[desde].splice(i, 1);
                return;
            }
        }

        throw EvalError("no existe arista " + desde + "-" + hasta);
    }

    adyacentes(nodo) {
        if (this.aristas[nodo]) {
            return this.aristas[nodo].map((nodo) => nodo.destino);
        }
        return [];
    }

    camino(desde, hasta) {
        let padres = {}

        this._fill_parents(desde, padres);
        
        // Si no hay adyacentes, no hay camino
        if (Object.keys(padres).length === 0) {
            return [];
        }
        
        // No llegamos nunca hasta el nodo final, no hay camino
        if (padres[hasta] === undefined) {
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

    _fill_parents(nodo, padres, cut=[]) {
        let adyacentes = this.adyacentes(nodo);
        for(let i = 0; i < adyacentes.length; i++) {
            const element = adyacentes[i];
            if (this.peso(nodo, element) === 0) {
                cut.push({desde: nodo, hasta: element});
                continue;
            }
        
            if (!padres.hasOwnProperty(element)) {
                padres[element] = nodo;
                this._fill_parents(element, padres, cut);
            }
        }
    }

    getCut(startNode) {
        // roto roto roto muy roto todo fixme
        let padres = {};
        padres[startNode] = null;
        let cut = [];
        this._inCut(startNode, padres, cut);
        return cut;
    }

    _inCut(nodo, padres, cut) {
        let adyacentes = this.adyacentes(nodo);
        for(let i = 0; i < adyacentes.length; i++) {
            const element = adyacentes[i];
            if (!padres.hasOwnProperty(element)) {
                if (this.peso(nodo, element) > 0) {
                    padres[element] = nodo;
                    this._inCut(element, padres, cut);
                } else {
                    cut.push({desde: nodo , hasta: element});
                }
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

    existeArista(desde, hasta) {
        if (!this.aristas.hasOwnProperty(desde)) {
            return false;
        }

        for(const arista of this.aristas[desde]) { 
            if (arista['destino'] === hasta) {
                return true;
            }
        }
        return false;
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
