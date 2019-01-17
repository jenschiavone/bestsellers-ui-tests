Must have node and npm installed.
Create project directory and cd into it.

### Initialize project with npm and install Protractor

`npm init -y`<br/>
`npm install protractor`<br/>

Create `config.ts` file:

```typescript
exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  directConnect: true,
  specs: [""]
};
```

Comment out `seleniumAddress` line for now since we are using:
`directConnect: true`
This way you will not have to manually start Selenium Sever.

### Install Typescript

`npm install typescript`

Protractor cannot understand Typescript by default, so there are some configs that need to be set:<br/>
`tsc --init`<br/>
^^ This generates the `tsconfig.json` file.<br/>
`npm install ts-node`<br/>
`npm install @types/node`<br/>

Protractor cannot invoke Typescript files. It can only compile and run JavaScript.
In the `tsconfig.json` file, uncomment the `outDir` option and set an output location for your transpiled JS files.
Also, set `target` to `es6` and add<br/> `"exclude": ["node_modules"]`

Put your test execution command in the `scripts` section of `package.json` for easier command-line execution. Here I have called it `cucumber`
Add a `protractor` property to provide knowledge of the Protractor from `node_modules`, as opposed to a globally installed version of Protractor.
Also add a property for the `webdriver-manager update` command for this instance of Protractor.

````json
"scripts": {
    "cucumber": "protractor _js-files/config.js",
    "precucumber": "tsc",
    "protractor": "./node_modules/protractor/built/cli.js",
    "webdriver-update": "./node_modules/.bin/webdriver-manager update"
  }```
````

With the above settings you would run:
`npm run webdriver-update` to do the update
`npm run cucumber` to run the tests (not quite ready to do that yet though)

Since we're here and thinking about it, go ahead and run `npm run webdriver-update`
This will not need to be run every time you run the tests.

The `precucumber` property above is a command that executes before the `cucumber` command. In this case we are transpiling all the typescript files.
There is also a `postcucumber` command available if needed. Any property you put here has a corresponding `pre` and `post` option.

### Add Cucumber

`npm install cucumber`<br/>
`npm install protractor-cucumber-framework`<br/>
`npm install @types/cucumber`<br/>

Come up with a Cucumber project structure and create the folders...I'm using this:

```
project
│
└───cucumber
    └───features
        └───stepDefinitions
        └───support
    └───pageObjects
    └───reports
```

### Update config.ts file

Add `framework`, `frameworkPath`, and `cucumberOpts` sections. Update the `specs` section.

```typescript
framework: "custom",
frameworkPath: require.resolve("protractor-cucumber-framework"),
specs: ["../cucumber/features/test.feature"],
cucumberOpts: {
require: [
"./cucumber/features/stepDefinitions/**/*.js",
"./cucumber/features/support/**/*.js"
]
}
```

Add a `timeout.ts` file to the support directory. This is required when working with Protractor.

```javascript
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);
```

Run `tsc` so that your `timeout.ts` file gets transpiled.

### Install chai and chai-as-promised

These are for your assertions.

`npm install chai`<br/>
`npm install chai-as-promised`<br/>
`npm install @types/chai`<br/>

### Reports

`npm install protractor-multiple-cucumber-html-reporter-plugin`<br/>

Add `format: "json:.tmp/results.json"` to your `cucumberOpts` in `config.ts`

Add the `protractor-multiple-cucumber-html-reporter-plugin` in the plugins block inside `config.ts`

For reference: https://www.npmjs.com/package/protractor-multiple-cucumber-html-reporter-plugin

### Screenshots for failed scenarios

For some reason I could not get this to work in an `After` hook if it was in the `hooks.ts` file. I had to include it in a `steps.ts` file, so I created a separate file solely for this: `report.steps.ts`

```typescript
import { Given, When, Then, After } from "cucumber";
import { browser } from "protractor";
After(function(scenarioResult) {
  let self = this;
  if (scenarioResult.result.status === "failed") {
    return browser.takeScreenshot().then(function(screenshot) {
      const decodedImage = new Buffer(
        screenshot.replace(/^data:image\/png;base64,/, ""),
        "base64"
      );
      self.attach(decodedImage, "image/png");
    });
  }
});
```

### Add a test
Add a simple test in your feature file to confirm that Protractor, Typescript, and Cucumber are all working.
Execute the tests with `npm run cucumber`

### Running select tests

If you want the ability to run a subset of tests, do so with `@tags` in the `cucumberOpts` section of your `config.ts` file.
