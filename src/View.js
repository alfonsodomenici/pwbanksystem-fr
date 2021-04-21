import { render} from './lib/lit-html.js';

export default class View extends HTMLElement{

    connectedCallback(){
        render(this.createView(),this);
        this.postConstruct();
    }

    createView(){
        throw new Error('metodo astratto, deve essere riscritto...');
    }

    postConstruct(){
        
    }
}