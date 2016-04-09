var ProductCollection = (function () {

function create() {
  var contents = [];

  function containsCola() {
    return contents.some(function (product) {
      return product.getName() === 'Cola';
    });
  }

  function containsChips() {
    return contents.some(function (product) {
      return product.getName() === 'Chips';
    });
  }

  function containsCandy() {
    return contents.some(function (product) {
      return product.getName() === 'Candy';
    });
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
    containsCola: containsCola,
    containsChips: containsChips,
    containsCandy: containsCandy,
    isEmpty: isEmpty,
    pop: pop,
    push: push
  });
}

return deepFreeze({
  create: create
});

})();
