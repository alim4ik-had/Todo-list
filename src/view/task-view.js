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
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
    #afterCreateElement() {
        this.#makeTaskDraggable();
    }
    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);
        this.element.addEventListener('dragstart', (evt) => {
            evt.dataTransfer.setData('text/plain', this.task.id);
        });
        this.element.addEventListener('drop', (evt) => {
            localStorage.setItem('preferId', this.task.id);
        });
    }
}
