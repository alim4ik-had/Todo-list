import {AbstractComponent} from "../framework/view/abstract-component.js";


function createTaskComponentTemplate(task) {
    return (
        `<li id="${task.id}" class="task-item">${task.title}</li>`
    );
}


export default class TaskView extends AbstractComponent {

    constructor(task) {
        super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}
