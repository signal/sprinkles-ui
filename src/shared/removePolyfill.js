/* eslint no-prototype-builtins: "off" */
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
// polyfill for the Node.remove() method in Internet Explorer 9 and higher
// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
((arr) => {
  arr.forEach((item) => {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) {
          this.parentNode.removeChild(this);
        }
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
