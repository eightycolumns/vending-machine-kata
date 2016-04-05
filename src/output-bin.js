var OutputBin = (function () {
  function create() {
    var contents = [];

    function addProductToContents(product) {
      contents.push(product);
    }

    function getContents() {
      return contents;
    }

    return deepFreeze({
      addProductToContents: addProductToContents,
      getContents: getContents
    });
  }

  return deepFreeze({
    create: create
  });
})();
