import View from "./View.js";
import { html} from './lib/lit-html.js';
import {isAuthenticated} from './TokenManager.js';

export default class AppbarView extends View{

    createView(){
        return html`
            <nav>
                <a href="/">Home</a>
                ${isAuthenticated() ? '' : html`<a href="/login">Login</a>`}
                ${isAuthenticated() ? '' : html`<a href="/registration">Registrati</a>`}
            </nav>
        `;
    }
}
customElements.define('appbar-view', AppbarView);