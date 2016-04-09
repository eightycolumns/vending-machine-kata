var Candy = (function () {

function create() {
  var name = 'Candy';

  return Product.create(name);
}

return deepFreeze({
  create: create
});

})();
