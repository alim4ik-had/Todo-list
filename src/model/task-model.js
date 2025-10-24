import {tasks} from "../mock/task.js";
import {generateID} from "../utils.js";

export default class TaskModel {
    #boardTasks = tasks
    #observers = []

    get tasks() {
        return this.#boardTasks;
    }

    set tasks(tasks) {
        this.#boardTasks = tasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    addTask(title){
        const newTask = {
            id: generateID(),
            title: title,
            status: "backlog",
        }
        this.#boardTasks.push(newTask);
        this._notifyObserver();
        return newTask;
    }

    removeTasks(trashTasks){
        this.tasks = this.tasks.filter(task =>
            !trashTasks.some(trash => trash.id === task.id && trash.title === task.title));
        this._notifyObserver();
    }

    updateTaskStatus(taskId, newStatus, preferId){
        const task = this.tasks.find(task => task.id === taskId);
        this.#boardTasks = this.tasks.filter(task => task.id !== taskId);
        if(task){
            const currentId = this.tasks.findIndex(task => task.id === preferId);
            this.#boardTasks.splice(currentId,0, task);
            task.status = newStatus;
            this._notifyObserver();
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }
    removeObserver(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer);
    }

    _notifyObserver() {
        this.#observers.forEach(observer => observer());
    }


}