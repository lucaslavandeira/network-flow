import { readFileSync } from "fs";
import { Grafo } from "./grafo";

function readInputFile(path) {
    let data = readFileSync(path, 'utf-8');

    let lines = data.split('\n');
    lines = lines.filter((line) => line.length);

    let grafo = new Grafo();
    lines.forEach((line) => parseInputLine(line, grafo));
    return grafo;
}

function parseInputLine(line, grafo) {
    let values = line.split(' ');
    if (values.length != 3) {
        throw EvalError(line);
    }
    let nodo1 = values[0];
    let nodo2 = values[1];
    let peso = parseInt(values[2]);
    grafo.agregarArista(nodo1, nodo2, peso);
}
export { readInputFile };