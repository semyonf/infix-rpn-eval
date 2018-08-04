module.exports = function (config) {
  config.set({
    testRunner: "mocha",
    mutator: "javascript",
    reporter: ["html", "clear-text", "progress"],
    mutate: [
      'src/**/*.js',
      '!src/convert_to_infix.js'
    ],
    files: [
      'src/**/*.js',
      'test/**/*.js',
      'main.js'
    ],
    packageManager: "npm",
    testFramework: "mocha",
    coverageAnalysis: "perTest"
  });
};
