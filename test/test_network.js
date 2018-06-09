import { Grafo } from "../src/grafo";
import { bottleneck } from "../src/network";
import { assert } from "chai";

describe("Utils de redes de flujo", () => {
    it("Encuentra el bottleneck de un camino", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2, 10);
        grafo.agregarArista(2, 3, 20);
        grafo.agregarArista(3, 4, 5);

        let max_flow = bottleneck(grafo, [1, 2, 3, 4]);
        assert.equal(max_flow, 5);
    });
})