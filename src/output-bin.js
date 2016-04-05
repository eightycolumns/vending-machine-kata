var OutputBin = (function () {
  function create() {
    var contents = [];

    function getContents() {
      return contents;
    }

    function setContents(newContents) {
      contents = newContents;
    }

    return deepFreeze({
      getContents: getContents,
      setContents: setContents
    });
  }

  return deepFreeze({
    create: create
  });
})();
