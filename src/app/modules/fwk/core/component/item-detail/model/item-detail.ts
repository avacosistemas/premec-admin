import { ItemTab } from './item-tab';


export class ItemDetail {
    tabs: ItemTab[];
    title: string;
    constructor() {
        this.tabs = [];
    }
    addTab(tab) {
        this.tabs.push(tab);
    }
}
