import View from "./View.js";
import { html } from './lib/lit-html.js';
import { loggedUsername } from './TokenManager.js';

export default class UserView extends View {

    connectedCallback(){
        this.render();
    }
    
    view() {
        return html`
            <h1>User View ${loggedUsername()}</h1>

        `;
    }
}
customElements.define('user-view', UserView);