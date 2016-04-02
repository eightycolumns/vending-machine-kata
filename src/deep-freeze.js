function deepFreeze(object) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      if (object[property] instanceof Object) {
        deepFreeze(object[property]);
      }
    }
  }

  return Object.freeze(object);
}
