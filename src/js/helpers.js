export function filterByType(map, type) {
  return Object.keys(map)
    .filter(key => map[key].type === type)
    .map(key => map[key]);
}

export function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

export function $(query) {
  const elements = Array.prototype.slice.call(document.querySelectorAll(query));

  return {

    children: (toAdd) => {
      elements.forEach(element => {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        element.appendChild(toAdd);
      });
    },

    on: (event, callback) => {
      elements.forEach(element => element.addEventListener(event, callback));
    },

    addClass: (className) => {
      elements.forEach(element => element.classList.add(className));
    },

    removeClass: (className) => {
      elements.forEach(element => element.classList.remove(className));
    },

    attr: (attribute, value) => {
      elements.forEach(element => {
        if (value === false) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      });
    },

    map: (callback) => {
      return elements.map(callback);
    }

  };
}
