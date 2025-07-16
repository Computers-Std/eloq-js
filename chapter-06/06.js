/*
  Methods
*/
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my fur and whiskers");
// → The white rabbit says 'Oh my fur and whiskers'
hungryRabbit.speak("Got any carrots?");
// → The hungry rabbit says 'Got any carrots?'

speak.call(whiteRabbit, "Hurry");
// → The white rabbit says 'Hurry'

let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  value: 5,
};
console.log(finder.find([4, 5]));

// Prototype: Objects can be linked to other objects, to magically get
// all the properties that other object has.

let empty = {};
console.log(empty.toString);
console.log(empty.toString());

// use Object.create to create an object with a specific prototype
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");

/*
  Classes
*/

// constructor function
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
killerRabbit.speak("Now I am become Death, the destroyer of worlds");

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);

class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
}

let object = new (class {
  getWord() {
    return "hello";
  }
  aGetWord = () => {
    return "Another Hello";
  };
})();

console.log(object.getWord());
console.log(object.aGetWord());

/*
 Private Properties
*/

class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrogate() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}

let secret = new SecretiveObject();
console.log(secret.interrogate());

class RandomSource {
  #max;
  constructor(max) {
    this.#max = max;
  }
  getNumber() {
    return Math.floor(Math.random() * this.#max);
  }
}

let randomNumberUnder10 = new RandomSource(10);
console.log(randomNumberUnder10.getNumber());

/*
  Maps
*/

let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(`Julia is ${ages.get("Julia")}`);
// → Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false

/*
  Polymorphism
*/

Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};
console.log(String(killerRabbit));

Array.prototype.forEach.call(
  {
    length: 2,
    0: "A",
    1: "B",
  },
  (elt) => console.log(elt),
);

/*
  Getters, Setters, and Statics
*/

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

console.log(varyingSize.size);
console.log(varyingSize.size);

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6

temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30

let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);

/*
  Symbols
*/
let sym = Symbol("name");
console.log(sym == Symbol("name"));

Rabbit.prototype[sym] = 55;
console.log(killerRabbit[sym]);

const length = Symbol("length");
Array.prototype[length] = 0;
console.log([1, 2].length);
// → 2
console.log([1, 2][length]);
// → 0

let myTrip = {
  length: 2,
  0: "Lankwitz",
  1: "Babelsberg",
  [length]: 21500,
};
console.log(myTrip[length], myTrip.length);

/*
  The Iterator Interface
*/

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());

class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }
  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }
  static fromArray(array) {
    let result = null;
    for (let i = array.length - 1; i >= 0; i--) {
      result = new this(array[i], result);
    }
    return result;
  }
}

List.prototype[Symbol.iterator] = function () {
  return new ListIterator(this);
};

class ListIterator {
  constructor(list) {
    this.list = list;
  }
  next() {
    if (this.list == null) {
      return { done: true };
    }
    let value = this.list.value;
    this.list = this.list.rest;
    return { value, done: false };
  }
}

let list = List.fromArray([1, 2, 3]);
for (let element of list) {
  console.log(element);
}

/*
  Inheritance
*/

class LengthList extends List {
  #length;

  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }
  get length() {
    return this.#length;
  }
}
console.log(LengthList.fromArray([1, 2, 3]).length);

/*
  The Instance of Operator
*/

console.log(new LengthList(1, null) instanceof LengthList);
// → true
console.log(new LengthList(2, null) instanceof List);
// → true
console.log(new List(3, null) instanceof LengthList);
// → false
console.log([1] instanceof Array);
// → true
