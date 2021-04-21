import View from "./View.js";
import { html} from './lib/lit-html.js';
import {Router} from './lib/vaadin-router.js';
import {storeToken} from './TokenManager.js';

export default class LoginView extends View{

    connectedCallback(){
        this.render();
        this.usr = document.querySelector('#usr');
        this.pwd = document.querySelector('#pwd');
    }

    view(){
        return  html`
            <form @submit=${e => this.onLogin(e)}>
                <input type='text' name='usr' id='usr'>
                <input type='password' name='pwd' id='pwd'>
                <input type='submit'>
            </form>
        `;
    }

    onLogin(e){
        e.preventDefault();
        const f = new URLSearchParams();
        f.append("usr", this.usr.value);
        f.append('pwd', this.pwd.value);
        fetch ('https://pwbanksystem.tssdev.it/resources/auth',{
            method: 'POST',
            body: f
        }).then(response => {
            if(response.status === 401){
                throw new Error("login fallita. username o password invalidi");
            }
            if(response.status !== 200){
                throw new Error("errore nella login.. ", response.status.text);
            }
            return response.text();
        }).then(token => {
            console.log('autenticazione ok.. \n', token );
            storeToken(token);
            Router.go("/user");
            this.dispatchEvent(new CustomEvent('login', {
                bubbles: true,
                composed: true,
                detail: {
                }
            }));
        })
        .catch(error => {
            console.error(error);
        })
    }
}

customElements.define('login-view', LoginView);