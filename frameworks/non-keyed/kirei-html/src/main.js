import {State} from 'js-framework-benchmark-utils';
import {html, render} from '@kirei/html';
window.html = html;

import Jumbotron from './jumbotron.js';
import Table from './table.js';

const state = State(update);
const main = document.getElementById('container');

update(state);

function update(state) {
  render(html`
  <div class="container">
    ${Jumbotron(state)}
    ${Table(state)}
    <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
  </div>`, main);
}
