import {AbstractComponent} from "../framework/view/abstract-component.js";


function createTaskBoardComponentTemplate() {
    return (
        `<div class="task-groups"></div>`
    );
}


export default class TaskBoardView extends AbstractComponent{
    get template() {
        return createTaskBoardComponentTemplate();
    }
}
