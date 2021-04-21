import { html, render } from './lib/lit-html.js';
import View from './View.js';

export default class MessageView extends HTMLElement {

    constructor() {
        super();
        this.message = '';
    }

    connectedCallback() {
        document.addEventListener('pwMessage', (e) => this.onMessage(e))
    }

    onMessage({ detail: { msg, type } }) {
        console.log('onMessage()..' + msg);
        this.message = msg;
        this.type = type === 'error' ? 'is-danger' : 'is-info'
        this.createMessage(false);
        setTimeout(() => this.onClose(), 10000);
    }

    onClose(e) {
        this.createMessage(true)
    }

    createMessage(remove) {
        render(this.view(remove), this);
    }

    view(remove) {
        return remove === true ? html`` :
            html`
        <div class="notification ${this.type} is-light is-message">
            <button class="delete" @click=${(e) => this.onClose(e)}></button>
            ${this.message}
        </div>
        `;
    }
}
customElements.define('message-view', MessageView);