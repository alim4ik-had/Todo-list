import {AbstractComponent} from "../framework/view/abstract-component.js";


function createTaskListComponentTemplate(taskType, groupName) {
    return (
        `<div class="${taskType}-group">
            <h3 class="group-title ${taskType}">${groupName}</h3>
            <ul class="task-list"></ul>
        </div>`
    );
}


export default class TaskListView extends AbstractComponent{

    constructor(taskType, groupName, onTaskDrop) {
        super();
        this.taskType = taskType;
        this.groupName = groupName;
        this.#setDropHandler(onTaskDrop);
    }
    get template() {
        return createTaskListComponentTemplate(this.taskType, this.groupName);
    }
    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            onTaskDrop(taskId, this.taskType, localStorage.getItem('preferId'));
        });
    }
}
