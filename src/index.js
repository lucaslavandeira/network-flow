import { createServer } from "http";
import { readInputFile } from "./read_input";
import { Grafo } from "./grafo";
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

let paths = g.camino('1', '5');

console.log(inspect(paths, false, null));