var CoinReturn = (function () {

function create() {
  var contents = [];

  function addCoinToContents(coin) {
    contents.push(coin);
  }

  function getContents() {
    return contents;
  }

  return deepFreeze({
    addCoinToContents: addCoinToContents,
    getContents: getContents
  });
}

return deepFreeze({
  create: create
});

})();
