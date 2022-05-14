function addPropertyToObjects(objectArray, property, value) {
  const array = [...objectArray];

  array.forEach((object) => {
    Object.defineProperty(object, property, {
      value: value,
      enumerable: true,
    });
  });

  return array;
}

module.exports = addPropertyToObjects;
