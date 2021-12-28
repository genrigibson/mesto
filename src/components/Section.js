export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);
    })}

  addItem(element, myElement = false) {
    if (myElement) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
