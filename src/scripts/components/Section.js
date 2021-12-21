/*export default class Section {
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
}*/
export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
