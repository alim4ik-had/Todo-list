
import {RenderPosition, render} from "./framework/render.js";
import HeaderView from "./view/header-view.js";
import TaskFormView from "./view/task-form-view.js";
import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task-model.js";
import CleanButtonView from "./view/clean-button-view.js";
import TasksApiService from "./tasks-api-service.js";

const END_POINT = 'https://68ff583de02b16d1753d87ac.mockapi.io/api/task/'
const taskModel = new TaskModel(
    new TasksApiService(END_POINT)
);
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