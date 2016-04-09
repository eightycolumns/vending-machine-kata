var ProductCollection = (function () {

function create() {
  var collection = Collection.create();

  function containsCola() {
    return collection.getContents().some(function (product) {
      return product.getName() === 'Cola';
    });
  }

  function containsChips() {
    return collection.getContents().some(function (product) {
      return product.getName() === 'Chips';
    });
  }

  function containsCandy() {
    return collection.getContents().some(function (product) {
      return product.getName() === 'Candy';
    });
  }

  return deepFreeze({
    containsCola: containsCola,
    containsChips: containsChips,
    containsCandy: containsCandy,
    getSize: collection.getSize,
    isEmpty: collection.isEmpty,
    pop: collection.pop,
    push: collection.push
  });
}

return deepFreeze({
  create: create
});

})();
