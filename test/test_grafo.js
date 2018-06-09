import { assert } from "chai";
import { Grafo } from "../src/grafo";

describe("Grafo", () => {

    it("Hallar camino entre puntas de la red", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2);
        grafo.agregarArista(1, 3);
        grafo.agregarArista(3, 4);

        let camino = grafo.camino(1, 4);

        assert.equal(camino[1], 3);
    });

    it("Hallar adyacentes", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2);
        grafo.agregarArista(1, 3);
        grafo.agregarArista(1, 4);

        let ady = grafo.adyacentes(1);
        assert.include(ady, 2);
        assert.include(ady, 3);
        assert.include(ady, 4);
    })

    it("Devolver el peso de una arista", () => {
        let grafo = new Grafo();
        const peso = 50;
        grafo.agregarArista(1, 2, peso);
        assert.equal(peso, grafo.peso(1, 2));
    });

    it("Devuelve el camino en un grafo cíclico correctamente", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2);
        grafo.agregarArista(2, 1);
        grafo.agregarArista(2, 3);

        let camino = grafo.camino(1, 3);
        assert.equal(camino.length, 3);
    });

    it("Si no existe un camino entre los nodos, devuelve lista vacía", () => {
        let grafo = new Grafo();
        grafo.agregarArista(1, 2);
        grafo.agregarArista(2, 1);
        grafo.agregarArista(2, 3);
        grafo.agregarArista(4, 3);
        let camino = grafo.camino(1, 4);
        assert.equal(camino.length, 0);

    });
});