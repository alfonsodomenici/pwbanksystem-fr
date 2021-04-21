import View from "./View.js";

export default class TransactionsView extends View{

    connectedCallback(){
        this.render();
    }

    view(){

    }
}

customElements.define('transactions-view',TransactionsView);