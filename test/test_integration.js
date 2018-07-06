import { assert } from "chai";
import { readInputFile } from "../src/read_input";
import { bottleneck, init_residual_graph, update_residual_graph, maxFlow } from "../src/network";


describe("Tests de integracion", () => {
    it("Cortes en grafos complejos", () => {
        let g = readInputFile("test/inputs/grafo_cortes");
        let flow = maxFlow(g, "0", "1");

        let residual = flow['grafo_residual'];
        console.log(residual.aristas);
        console.log(residual.getCut("0"));
    });
});