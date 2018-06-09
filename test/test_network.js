import { Grafo } from "../src/grafo";
import { bottleneck, init_residual_graph } from "../src/network";
import { assert } from "chai";
import { constants } from "perf_hooks";

describe("Utils de redes de flujo", () => {
    it("Encuentra el bottleneck de un camino", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2, 10);
        grafo.agregarArista(2, 3, 20);
        grafo.agregarArista(3, 4, 5);

        let max_flow = bottleneck(grafo, [1, 2, 3, 4]);
        assert.equal(max_flow, 5);
    });

    it("Encuentra un camino por igual en un grafo comun y su residual", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2, 10);
        grafo.agregarArista(2, 3, 20);
        grafo.agregarArista(3, 4, 5);
        
        let residual = init_residual_graph(grafo);
        assert.deepEqual(residual.camino(1, 4), grafo.camino(1, 4));
    });
})