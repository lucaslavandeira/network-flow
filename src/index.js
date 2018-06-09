import { createServer } from "http";
import { readInputFile } from "./read_input";
import { Grafo } from "./grafo";
import { init_residual_graph, update_residual_graph } from "./network";
import { inspect } from "util";

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("test");
});

// server.listen(port, hostname, () => {
// });

let g = readInputFile('input');

let residual = init_residual_graph(g);
let camino = residual.camino("s", "t");
while (camino.length) {
    update_residual_graph(residual, camino);
    console.log(inspect(residual, false, null));
    camino = residual.camino("s", "t");
}
