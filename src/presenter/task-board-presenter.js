import {render, RenderPosition} from "../framework/render.js";
import TaskListView from "../view/task-list-view.js";
import TaskView from "../view/task-view.js";
import TaskBoardView from "../view/task-board-view.js";
import {StatusLabel, statusList} from "../const.js";
import EmptyTaskView from "../view/empty-task-view.js";
import CleanButtonView from "../view/clean-button-view.js";

export default class TaskBoardPresenter{

    #boardContainer = null;
    #taskModel = null;
    #taskBoard = new TaskBoardView();
    #tasks = [];

    #taskListView = null;


    constructor(boardContainer, taskModel){
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init(){

        this.#tasks = [...this.#taskModel.tasks];
        this.#renderBoard();
    }

    #getCurrentTaskList(){
        // получение доступа к тегу ul
        return this.#taskListView.element.children[this.#taskListView.element.children.length-1];
    }

    #renderBoard(){
        render(this.#taskBoard, this.#boardContainer, RenderPosition.BEFOREEND);

        let currentTaskList;
        let filteredTaskList;

        for(let i = 0; i < statusList.length; i++){
            this.#renderTaskList(statusList[i], StatusLabel[statusList[i]])
            currentTaskList = this.#getCurrentTaskList()
            filteredTaskList = this.#tasks.filter(task => task.status === statusList[i]);

            if(filteredTaskList.length === 0)
                this.#renderEmptyTask(currentTaskList);
            else
                filteredTaskList.forEach(task => {
                    this.#renderTask(task, currentTaskList);
                })
            if(statusList[i] === "trash")
                this.#renderCleanButton(currentTaskList);
        }
    }

    #renderTaskList(statusType, statusName){
        this.#taskListView = new TaskListView(statusType, statusName)
        render(this.#taskListView, this.#taskBoard.element, RenderPosition.BEFOREEND);
    }

    #renderTask(task, currentTaskList){
        render(new TaskView(task), currentTaskList);
    }

    #renderEmptyTask(currentTaskList){
        render(new EmptyTaskView(), currentTaskList);
    }

    #renderCleanButton(currentTaskList){
        render(new CleanButtonView(), currentTaskList, RenderPosition.AFTEREND)
    }
}