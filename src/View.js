import { render} from './lib/lit-html.js';

export default class View extends HTMLElement{

    render(){
        render(this.view(),this);
    }
}