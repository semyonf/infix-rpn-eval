const constants = new Map([
  ['pi', Math.PI],
  ['tau', Math.PI * 2],
  ['e', Math.E],
]);

constants.set = constants.clear = constants.delete = () => {
  throw new Error('This map is frozen!');
};

export default constants
