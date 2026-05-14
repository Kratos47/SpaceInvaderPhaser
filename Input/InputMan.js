import { InputSubject } from "./InputSubject.js";

// 🔥 NATIVE C# STYLE BYPASS: 
// This directly polls the browser window hardware state, completely ignoring Phaser's focus bugs!
const NativeKeys = {
    Left: false,
    Right: false,
    Space: false
};

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") NativeKeys.Left = true;
    if (e.code === "ArrowRight") NativeKeys.Right = true;
    if (e.code === "Space") NativeKeys.Space = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") NativeKeys.Left = false;
    if (e.code === "ArrowRight") NativeKeys.Right = false;
    if (e.code === "Space") NativeKeys.Space = false;
});

export class InputMan {
    constructor() {
        this.pSubjectArrowLeft = new InputSubject();
        this.pSubjectArrowRight = new InputSubject();
        this.pSubjectSpace = new InputSubject();
        this.privSpaceKeyPrev = false;
    }

    static privGetInstance() {
        if (InputMan.pInstance === null) {
            InputMan.pInstance = new InputMan();
        }
        return InputMan.pInstance;
    }

    static GetArrowRightSubject() { return InputMan.privGetInstance().pSubjectArrowRight; }
    static GetArrowLeftSubject() { return InputMan.privGetInstance().pSubjectArrowLeft; }
    static GetSpaceSubject() { return InputMan.privGetInstance().pSubjectSpace; }

    static Update() {
        const pMan = InputMan.privGetInstance();

        // 1. Left Arrow Polling
        if (NativeKeys.Left) {
            pMan.pSubjectArrowLeft.Notify();
        }

        // 2. Right Arrow Polling
        if (NativeKeys.Right) {
            pMan.pSubjectArrowRight.Notify();
        }

        // 3. Spacebar Polling (with history to prevent machine-gunning)
        const spaceKeyCurr = NativeKeys.Space;
        if (spaceKeyCurr === true && pMan.privSpaceKeyPrev === false) {
            pMan.pSubjectSpace.Notify();
        }
        
        pMan.privSpaceKeyPrev = spaceKeyCurr;
    }
}

InputMan.pInstance = null;