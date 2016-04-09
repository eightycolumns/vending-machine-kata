var Collection = (function () {

function create() {
  var contents = [];

  function getContents() {
    return contents;
  }

  function getSize() {
    return contents.length;
  }

  function isEmpty() {
    return contents.length === 0;
  }

  function pop() {
    return contents.pop();
  }

  function push(coin) {
    contents.push(coin);
  }

  return deepFreeze({
    getContents: getContents,
    getSize: getSize,
    isEmpty: isEmpty,
    pop: pop,
    push: push
  });
}

return deepFreeze({
  create: create
});

})();
