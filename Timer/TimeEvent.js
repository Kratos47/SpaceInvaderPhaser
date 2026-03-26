import { DLink } from "../Manager/DLink.js";
import { TimerMan } from "./TimerMan.js";

export class TimeEvent extends DLink {
    static Name = Object.freeze({
        SpriteAnimation: "SpriteAnimation",
        Uninitialized: "Uninitialized"
    });

    constructor() {
        super();
        this.name = TimeEvent.Name.Uninitialized;
        this.pCommand = null;
        this.triggerTime = 0.0;
        this.deltaTime = 0.0;
    }

    Set(eventName, pCommand, deltaTimeToTrigger) {
        console.assert(pCommand !== null);

        this.name = eventName;
        this.pCommand = pCommand;
        this.deltaTime = deltaTimeToTrigger;

        // Set the trigger time based on TimerMan's current time
        this.triggerTime = TimerMan.GetCurrTime() + deltaTimeToTrigger;
    }

    Process() {
        if (typeof this.pCommand === 'function') {
            // If it's just a function, run it! For Protyping puposes so I do not have to make a whole new class
            this.pCommand(this.deltaTime);
        } else if (this.pCommand && typeof this.pCommand.Execute === 'function') {
            // If it's a formal Command class, call Execute
            this.pCommand.Execute(this.deltaTime);
        }
    }

    Clear() {
        this.name = TimeEvent.Name.Uninitialized;
        this.pCommand = null;
        this.triggerTime = 0.0;
        this.deltaTime = 0.0;
    }

    Wash() {
        this.clear(); // DLink clear
        this.Clear();
    }

    SetName(inName) {
        this.name = inName;
    }

    GetName() {
        return this.name;
    }

    Dump() {
        console.log(`   Name: ${this.name} (${this})`);
        console.log(`      Command: ${this.pCommand}`);
        console.log(` Trigger Time: ${this.triggerTime}`);
        console.log(`   Delta Time: ${this.deltaTime}`);
    }
}