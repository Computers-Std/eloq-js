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
  robotMovement: Robot's next movement to
  --
  Action: {direction: VALUE, memory: VALUE}
  */
function runRobot(state, robotMovement, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
      break;
    }
    let action = robotMovement(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

// BFS Pathfinding Route
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

let aRandomState = VillageState.random(6);

function superRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });
    // console.log(routes);
    // this determines the precedence a route gets when choosing.
    // route length counts negatively, routes that pick up a package
    // get small bonus
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }
  return { direction: route[0], memory: route.slice(1) };
}

// console.log(aRandomState);
console.log(superRobot(aRandomState, []));

/*
 *   The main limitation of goalOrientedRobot is that it considers only
 * one parcel at a time. It will often walk back and forth across the
 * village because the parcel it happens to be looking at happens to be
 * at the other side of the map, even if there are others much closer.
 *
 * One possible solution would be to compute routes for all packages and
 * then take the shortest one. Even better results can be obtained, if
 * there are multiple shortest routes, by preferring the ones that go to
 * pick up a package instead of delivering a package.
 */
