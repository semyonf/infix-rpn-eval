module.exports = function (config) {
  config.set({
    testRunner: 'mocha',
    mutator: 'javascript',
    reporter: ['html', 'clear-text', 'progress'],
    mutate: [
      'src/**/*.js',
      '!src/Associativity.js',
      '!src/operations.js',
      '!src/constants.js'
    ],
    files: [
      'src/**/*.js',
      'test/**/*.js',
      'main.js'
    ],
    packageManager: 'npm',
    testFramework: 'mocha',
    coverageAnalysis: 'perTest'
  });
};
