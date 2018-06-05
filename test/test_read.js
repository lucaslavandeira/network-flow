import * as assert from "assert";
import { caminos } from "../src/network"
import { readInputFile } from "../src/read_input";


describe("Camino", () => {
    it("Devuelve el único camino posible en un grafo \"lineal\"", () => {
        let g = readInputFile("test/inputs/unico_camino");
        let camino = caminos(g, "1", "5");
        let expected =  ["1", "2", "4", "5"];
        list_assert(expected, camino);
    });

    it("Devuelve un camino que empieza en el primer nodo y termina en el último", () => {
        let g = readInputFile("test/inputs/dos_caminos");
        let camino = caminos(g, "1", "4");

        assert.equal(camino.length, 3);
        assert.equal(camino[0], "1");
        assert.equal(camino[2], "4");
    })
});

function list_assert(expected, actual) {
    assert.equal(expected.length, actual.length)
    for (let i = 0; i < expected.length; i++) {
        const nodo = actual[i];
        assert.equal(nodo, expected[i]);
    }
}