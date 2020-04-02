import {html} from '@shlim/html';

export default (state) => {
  const {data, selected} = state;

  function click({target}) {
    const a = target.closest('a');
    const {action} = a.dataset;
    state[action](+a.closest('tr').id);
  }

  return html`
    <table @click=${click}
      class="table table-hover table-striped test-data">
      <tbody>${html.for(data, item => item.id, item => html`
        <tr id=${item.id} class=${item.id === selected ? 'danger' : ''}>
          <td class="col-md-1">${item.id}</td>
          <td class="col-md-4">
            <a data-action="select">${item.label}</a>
          </td>
          <td class="col-md-1">
            <a data-action="remove">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
          </td>
          <td class="col-md-6" />
        </tr>`)}
      </tbody>
    </table>
  `;
};
