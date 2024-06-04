module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.mjs$': 'babel-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'mjs'],
  };
  