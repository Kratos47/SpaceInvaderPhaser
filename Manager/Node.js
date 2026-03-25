// Node.js
import { DLink } from "./DLink.js";

export class Node extends DLink {
  static Name = Object.freeze({
    Cat: "Cat",
    Dog: "Dog",
    Bird: "Bird",
    Fish: "Fish",
    Rabbit: "Rabbit",
    Worm: "Worm",
    Unitialized: "Unitialized"
  });

  constructor(name, val) {
    super();
    this.Set(name, val);
  }

  Set(name, val) {
    this.name = name;
    this.x = val;
  }

  Wash() {
    this.name = Node.Name.Unitialized;
    this.x = 0;
  }

  Dump() {
    console.log(`${this.name}`);

    if (this.pPrev === null) {
      console.log("   prev: null");
    } else {
      console.log(`   prev: ${this.pPrev.name}`);
    }

    if (this.pNext === null) {
      console.log("   next: null");
    } else {
      console.log(`   next: ${this.pNext.name}`);
    }

    console.log(`   x: ${this.x}`);
  }
}
