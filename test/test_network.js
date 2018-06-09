import { Grafo } from "../src/grafo";
import { bottleneck, init_residual_graph, update_residual_graph, maxFlow } from "../src/network";
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

    it("Actualizar el grafo residual baja el peso directo por el bottleneck", () => {
        let grafo = new Grafo();
        grafo.agregarArista('1', '2', 10);
        grafo.agregarArista('2', '3', 20);
        grafo.agregarArista('3', '4', 5);
        
        
        let camino = grafo.camino('1', '4');
        let residual = init_residual_graph(grafo);
        update_residual_graph(residual, camino);

        assert.equal(residual.peso('1', '2'), 5);
        assert.equal(residual.peso('2', '3'), 15);
        assert.equal(residual.peso('3', '4'), 0);
    });

    it("Actualizar el grafo residual aumenta el peso de las aristas inversas", () => {
        let grafo = new Grafo();
        grafo.agregarArista('1', '2', 10);
        grafo.agregarArista('2', '3', 20);
        grafo.agregarArista('3', '4', 5);
        
        let camino = grafo.camino('1', '4');
        let max_flow = bottleneck(grafo, camino);
        let residual = init_residual_graph(grafo);
        update_residual_graph(residual, camino);

        assert.equal(residual.peso('2', '1'), max_flow);
        assert.equal(residual.peso('3', '2'), max_flow);
        assert.equal(residual.peso('4', '3'), max_flow);

    });

    it("Max flow de un grafo lineal", () => {
        let grafo = new Grafo();
        grafo.agregarArista('s', '2', 10);
        grafo.agregarArista('2', '3', 20);
        grafo.agregarArista('3', 't', 5);

        assert.equal(maxFlow(grafo, 's', 't')['flow'], 5);
    });

    it("Max flow de un grafo con dos caminos", () => {
        let grafo = new Grafo();
        grafo.agregarArista('s', '2', 20);
        grafo.agregarArista('s', '3', 10);
        grafo.agregarArista('2', '3', 30);
        grafo.agregarArista('3', 't', 20);
        grafo.agregarArista('2', 't', 10);

        assert.equal(maxFlow(grafo, 's', 't')['flow'], 30);

    });

});
