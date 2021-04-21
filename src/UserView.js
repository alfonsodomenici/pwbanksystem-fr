import View from "./View.js";
import { html} from './lib/lit-html.js';

export default class UserView extends View{


    createView(){
        return html`
            <h1>User View</h1>
        `;
    }
}
customElements.define('user-view', UserView);