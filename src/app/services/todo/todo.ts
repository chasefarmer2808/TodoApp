export class Todo {
    id: string;
    name: string;
    isDone: boolean;

    constructor(name: string) {
        this.name = name;
        this.isDone = false;
    }
}