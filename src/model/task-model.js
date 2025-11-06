import {generateID} from "../utils.js";
import Observable from "../framework/observable.js";
import {UpdateType, UserActions} from "../const.js";

export default class TaskModel extends Observable {

    #taskApiService = null;
    #boardTasks = []

    constructor(taskApiService) {
        super();
        this.#taskApiService = taskApiService;
        this.#taskApiService.tasks.then(tasks => {
            console.log(tasks);
        })
    }


    get tasks() {
        return this.#boardTasks;
    }

    set tasks(tasks) {
        this.#boardTasks = tasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    async addTask(title){
        const newTask = {
            id: generateID(),
            title: title,
            status: "backlog",
        }
        try{
            const createdTask = await this.#taskApiService.addTask(newTask);
            this.tasks.push(createdTask);
            this._notify(UserActions.ADD_TASK, createdTask);
            return createdTask;
        }catch(err){
            console.error('Ошибка при добавлении задачи на сервер: ', err);
            throw err;
        }
    }

    deleteTask(taskId){
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this._notify(UserActions.DELETE_TASK, { id: taskId });
    }

    async clearBasketTasks(){
        const basketTasks = this.getTasksByStatus('trash');

        try{
            /*
            * Разделил список basketTasks на части что Promise.all не тормозил
            * */
            const concurrency = 3;

            for (let i = 0; i < basketTasks.length; i += concurrency) {
                const batch = basketTasks.slice(i, i + concurrency);
                await Promise.all(batch.map(task =>
                    this.#taskApiService.deleteTask(task.id)
                ));
            }

            this.tasks = this.tasks.filter(task => task.status !== 'trash');
            this._notify(UserActions.DELETE_TASK, {status: 'trash'});
        }catch(err){
            console.error('Ошибка при удалении задач из корзины на сервере: ', err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus, preferId){
        const task = this.tasks.find(task => task.id === taskId);
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        if(task){
            const previousStatus = task.status;
            const currentTaskId=this.tasks.findIndex(task => task.id === preferId);
            this.tasks.splice(currentTaskId, 0, task);
            task.status = newStatus;
            try{
                const updatedTask = await this.#taskApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserActions.UPDATE_TASK, task);
            }catch(err){
                console.error('Ошибка при обновлении статуса задачи на сервере: ', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }

    async init(){
        try{
            this.#boardTasks = await this.#taskApiService.tasks;
        }catch (err){
            this.#boardTasks = [];
        }
        this._notify(UpdateType.INIT)
    }


}