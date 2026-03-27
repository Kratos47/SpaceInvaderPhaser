/**
 * @file Command.js
 * @description Abstract base class for the Command Pattern.
 */
export class Command {
    Execute(deltaTime) {
        throw new Error("Execute() must be implemented by concrete subclass");
    }
}