/**
 * @file TimeEvent.js
 * @description A scheduled event executed by the TimerMan.
 */
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
        this.triggerTime = TimerMan.GetCurrTime() + deltaTimeToTrigger;
    }

    Process() {
        // Supports both raw functions (prototyping) and formal Command classes
        if (typeof this.pCommand === 'function') {
            this.pCommand(this.deltaTime);
        } else if (this.pCommand && typeof this.pCommand.Execute === 'function') {
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
        this.clear(); 
        this.Clear();
    }

    SetName(inName) { this.name = inName; }
    GetName() { return this.name; }
    
    Dump() {
        console.log(`   Name: ${this.name} (${this})`);
        console.log(`      Command: ${this.pCommand}`);
        console.log(` Trigger Time: ${this.triggerTime}`);
        console.log(`   Delta Time: ${this.deltaTime}`);
    }
}