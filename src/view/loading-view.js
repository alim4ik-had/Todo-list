import { AbstractComponent } from "../framework/view/abstract-component.js";

function createLoadComponentTemplate() {
    return (
        `<div id="loading" class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Загрузка задач...</p>
        </div>`
    );
}


export default class LoadingView extends AbstractComponent{
    get template() {
        return createLoadComponentTemplate();
    }
}