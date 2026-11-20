import { ColObserver } from "../Collisions/ColObserver.js";

export class BombObserver extends ColObserver {
    Notify() {
        const pBomb = this.pSubject.pObjA;
        pBomb.Reset();
    }
}