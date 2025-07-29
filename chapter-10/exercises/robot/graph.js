export function buildGraph(roads, edges) {
  let graph = Object.create(null);
  function addEdge(from, to, cost = 1) {
    if (from in graph) {
      graph[from][to] = cost;
    } else {
      graph[from] = { [to]: cost };
    }
  }
  for (let [from, to] of roads) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
