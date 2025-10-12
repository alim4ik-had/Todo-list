import {AbstractComponent} from "../framework/view/abstract-component.js";


function createTaskListComponentTemplate(taskType, groupName) {
    return (
        `<div class="${taskType}-group">
            <h3 class="group-title ${taskType}">${groupName}</h3>
            <ul class="task-list"></ul>
        </div>`
    );
}


export default class TaskListView extends AbstractComponent{

    constructor(taskType, groupName) {
        super();
        this.taskType = taskType;
        this.groupName = groupName;
    }
    get template() {
        return createTaskListComponentTemplate(this.taskType, this.groupName);
    }
}
