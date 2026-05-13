import { InputSubject } from "./InputSubject.js";
import { activeScene } from "../Globals.js";

export class InputMan {
    constructor() {
        this.pSubjectArrowLeft = new InputSubject();
        this.pSubjectArrowRight = new InputSubject();
        this.pSubjectSpace = new InputSubject();

        this.privSpaceKeyPrev = false;

        // --- PHASER INPUT SETUP ---
        // Grab the keyboard keys from the active Phaser Scene
        console.assert(activeScene !== null, "InputMan initialized before activeScene was set!");
        this.keyLeft = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    static privGetInstance() {
        if (InputMan.pInstance === null) {
            InputMan.pInstance = new InputMan();
        }
        console.assert(InputMan.pInstance !== null);
        return InputMan.pInstance;
    }

    static GetArrowRightSubject() {
        return InputMan.privGetInstance().pSubjectArrowRight;
    }

    static GetArrowLeftSubject() {
        return InputMan.privGetInstance().pSubjectArrowLeft;
    }

    static GetSpaceSubject() {
        return InputMan.privGetInstance().pSubjectSpace;
    }

    static Update() {
        const pMan = InputMan.privGetInstance();
        console.assert(pMan !== null);

        // LeftKey: (no history) -----------------------------------------------------------
        if (pMan.keyLeft && pMan.keyLeft.isDown) {
            pMan.pSubjectArrowLeft.Notify();
        }

        // RightKey: (no history) -----------------------------------------------------------
        if (pMan.keyRight && pMan.keyRight.isDown) {
            pMan.pSubjectArrowRight.Notify();
        }

        // SpaceKey: (with key history) ----------------------------------------------------
        const spaceKeyCurr = pMan.keySpace ? pMan.keySpace.isDown : false;
        
        if (spaceKeyCurr === true && pMan.privSpaceKeyPrev === false) {
            pMan.pSubjectSpace.Notify();
        }

        // Squirrel away previous state for the next frame
        pMan.privSpaceKeyPrev = spaceKeyCurr;
    }
}

// Static Instance
InputMan.pInstance = null;