

class Edge:
    def __init__(self, a, b, weight):
        self.source = a
        self.to = b
        self.weight = weight
    
    def __str__(self):
        return "{} -> {} ({})".format(self.source, self.to, self.weight)

    def __repr__(self):
        return self.__str__()


class Digraph:
    """Grafo dirigido con pesos basado en lista de adyacencias"""

    def __init__(self):
        self.nodes = {}
    
    def add_edge(self, a, b, weight):
        edge = Edge(a, b, weight)
        # Solo agregamos a la lista de a, dirigido
        self.nodes.setdefault(a, []).append(edge)
    

    def get_adjacency_list(self, node):
        if node not in self.nodes:
            raise AttributeError
        
        return [e.to for e in self.nodes[node]]
