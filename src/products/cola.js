var Cola = (function () {

function create() {
  var name = 'Cola';

  return Product.create(name);
}

return deepFreeze({
  create: create
});

})();
