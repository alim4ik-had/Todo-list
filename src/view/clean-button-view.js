import {createElement} from "../framework/render.js";


function createCleanButtonComponentTemplate() {
    return (
        `<button class="delete-task-button">
            X Очистить
        </button>`
    );
}


export default class CleanButtonView {
    getTemplate() {
        return createCleanButtonComponentTemplate();
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
