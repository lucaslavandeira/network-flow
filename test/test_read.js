import * as assert from "assert";
import { readInputFile } from "../src/read_input";


describe("Camino", () => {
    it("Devuelve el único camino posible en un grafo \"lineal\"", () => {
        let g = readInputFile("test/inputs/unico_camino");
        let path = g.camino("1", "5");
        let expected =  ["1", "2", "4", "5"];
        list_assert(expected, path);
    });

    it("Devuelve un camino que empieza en el primer nodo y termina en el último", () => {
        let g = readInputFile("test/inputs/dos_caminos");
        let path = g.camino("1", "4");

        assert.equal(path.length, 3);
        assert.equal(path[0], "1");
        assert.equal(path[2], "4");
    })

    it("Halla el camino en un grafo más complejo", () => {
        let g = readInputFile("test/inputs/grafo_mas_complejo");
        let path = g.camino("1", "7");

        assert.equal(path.length, 5);
        assert.equal(path[0], "1");
        assert.equal(path[4], "7");

    })
});

function list_assert(expected, actual) {
    assert.equal(expected.length, actual.length)
    for (let i = 0; i < expected.length; i++) {
        const nodo = actual[i];
        assert.equal(nodo, expected[i]);
    }
}