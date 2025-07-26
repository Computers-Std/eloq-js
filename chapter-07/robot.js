// places: 11 (vertices)
// roads: 14 (edges)

const roads = [
  "Alice House-Bob House",
  "Alice House-Cabin",
  "Alice House-Post Office",
  "Bob House-Town Hall",
  "Daria House-Ernie House",
  "Daria House-Town Hall",
  "Ernie House-Grete House",
  "Grete House-Farm",
  "Grete House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        // Moving from this.place to destination
        .map((p) => {
          if (p.place != this.place) return p;
          else return new Parcel(destination, p.address);
        })
        // Remove delivered parcels after Moving
        .filter((p) => p.place != p.address);

      return new VillageState(destination, parcels);
    }
  }
}

class Parcel {
  constructor(place, address) {
    this.place = place;
    this.address = address;
  }
}

let parcel1 = new Parcel("Post Office", "Alice House");
let parcel2 = new Parcel("Bob House", "Post Office");

let first = new VillageState("Post Office", [parcel1, parcel2]);
let next = first.move("Alice House");

// console.log(next.place);
// console.log(first);

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// An Initial State with some Parcels
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    // if place != address, then
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};
// console.log(VillageState.random());

/*
  Robot: [State, (opt Memory)] -> Action
  State: VillageState : Place, [List-of Parcels]
  robotNextMovement: Robot's next movement to
  --
  Action: {direction: VALUE, memory: VALUE}
  */
function runRobot(state, robotNextMovement, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robotNextMovement(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

//// Random Route
/*
  VillageState (place, parcels) -> Random Neighbour to (this.place)
  --
  randomRobotNextMovement (state, [opt Memory])
 */
function randomRobotNextMovement(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}
// runRobot(VillageState.random(), randomRobotNextMovement);

//// Truck's Route
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

//// BFS Pathfinding Route
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let neighbour of graph[at]) {
      if (neighbour == to) return route.concat(neighbour);
      // Neighbour was not already visited
      if (!work.some((w) => w.at == neighbour)) {
        work.push({ at: neighbour, route: route.concat(neighbour) });
      }
    }
  }
}
// console.log(findRoute(roadGraph, "Alice House", "Post Office"));
// console.log(findRoute(roadGraph, "Alice House", "Town Hall"));

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
