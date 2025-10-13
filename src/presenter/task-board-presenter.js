import {render, RenderPosition} from "../framework/render.js";
import TaskListView from "../view/task-list-view.js";
import TaskView from "../view/task-view.js";
import TaskBoardView from "../view/task-board-view.js";
import {StatusLabel, statusList} from "../const.js";
import EmptyTaskView from "../view/empty-task-view.js";

export default class TaskBoardPresenter{

    #boardContainer = null;
    #taskModel = null;
    #taskBoard = new TaskBoardView();
    #cleanButton = null;

    #taskListView = null;


    constructor(boardContainer, taskModel, cleanButton){
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#cleanButton = cleanButton;

        this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    }

    get tasks(){
        return this.#taskModel.tasks;
    }

    init(){

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
            filteredTaskList = this.tasks.filter(task => task.status === statusList[i]);

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
        render(this.#cleanButton, currentTaskList, RenderPosition.AFTEREND)
    }

    createTask(){
        const taskTitle = document.querySelector(".task-input").value.trim();
        if(!taskTitle){
            return;
        }
        this.#taskModel.addTask(taskTitle);
        document.querySelector(".task-input").value = "";
    }

    deleteTask(){
        const trash = this.#taskModel.getTasksByStatus("trash")
        this.#taskModel.removeTasks(trash);

    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
        this.#disabledCleanButton()
    }

    #clearBoard(){
        this.#taskBoard.element.innerHTML = '';
    }

    #disabledCleanButton(){
        const button = this.#cleanButton.element;
        button.disabled = this.#taskModel.getTasksByStatus("trash").length === 0;
        button.style.cursor = button.disabled ? "default" : "pointer";
    }


}