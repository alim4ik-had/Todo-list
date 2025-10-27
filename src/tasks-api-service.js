import ApiService from "./framework/view/ApiService.js";

const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

export  default class TasksApiService extends ApiService {
    get tasks(){
        return this._load("tasks")
            .then(ApiService.parseResponse);
    }

    async addTask(task){
        const response = await this._load(
            'tasks',
            Method.POST,
            JSON.stringify(task),
            new Headers({'Content-Type': 'application/json'})
        );
        return ApiService.parseResponse(response);
    }

    async updateTask(task){
        const response = await this._load(
            `tasks/${task.id}`,
            Method.PUT,
            JSON.stringify(task),
            new Headers({'Content-Type': 'application/json'})
        );
        return await ApiService.parseResponse(response);
    }

    async deleteTask(taskId){
        await this._load(
            `tasks/${taskId}`,
            Method.DELETE,
        );
    }
}