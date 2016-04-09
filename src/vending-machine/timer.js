var Timer = (function () {

function create() {

  function wait(timeInMilliseconds, callback) {
    setTimeout(callback, timeInMilliseconds);
  }

  return deepFreeze({
    wait: wait
  });
}

return deepFreeze({
  create: create
});

})();
