import View from "./View.js";
import { html } from './lib/lit-html.js';
import { isAuthenticated, removeToken, isUserInRole } from './TokenManager.js';

export default class AppbarView extends View {

    connectedCallback() {
        document.addEventListener('login', e => this.onLogin(e))
        this.render();
        this.burger();
    }

    burger() {
        document.addEventListener('DOMContentLoaded', () => {

            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach(el => {
                    el.addEventListener('click', () => {

                        // Get the target from the "data-target" attribute
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);

                        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');

                    });
                });
            }

        });
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
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                    </a>
                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item" href="/">
                            Home
                        </a>
                        ${isAuthenticated() ? this.renderAuthMenu() : this.renderNotAuthMenu()}       
                    </div>  
                    <div class="navbar-end" >
                        ${this.renderLoginLogoutMenu()}
                    </div>
                </div>
            </nav>

        `;
    }

    renderAuthMenu(){
        if(isUserInRole('USER')){
            return this.renderUserMenu();
        }else{
            return this.renderAdminMenu();
        }
    }

    renderUserMenu(){
        return html`
            <a class="navbar-item" href="/user">
                User
            </a>
        `;
    }

    renderAdminMenu(){
        return html`
            <a class="navbar-item" href="/admin">
                Admin
            </a>
        `;
    }

    renderNotAuthMenu() {
        return html`
                <a class="navbar-item" href="/registration">
                    Registrati
                </a>
            `;
    }
    renderLoginLogoutMenu() {
        if (isAuthenticated()) {
            return html`
            <a class="navbar-item" @click=${(e) => this.onLogout(e)}>
                Logout
            </a>
            `;
        } else {
            return html`
                <a class="navbar-item" href="/login">
                    Login
                </a>
            `;
        }
    }
}
customElements.define('appbar-view', AppbarView);