module.exports = function(config) {
  config.set({
    testRunner: "mocha",
    mutator: "javascript",
    reporter: ["html", "clear-text", "progress"],
    packageManager: "npm",
    testFramework: "mocha",
    coverageAnalysis: "perTest",
    mutate: ["calculator.js"]
  });
};
