import dijkstra from "dijkstrajs";
const find_path = dijkstra.find_path;
import { roadGraph } from "./road.js";
import { VillageState, runRobot } from "./state.js";

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function dijkOrientedRobot({ place, parcels, graph }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = dijkstra.find_path(graph, place, parcel.place);
    } else {
      route = dijkstra.find_path(graph, place, place.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// console.log(find_path(roadGraph, "Post Office", "Cabin"));
// console.log(VillageState.random(roadGraph));

runRobot(roadGraph, VillageState.random(roadGraph), dijkOrientedRobot, []);
