import {AbstractComponent} from "../framework/view/abstract-component.js";


function createEmptyTaskComponentTemplate() {
    return (
        `<li class="null-task-item">Перетащите карточку</li>`
    );
}


export default class EmptyTaskView extends AbstractComponent {


    get template() {
        return createEmptyTaskComponentTemplate();
    }
}
