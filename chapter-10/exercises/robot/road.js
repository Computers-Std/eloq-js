import { buildGraph } from "./graph.js";

const roads = [
  ["Alice House", "Bob House"],
  ["Alice House", "Cabin"],
  ["Alice House", "Post Office"],
  ["Bob House", "Town Hall"],
  ["Daria House", "Ernie House"],
  ["Daria House", "Town Hall"],
  ["Ernie House", "Grete House"],
  ["Grete House", "Farm"],
  ["Grete House", "Shop"],
  ["Marketplace", "Farm"],
  ["Marketplace", "Post Office"],
  ["Marketplace", "Shop"],
  ["Marketplace", "Town Hall"],
  ["Shop", "Town Hall"],
];

export const roadGraph = buildGraph(roads);

console.log(roadGraph);
