import { Config } from "protractor";

export let config: Config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../cucumber/features/test.feature"],
  cucumberOpts: {
    format: "json:.tmp/results.json",
    require: [
      "./cucumber/features/stepDefinitions/**/*.js",
      "./cucumber/features/support/**/*.js"
    ]
  },
  plugins: [
    {
      package: require.resolve(
        "protractor-multiple-cucumber-html-reporter-plugin"
      ),
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: "Initial Tests",
        displayDuration: true
      }
    }
  ]
};
