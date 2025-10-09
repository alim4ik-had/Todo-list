import {createElement} from "../framework/render.js";


function createTaskListComponentTemplate() {
    return (
        `<div class="backlog-group">
            <h3 class="group-title backlog">Бэклог</h3>
            <ul class="task-list"></ul>
        </div>`
    );
}


export default class TaskListView {

    getTemplate() {
        return createTaskListComponentTemplate();
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
