import View from "./View.js";
import { html } from './lib/lit-html.js';
import { isAuthenticated, removeToken } from './TokenManager.js';

export default class AppbarView extends View {

    connectedCallback() {
        document.addEventListener('login', e => this.onLogin(e))
        this.render();
    }

    onLogin() {
        console.log('onLogin()...');
        this.render()
    }

    onLogout(e) {
        removeToken();
        this.render()
    }

    view() {
        return html`
            <nav>
                <a href="/">Home</a>
                ${isAuthenticated() ? '' : html`<a href="/login">Login</a>`}
                ${isAuthenticated() ? '' : html`<a href="/registration">Registrati</a>`}
                ${isAuthenticated() ? html`<a href="/user">User Home</a>` : ''}
                ${isAuthenticated() ? html`<a href="/logout" @click=${(e) => this.onLogout(e)}>Logout</a>` : ''}
            </nav>
        `;
    }
}
customElements.define('appbar-view', AppbarView);