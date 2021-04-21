import View from "./View.js";
import { loggedUsername } from './TokenManager.js';
import { html } from "./lib/lit-html.js";

export default class AdminView extends View {

    connectedCallback() {
        this.render();
    }

    view() {
        return html`
            <h1>Admin view ${loggedUsername()}</h1>
        `;
    }
}
customElements.define('admin-view', AdminView);