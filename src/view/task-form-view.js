import {AbstractComponent} from "../framework/view/abstract-component.js";


function createTaskFormComponentTemplate() {
    return (
        `<div class="new-task-container">
                <h2>Новая задача</h2>
                <form class="add-task-form">
                    <input type="text" class="task-input" placeholder="Название задачи..." />
                    <button class="add-task-button" type="submit">
                        + Добавить
                    </button>
                </form>
            </div>`
    );
}


export default class TaskFormView extends AbstractComponent {

    #handleClick = null;
    constructor(onClick) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler)
    }

    get template() {
        return createTaskFormComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
