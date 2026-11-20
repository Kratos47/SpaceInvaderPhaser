export class FallStrategy {
    Fall(pBomb) { throw new Error("Fall() must be overridden"); }
    Reset(posY) { throw new Error("Reset() must be overridden"); }
}