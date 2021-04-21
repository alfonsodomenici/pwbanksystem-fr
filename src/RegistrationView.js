import { html } from "./lib/lit-html.js";
import { Router } from "./lib/vaadin-router.js";
import { errorMessage, infoMessage } from "./MessageManager.js";
import View from "./View.js";

export default class RegistrationView extends View {

    connectedCallback() {
        this.render();
    }

    onSave(e) {
        e.preventDefault();
        const { target: { form } } = e; // equivale a const form = e.target.form;
        const { elements: { fname, lname, email, tel, usr, pwd } } = form;
        form.reportValidity();
        if (form.checkValidity()) {
            const json = {
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                tel: tel.value,
                usr: usr.value,
                pwd: pwd.value
            }

            this.executeRestCall(json);
        }


    }

    executeRestCall(json) {
        fetch('https://pwbanksystem.tssdev.it/resources/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(json)
        }).then(response => {
            if (response.status !== 201) {
                throw new Error("errore nella registrazione.. ", response.status.text);
            }
            return response.json();
        }).then(json => {
            console.log(json);
            Router.go('/login');
            infoMessage("Registrazione ok!!!")
        }).catch(error => {
            errorMessage(error);
        })
    }
    view() {
        return html`
            <h1>Registrati</h1>
            <form >
                <div class="field">
                    <label class="label">Nome</label>
                    <div class="control">
                        <input class="input" type='text' name='fname' id='fname' placeholder="nome...">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Cognome</label>
                    <div class="control">
                        <input class="input" type='text' name='lname' id='lname' placeholder="cognome..." required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">email</label>
                    <div class="control">
                        <input class="input" type='email' name='email' id='email' placeholder="email..." required >
                    </div>
                </div>

                <div class="field">
                    <label class="label">telefono</label>
                    <div class="control">
                        <input class="input" type='tel' pattern="[0-9]{3}-[0-9]{7}"
                             name='tel' id='tel' placeholder="xxx-xxxxxxx" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">username</label>
                    <div class="control">
                        <input class="input" type='text' name='usr' id='usr' placeholder="username..." required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">password</label>
                    <div class="control">
                        <input class="input" type='password' name='pwd' id='pwd' placeholder="password..." required>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary    " @click=${(e) => this.onSave(e)}>Registrati</button>
                </div>
                
            </form>
        `;
    }
}

customElements.define('registration-view', RegistrationView);