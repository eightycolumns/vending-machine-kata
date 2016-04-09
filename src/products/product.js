var Product = (function () {

function create(name, costInCents) {

  function getName() {
    return name;
  }

  return deepFreeze({
    getName: getName
  });
}

return deepFreeze({
  create: create
});

})();
