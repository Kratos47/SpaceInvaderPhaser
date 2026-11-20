import { activeScene } from "../Globals.js";

export class Simulation {
    static State = Object.freeze({
        Realtime: "Realtime",
        FixedStep: "FixedStep",
        SingleStep: "SingleStep",
        Pause: "Pause"
    });

    static pInstance = null;
    static SIM_NUM_WAKE_CYCLES = 0;
    static SIM_SINGLE_TIME_STEP = 0.016666;
    static oldKey = false;

    constructor() {
        this.state = Simulation.State.SingleStep;

        this.timeStep = 0.0;
        this.totalWatch = 0.0;
        this.stopWatch_tic = 0.0;
        this.stopWatch_toc = 0.0;

        this.keyG = null;
        this.keyH = null;
        this.keyS = null;
        this.keyD = null;
    }

    static PrivGetInstance() {
        console.assert(Simulation.pInstance !== null, "Simulation.Create() must be called first");
        return Simulation.pInstance;
    }

    static Create() {
        console.assert(Simulation.pInstance === null, "Simulation already created");
        if (Simulation.pInstance === null) {
            Simulation.pInstance = new Simulation();
        }
    }

    static Update(systemTime) {
        const pSim = Simulation.PrivGetInstance();
        console.assert(pSim !== null);

        pSim.PrivProcessInput();

        // Time update
        pSim.stopWatch_toc = systemTime - pSim.stopWatch_tic;
        pSim.stopWatch_tic = systemTime;

        if (pSim.PrivGetState() === Simulation.State.FixedStep) {
            pSim.timeStep = Simulation.SIM_SINGLE_TIME_STEP;
        } else if (pSim.PrivGetState() === Simulation.State.Realtime) {
            pSim.timeStep = pSim.stopWatch_toc;
        } else if (pSim.PrivGetState() === Simulation.State.SingleStep) {
            pSim.timeStep = Simulation.SIM_SINGLE_TIME_STEP;
            pSim.PrivSetState(Simulation.State.Pause);
        } else { // Pause
            pSim.timeStep = 0.0;
        }

        pSim.totalWatch += pSim.timeStep;
    }

    // --- Simulation controls ------------
    //   S - single step
    //   D - repeat step while holding
    //   G - start simulation fixed step
    //   H - start simulation realtime stepping
    PrivProcessInput() {
        // Lazy-bind Phaser keys once the scene's keyboard plugin is ready
        if (!this.keyG && activeScene?.input?.keyboard) {
            const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
            this.keyG = activeScene.input.keyboard.addKey(KeyCodes.G);
            this.keyH = activeScene.input.keyboard.addKey(KeyCodes.H);
            this.keyS = activeScene.input.keyboard.addKey(KeyCodes.S);
            this.keyD = activeScene.input.keyboard.addKey(KeyCodes.D);
        }
        if (!this.keyG) return;

        if (this.keyG.isDown) {
            this.PrivSetState(Simulation.State.FixedStep);
        } else if (this.keyH.isDown) {
            this.PrivSetState(Simulation.State.Realtime);
        }

        if (this.keyS.isDown && Simulation.oldKey === false) {
            // Do only once "a single step"
            this.PrivSetState(Simulation.State.SingleStep);
        }

        if (this.keyD.isDown) {
            // Repeating "a single step"
            this.PrivSetState(Simulation.State.SingleStep);
        }

        Simulation.oldKey = this.keyS.isDown;
    }

    PrivSetState(simState) {
        this.state = simState;
    }

    PrivGetState() {
        return this.state;
    }

    static SetState(simState) {
        const pSim = Simulation.PrivGetInstance();
        console.assert(pSim !== null);
        pSim.PrivSetState(simState);
    }

    static GetState() {
        const pSim = Simulation.PrivGetInstance();
        console.assert(pSim !== null);
        return pSim.PrivGetState();
    }

    static GetTimeStep() {
        const pSim = Simulation.PrivGetInstance();
        console.assert(pSim !== null);
        return pSim.timeStep;
    }

    static GetTotalTime() {
        const pSim = Simulation.PrivGetInstance();
        console.assert(pSim !== null);
        return pSim.totalWatch;
    }
}