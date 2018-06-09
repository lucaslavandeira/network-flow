import { createServer } from "http";
import { readInputFile } from "./read_input";
import { Grafo } from "./grafo";
import { maxFlow } from "./network";
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

let grafo = new Grafo();
grafo.agregarArista('s', '2', 10);
grafo.agregarArista('2', '3', 20);
grafo.agregarArista('3', 't', 5);

console.log(maxFlow(grafo, 's', 't'), 5);
