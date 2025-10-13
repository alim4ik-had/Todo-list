import {AbstractComponent} from "../framework/view/abstract-component.js";


function createCleanButtonComponentTemplate() {
    return (
        `<button class="delete-task-button">
            X Очистить
        </button>`
    );
}


export default class CleanButtonView extends AbstractComponent {

    #handleClick = null;

    constructor(onClick) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler)
    }

    get template() {
        return createCleanButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
