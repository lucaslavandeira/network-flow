import { readFileSync } from "fs";
import { Grafo } from "./grafo";
import { _ } from "underscore";

function readInputFile(path) {
    let data = readFileSync(path, 'utf-8');

    let lines = data.split('\n');
    lines = _.filter(lines, (line) => line.length);

    let grafo = new Grafo();
    _.each(lines, (line) => parseInputLine(line, grafo));
    return grafo;
}

function parseInputLine(line, grafo) {
    let values = line.split(' ');
    if (values.length != 3) {
        throw EvalError(line);
    }
    let nodo1 = values[0];
    let nodo2 = values[1];
    let peso = values[2];
    grafo.agregarArista(nodo1, nodo2, peso);
}
export { readInputFile };