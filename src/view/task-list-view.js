import {createElement} from "../framework/render.js";


function createTaskListComponentTemplate(groupName) {
    return (
        `<div class="backlog-group">
            <h3 class="group-title backlog">${groupName}</h3>
            <ul class="task-list"></ul>
        </div>`
    );
}


export default class TaskListView {

    constructor(groupName) {
        this.groupName = groupName;
    }
    getTemplate() {
        return createTaskListComponentTemplate(this.groupName);
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
