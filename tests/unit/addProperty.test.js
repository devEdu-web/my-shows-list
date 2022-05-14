const addProperty = require('../../src/utils/addProperty');

it('should add a property to multiple objects', () => {
  const array = [
    {
      name: 'test',
    },
    {
      name: 'test2',
    },
    {
      name: 'test3',
    },
    {
      name: 'test4',
    },
  ];

  const objectWithProperty = addProperty(array, 'type', 'object');

  objectWithProperty.forEach((object) => {
    expect(object).toHaveProperty('type', 'object');
  });
});
