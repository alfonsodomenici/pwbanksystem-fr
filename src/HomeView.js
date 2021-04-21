import View from "./View.js";
import { html} from './lib/lit-html.js';

export default class HomeView extends View{

    connectedCallback(){
        this.render();
    }

    view(){
        //creare l'interfaccia grafica del componente
        return html`
            <h1>Home view</h1>
            <p>benvenuto in app</p>
        `;
    }

}

customElements.define('home-view', HomeView);