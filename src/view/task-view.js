import {createElement} from "../framework/render.js";


function createTaskComponentTemplate() {
    return (
        `<li class="task-item">Название задачи</li>`
    );
}


export default class TaskView {

    getTemplate() {
        return createTaskComponentTemplate();
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
