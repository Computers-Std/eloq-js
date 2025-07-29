import randomItem from "random-item";
// import { roadGraph } from "./road.js";

export class VillageState {
  constructor(place, parcels, graph) {
    this.place = place;
    this.parcels = parcels;
    this.graph = graph;
  }
  move(destination) {
    if (!this.graph[this.place].hasOwnProperty(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => ({
          place: p.place === this.place ? destination : p.place,
          address: p.address,
        }))
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels, this.graph);
    }
  }
}

VillageState.random = function (graph, parcelCount = 5) {
  let parcels = [];
  let places = Object.keys(graph);
  for (let i = 0; i < parcelCount; i++) {
    let address = randomItem(places);
    let place;
    do {
      place = randomItem(places);
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels, graph);
};

export function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

export function runRobot(graph, state, robotNextMovement, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robotNextMovement(graph, state, memory);
    state = state.move(action.direction);
    console.log(`Moved to ${action.direction}`);
  }
}
