import { Command } from "../Timer/Command.js";
import { TimerMan } from "../Timer/TimerMan.js";
import { TimeEvent } from "../Timer/TimeEvent.js";
import { activeScene } from "../Globals.js";

export class Sound extends Command {
    constructor() {
        super();
        // No need to pass an engine in JS!
    }

    Execute(deltaTime) {
        // Play the sound via Phaser with 0.2 volume
        activeScene.sound.play('fastinvader2', { volume: 0.2 });

        // Add itself back to timer to loop the beat
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, this, deltaTime);
    }
}