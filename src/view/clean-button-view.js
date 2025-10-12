import {AbstractComponent} from "../framework/view/abstract-component.js";


function createCleanButtonComponentTemplate() {
    return (
        `<button class="delete-task-button">
            X Очистить
        </button>`
    );
}


export default class CleanButtonView extends AbstractComponent {

    get template() {
        return createCleanButtonComponentTemplate();
    }
}
