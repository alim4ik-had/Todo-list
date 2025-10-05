
import {RenderPosition, render} from "./framework/render.js";
import HeaderView from "./view/header-view.js";
import TaskFormView from "./view/task-form-view.js";
import TaskBoardView from "./view/task-board-view.js";
import TaskListView from "./view/task-list-view.js";
import TaskView from "./view/task-view.js";



const bodyContainer= document.querySelector('.body');
const mainContainer= document.querySelector('.main-container');



render(new HeaderView(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new TaskFormView(), mainContainer, RenderPosition.AFTERBEGIN);
render(new TaskBoardView(), mainContainer, RenderPosition.BEFOREEND);

const taskBoardContainer = document.querySelector('.task-groups');

const array = ["Бэклог", "В процессе", "Готово", "Корзина"]

let currentTaskGroup;
let currentTaskList;

let groupCount = 0
while(groupCount < 4){
    render(new TaskListView(array[groupCount]), taskBoardContainer, RenderPosition.BEFOREEND);
    currentTaskGroup = taskBoardContainer.children[groupCount];
    currentTaskList = currentTaskGroup.children[currentTaskGroup.children.length-1];
    for(let j = 0; j < 3; j++){
        render(new TaskView(), currentTaskList);
    }
    groupCount++;

}