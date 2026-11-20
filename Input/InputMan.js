import { InputSubject } from "./InputSubject.js";
import { activeScene } from "../Globals.js";

export class InputMan {
    static pInstance = null;

    constructor() {
        this.pSubjectArrowLeft = new InputSubject();
        this.pSubjectArrowRight = new InputSubject();
        this.pSubjectSpace = new InputSubject();
        this.pSubjectT = new InputSubject();

        this.privSpaceKeyPrev = false;
        this.privTKeyPrev = false;

        this.keyLeft = null;
        this.keyRight = null;
        this.keySpace = null;
        this.keyT = null;
    }

    static privGetInstance() {
        if (InputMan.pInstance === null) {
            InputMan.pInstance = new InputMan();
        }
        console.assert(InputMan.pInstance !== null);
        return InputMan.pInstance;
    }

    static GetArrowRightSubject() {
        const pMan = InputMan.privGetInstance();
        return pMan.pSubjectArrowRight;
    }

    static GetArrowLeftSubject() {
        const pMan = InputMan.privGetInstance();
        return pMan.pSubjectArrowLeft;
    }

    static GetTSubject() {
        const pMan = InputMan.privGetInstance();
        return pMan.pSubjectT;
    }

    static GetSpaceSubject() {
        const pMan = InputMan.privGetInstance();
        return pMan.pSubjectSpace;
    }

    static Update() {
        const pMan = InputMan.privGetInstance();

        // Lazy-bind Phaser keys once the scene's keyboard plugin is ready
        if (!pMan.keyLeft && activeScene?.input?.keyboard) {
            const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
            pMan.keyLeft = activeScene.input.keyboard.addKey(KeyCodes.LEFT);
            pMan.keyRight = activeScene.input.keyboard.addKey(KeyCodes.RIGHT);
            pMan.keySpace = activeScene.input.keyboard.addKey(KeyCodes.SPACE);
            pMan.keyT = activeScene.input.keyboard.addKey(KeyCodes.T);
        }
        if (!pMan.keyLeft) return;

        // LeftKey (no history)
        if (pMan.keyLeft.isDown) {
            pMan.pSubjectArrowLeft.Notify();
        }

        // RightKey (no history)
        if (pMan.keyRight.isDown) {
            pMan.pSubjectArrowRight.Notify();
        }

        // T key (with key history - triggers once per press)
        const tKeyCurr = pMan.keyT.isDown;
        if (tKeyCurr === true && pMan.privTKeyPrev === false) {
            pMan.pSubjectT.Notify();
        }
        pMan.privTKeyPrev = tKeyCurr;

        // SpaceKey (with key history - triggers once per press)
        const spaceKeyCurr = pMan.keySpace.isDown;
        if (spaceKeyCurr === true && pMan.privSpaceKeyPrev === false) {
            pMan.pSubjectSpace.Notify();
        }
        pMan.privSpaceKeyPrev = spaceKeyCurr;
    }
}