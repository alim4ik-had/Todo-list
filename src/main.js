
import {RenderPosition, render} from "./framework/render.js";
import HeaderView from "./view/header-view.js";
import TaskFormView from "./view/task-form-view.js";
import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task-model.js";
import CleanButtonView from "./view/clean-button-view.js";


const taskModel = new TaskModel();
const bodyContainer= document.querySelector('.body');
const mainContainer= document.querySelector('.main-container');

render(new HeaderView(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new TaskFormView(), mainContainer, RenderPosition.AFTERBEGIN);

const taskBoardPresenter = new TaskBoardPresenter(mainContainer, taskModel);
taskBoardPresenter.init();

// const taskBoardChildren = mainContainer.children[mainContainer.children.length - 1];
//
// const trashTaskGroup = taskBoardChildren.children[taskBoardChildren.children.length - 1];
//
// render(new CleanButtonView(), trashTaskGroup, RenderPosition.BEFOREEND);