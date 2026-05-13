import { ColObserver } from "../Collisions/ColObserver.js"
import { activeScene } from "../Globals.js";

export class SndObserver extends ColObserver {
    constructor() {
        super();
        // Removed IrrKlang engine dependency
    }

    Notify() {
        const pGrid = this.pSubject.pObjA;
        
        if (pGrid.hitsound === true) {
            // Replaces: pSndEngine.Play2D("ufo_highpitch.wav");
            activeScene.sound.play('ufo_highpitch', { volume: 0.2 });
        }
        
        pGrid.hitsound = false;
    }
}