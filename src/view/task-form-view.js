import {createElement} from "../framework/render.js";


function createTaskFormComponentTemplate() {
    return (
        `<div class="new-task-container">
                <h2>Новая задача</h2>
                <form class="add-task-form">
                    <input type="text" class="task-input" placeholder="Название задачи..." />
                    <button class="add-task-button">
                        + Добавить
                    </button>
                </form>
            </div>`
    );
}


export default class TaskFormView {
    getTemplate() {
        return createTaskFormComponentTemplate();
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
