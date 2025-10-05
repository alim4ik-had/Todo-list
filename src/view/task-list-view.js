import {createElement} from "../framework/render.js";


function createTaskListComponentTemplate(taskType, groupName) {
    return (
        `<div class="${taskType}-group">
            <h3 class="group-title ${taskType}">${groupName}</h3>
            <ul class="task-list"></ul>
        </div>`
    );
}


export default class TaskListView {

    constructor(taskType, groupName) {
        this.taskType = taskType;
        this.groupName = groupName;
    }
    getTemplate() {
        return createTaskListComponentTemplate(this.taskType, this.groupName);
    }


    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }


        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}
