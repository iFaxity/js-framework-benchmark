<template>
    <div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-md-6">
                    <h1>Vue.js 3 (keyed)</h1>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-sm-6 smallpad">
                          <button type="button" class="btn btn-primary btn-block" id="run" v-on:click="run">Create 1,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="runlots" v-on:click="runLots">Create 10,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="add" v-on:click="add">Append 1,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="update" v-on:click="update">Update every 10th row</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="clear" v-on:click="clear">Clear</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="swaprows" v-on:click="swapRows">Swap Rows</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover table-striped test-data" @click="handleClick">
            <tbody>
                <tr v-for="item in rows" :key="item.id" :class="{'danger': item.id == selected}">
                    <td class="col-md-1">{{item.id}}</td>
                    <td class="col-md-4">
                        <a data-action="select" :data-id="item.id">{{item.label}}</a>
                    </td>
                    <td class="col-md-1">
                        <a>
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"
                                data-action="remove" :data-id="item.id"></span>
                        </a>
                    </td>
                    <td class="col-md-6"></td>
                </tr>
            </tbody>
        </table>
        <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
    </div>
</template>

<script>
function _random(max) {
    return Math.round(Math.random()*1000)%max;
}

export default {
    data: () => ({
        rows: [],
        id: 1,
        selected: undefined,
    }),
    methods: {
        buildData(count = 1000) {
            const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
            const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
            const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
            const data = [];
            for (let i = 0; i < count; i++)
                data.push({id: this.id++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
            return data;
        },

        add() {
            const { rows } = this;
            rows.push(...this.buildData(1000));
        },
        remove(id) {
            const { rows } = this;
            rows.splice(rows.findIndex(d => d.id == id), 1);
        },
        select(id) {
            this.selected = id;
        },
        run() {
            const { rows } = this;

            rows.splice(0, rows.length, ...this.buildData());
            this.selected = undefined;
        },
        update() {
            const { rows } = this;

            for (let i = 0; i < rows.length; i += 10) {
                rows[i].label += ' !!!';
            }
        },
        runLots() {
            const { rows } = this;

            rows.push(...this.buildData(10000));
            this.selected = undefined;
        },
        clear() {
            const { rows } = this;

            this.rows = [];
            this.selected = undefined;
        },
        swapRows() {
            const { rows } = this;

            if (rows.length > 998) {
                const d1 = rows[1];
                const d998 = rows[998];

                rows[1] = d998;
                rows[998] = d1;
            }
        },
        handleClick(e) {
            const { action, id } = e.target.dataset;

            if (action && id) {
                if (action == 'select') {
                    this.select(id);
                } else if (action == 'remove') {
                    this.remove(id);
                }
            }
        },
    },
};
</script>
