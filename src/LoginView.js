import View from "./View.js";
import { html } from './lib/lit-html.js';
import { Router } from './lib/vaadin-router.js';
import { storeToken, isUserInRole } from './TokenManager.js';
import { errorMessage } from "./MessageManager.js";

export default class LoginView extends View {

    connectedCallback() {
        this.render();
        this.usr = document.querySelector('#usr');
        this.pwd = document.querySelector('#pwd');
    }

    view() {
        return html`
            <form @submit=${e => this.onLogin(e)}>
                <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                        <input class="input" type='text' name='usr' id='usr' placeholder="username...">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                        <input class="input" type='password' name='pwd' id='pwd' placeholder="password...">
                    </div>
                </div>                
                <div class="control">
                    <input class="button" type='submit'>
                </div>
                
            </form>
        `;
    }

    onLogin(e) {
        e.preventDefault();
        const f = new URLSearchParams();
        f.append("usr", this.usr.value);
        f.append('pwd', this.pwd.value);
        fetch('https://pwbanksystem.tssdev.it/resources/auth', {
            method: 'POST',
            body: f
        }).then(response => {
            if (response.status === 401) {
                throw new Error("login fallita. username o password invalidi")
            }
            if (response.status !== 200) {
                throw new Error("login fallita.")
            }
            return response.text();
        }).then(token => {
            console.log('autenticazione ok.. \n', token);
            storeToken(token);
            if (isUserInRole('USER')) {
                Router.go("/user");
            } else {
                Router.go("/admin");
            }

            this.dispatchEvent(new CustomEvent('login', {
                bubbles: true,
                composed: true,
                detail: {
                }
            }));
        })
            .catch(error => {
                errorMessage(error);
            })
    }

}

customElements.define('login-view', LoginView);