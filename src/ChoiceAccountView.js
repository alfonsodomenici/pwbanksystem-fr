import View from "./View.js";
import { readToken } from './TokenManager.js'
export default class ChoiceAccountView extends View {

    connectedCallback(){
        this.render();
    }

    view() {

    }
}
customElements.define('choice-account',ChoiceAccountView);