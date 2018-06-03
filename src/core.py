#!/usr/bin/env python3
#!coding:utf8
import sys
from grafo import Digraph


def init_graph_from_file(src_file):
    network = Digraph()
    with open(src_file) as f:
        for line in f:
            line = line.strip()
            if not line:
                break
            source, to, weight = line.split(' ')
            network.add_edge(source, to, int(weight))

    return network

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Missing source file')
        sys.exit(1)

    src_file = sys.argv[1]
    network = init_graph_from_file(src_file)

    print(network.nodes)
