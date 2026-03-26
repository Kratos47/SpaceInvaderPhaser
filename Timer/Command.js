export class Command {
    // Define this in concrete
    Execute(deltaTime) {
        throw new Error("Execute() must be implemented by concrete subclass");
    }
}