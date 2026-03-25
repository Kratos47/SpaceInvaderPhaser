// Texture.js
import { DLink } from "../Manager/DLink.js";
import { activeScene } from '../Globals.js';

export class Texture extends DLink {

  // ------------------------------------------------------------
  // Enum (Texture.Name)
  // ------------------------------------------------------------
  static Name = Object.freeze({
    Default: "Default",

    Birds: "Birds",
    PacMan: "PacMan",
    Aliens: "Aliens",
    Stitch: "Stitch",

    Uninitialized: "Uninitialized"
  });

  // ------------------------------------------------------------
  // Static Data
  // ------------------------------------------------------------
  static psDefaultPhaserTexture = "DefaultTex";

  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor() {
    super(); // base()
    
    console.assert(Texture.psDefaultPhaserTexture !== null);

    this.poPhaserTexture = Texture.psDefaultPhaserTexture;
    console.assert(this.poPhaserTexture !== null);

    this.name = Texture.Name.Default;
  }

  // ------------------------------------------------------------
  // Methods
  // ------------------------------------------------------------
  Set(name, textureName) {
    // Copy data
    this.name = name;

    console.assert(textureName !== null);
    console.assert(this.poPhaserTexture === null);

    // Texture swap (same semantics as C#)
    this.poPhaserTexture = activeScene.load.image(name,textureName);
    console.assert(this.poPhaserTexture !== null);
  }

  // new void Clear()
  Clear() {
    this.poPhaserTexture = null;
    this.name = Texture.Name.Uninitialized;
  }

  Wash() {
    this.Clear();
  }

  Dump() {
    console.log(
      `   Name: ${this.name} (${this})`
    );

    if (this.poPhaserTexture !== null) {
      console.log(`   Texture: ${this.poPhaserTexture}`);
    } else {
      console.log("   Texture: null");
    }

    if (this.pNext === null) {
      console.log("      next: null");
    } else {
      const pTmp = this.pNext;
      console.log(`      next: ${pTmp.name} (${pTmp})`);
    }

    if (this.pPrev === null) {
      console.log("      prev: null");
    } else {
      const pTmp = this.pPrev;
      console.log(`      prev: ${pTmp.name} (${pTmp})`);
    }
  }
}
