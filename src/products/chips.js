var Chips = (function () {

function create() {
  var name = 'Chips';

  return Product.create(name);
}

return deepFreeze({
  create: create
});

})();
