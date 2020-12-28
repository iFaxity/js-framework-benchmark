'use strict';

var {makeObservable, observable, computed, action} = require ("mobx");

function _random(max) {
    return Math.round(Math.random()*1000)%max;
}

let id = 1;

class Row {
    id = 0;
    store;
    label = "";
    get isSelected() {
        return this.store.selected === this;
    }

    constructor() {
        makeObservable(this, {
            label: observable,
            isSelected: computed,
        });
    }
}

function row(store, label, _id) {
    let r = new Row();
    if (_id) {
        r.id = _id;
    } else {
        r.id = id++;
    }
    r.label = label;
    r.store = store;
    return r;
}

export class Store {
    data = [];
    selected = null;

    constructor() {
        makeObservable(this, {
            data: observable,
            selected: observable,
            buildData: action,
            updateData: action,
            delete: action,
            run: action,
            add: action,
            update: action,
            select: action,
            runLots: action,
            clear: action,
            swapRows: action,
        });
    }

    buildData(count = 1000) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push(row(this, adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] ));
        return data;
    }

    updateData(mod = 10) {
        for (let i=0;i<this.data.length;i+=10) {
            this.data[i].label = this.data[i].label + ' !!!';
        }
    }
    delete(row) {
        this.data.remove(row);
    }
    run() {
        this.data.replace(this.buildData());
        this.selected = undefined;
    }
    add() {
        this.data.spliceWithArray(this.data.length, 0, this.buildData(1000));
    }
    update() {
        this.updateData();
    }
    select(row) {
        this.selected = row;
    }
    runLots() {
        this.data.replace(this.buildData(10000));
        this.selected = undefined;
    }
    clear() {
        this.data.clear();
        this.selected = undefined;
    }
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
}
