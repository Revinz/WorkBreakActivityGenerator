module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "sinon-chrome"],
    browsers: ["ChromeHeadless"],

    files: ["Extension/**/*.js", "tests/*.js"],

    exclude: ["Extension/background.js", "Extension/popup.js"],
    reporters: ["spec"],
    singleRun: true,
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-sinon-chrome",
      "karma-jasmine-html-reporter",
      "karma-spec-reporter",
    ],
  });
};
