/*
  Make the Group class from the previous exercise iterable. Refer to
the section about the iterator interface earlier in the chapter if you
aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just
return the iterator created by calling the Symbol.iterator method on
the array. That would work, but it defeats the purpose of this
exercise.

It is okay if your iterator behaves strangely when the group is
modified during iteration.
*/

class Group {
  constructor() {
    this.members = [];
  }
  add(val) {
    if (!this.members.includes(val)) {
      this.members.push(val);
    }
    return this;
  }
  delete(val) {
    let index = this.members.indexOf(val);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
    return this;
  }
  has(val) {
    return this.members.includes(val);
  }

  static from(array) {
    let group = new Group();
    for (let element of array) {
      group.add(element);
    }
    return group;
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }
  next() {
    // Check if we have processed all members
    if (this.position >= this.group.members.length) {
      return { done: true }; // No more elements
    }

    // Get the current element
    let value = this.group.members[this.position];
    // Move to the next position for the subsequent call
    this.position++;

    // Return the current value and indicate that iteration is not yet done
    return { value: value, done: false };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
