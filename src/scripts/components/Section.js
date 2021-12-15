export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(element, method) {
    if(method === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
