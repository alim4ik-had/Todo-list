
export const statusList = ["backlog", "in-progress", "ready", "trash"];

export const StatusLabel = {
    [statusList[0]]: "Бэклог",
    [statusList[1]]: "В процессе",
    [statusList[2]]: "Готово",
    [statusList[3]]: "Корзина"
}

export const UserActions = {
    UPDATE_TASK: "UPDATE_TASK",
    DELETE_TASK: "DELETE_TASK",
    ADD_TASK: "ADD_TASK",
}

export const UpdateType = {
    PATCH: "PATCH",
    MINOR: "MINOR",
    MAJOR: "MAJOR",
    INIT: "INIT",
}