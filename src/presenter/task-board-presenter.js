import {render, RenderPosition} from "../framework/render.js";
import TaskListView from "../view/task-list-view.js";
import TaskView from "../view/task-view.js";
import TaskBoardView from "../view/task-board-view.js";
import {StatusLabel, statusList, UserActions} from "../const.js";
import EmptyTaskView from "../view/empty-task-view.js";
import LoadingView from "../view/loading-view.js";

export default class TaskBoardPresenter{

    #loadView = new LoadingView();
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

    async init(){
        await this.#tasksInit();
        this.#clearBoard();
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
        this.#taskListView = new TaskListView(statusType, statusName, this.#handleTaskDrop.bind(this));
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

    async createTask(){
        const taskTitle = document.querySelector(".task-input").value.trim();
        if(!taskTitle){
            return;
        }
        try{
            await this.#taskModel.addTask(taskTitle);
            document.querySelector(".task-input").value = "";
        }catch(err){
            console.error('Ошибка при создании задачи: ', err);
        }
    }

    async deleteTask(){
        try{
            await this.#taskModel.clearBasketTasks();
        }catch(err){
            console.error('Ошибка при очистке корзины: ', err);
        }

    }

    #handleModelChange(event, payload){
        switch(event){
            case UserActions.ADD_TASK:
            case UserActions.DELETE_TASK:
            case UserActions.UPDATE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                this.#disabledCleanButton()
                break;
        }
    }

    #clearBoard(){
        this.#taskBoard.element.innerHTML = '';
    }

    #renderLoading(){
        render(this.#loadView, this.#boardContainer);
    }

    #removeLoading(){
        this.#loadView.element.remove();
    }

    async #tasksInit(){
        this.#renderLoading();
        await this.#taskModel.init();
        this.#removeLoading();
    }

    #disabledCleanButton(){
        const button = this.#cleanButton.element;
        button.disabled = this.#taskModel.getTasksByStatus("trash").length === 0;
        button.style.cursor = button.disabled ? "default" : "pointer";
    }

    async #handleTaskDrop(taskId, newStatus, preferId){
        try{
            await this.#taskModel.updateTaskStatus(taskId, newStatus, preferId);
        }catch(err){
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }


}