#!coding:utf8
from .grafo import Digraph


def bfs(graph, source):
    result = Digraph()
    visited = set()

    nodes = graph.get_adjacency_list(source)
    for current in nodes:
        pass ## arre