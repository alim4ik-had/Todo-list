import {createElement} from "../framework/render.js";


function createTaskBoardComponentTemplate() {
    return (
        `<div class="task-groups"></div>`
    );
}


export default class TaskBoardView {
    getTemplate() {
        return createTaskBoardComponentTemplate();
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
