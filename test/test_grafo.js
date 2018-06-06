import * as assert from "assert";
import { Grafo } from "../src/grafo";

describe("Grafo", () => {

    it("Hallar camino entre puntas de la red", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2, 1);
        grafo.agregarArista(1, 3, 1);
        grafo.agregarArista(3, 4, 1);

        let camino = grafo.camino(1, 4);

        assert.equal(camino[1], 3);
    });
});