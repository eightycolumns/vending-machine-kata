var Display = (function () {
  function create(initialText) {
    var text = initialText;

    function getText() {
      return text;
    }

    function setText(newText) {
      text = newText;
    }

    return ({
      getText: getText,
      setText: setText
    });
  }

  return deepFreeze({
    create: create
  });
})();
