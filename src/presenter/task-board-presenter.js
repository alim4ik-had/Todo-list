import {render, RenderPosition} from "../framework/render.js";
import TaskListView from "../view/task-list-view.js";
import TaskView from "../view/task-view.js";
import TaskBoardView from "../view/task-board-view.js";
import {StatusLabel, statusList} from "../const.js";

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

        this.#tasks = [...this.#taskModel.getTasks()];
        render(this.#taskBoard, this.#boardContainer, RenderPosition.BEFOREEND);

        let currentTaskList;
        let filteredTaskList;

        for(let i = 0; i < statusList.length; i++){
            this.#taskListView = new TaskListView(statusList[i], StatusLabel[statusList[i]])
            render(this.#taskListView, this.#taskBoard.getElement(), RenderPosition.BEFOREEND);
            currentTaskList = this.#getCurrentTaskList()
            filteredTaskList = this.#tasks.filter(task => task.status === statusList[i]);
            for(let j = 0; j < filteredTaskList.length; j++){
                render(new TaskView(filteredTaskList[j]), currentTaskList);
            }

        }
    }

    #getCurrentTaskList(){
        return this.#taskListView.getElement().children[this.#taskListView.getElement().children.length-1];
    }
}