
import {RenderPosition, render} from "./framework/render.js";
import HeaderView from "./view/header-view.js";
import TaskFormView from "./view/task-form-view.js";
import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task-model.js";
import CleanButtonView from "./view/clean-button-view.js";


const taskModel = new TaskModel();
const bodyContainer= document.querySelector('.body');
const mainContainer= document.querySelector('.main-container');

const formAddTaskView = new TaskFormView(
    handleNewTaskButtonClick
);

render(new HeaderView(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskView, mainContainer, RenderPosition.AFTERBEGIN);

const cleanButton = new CleanButtonView(
    handleCleanButtonClick
);

const taskBoardPresenter = new TaskBoardPresenter(mainContainer, taskModel, cleanButton);
taskBoardPresenter.init();


function handleNewTaskButtonClick(){
    taskBoardPresenter.createTask();
}

function handleCleanButtonClick(){
    taskBoardPresenter.deleteTask()
}