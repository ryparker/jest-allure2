# Jest-Allure2

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/jest-community/awesome-jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Allure Report](https://user-images.githubusercontent.com/2823336/40350093-59cad576-5db1-11e8-8210-c4db3bf825a1.png)

Jest reporter that produces descriptive Allure reports. Forked from [jest-allure](https://github.com/zaqqaz/jest-allure), this project uses the latest allure configuration `^2.0.0-beta.6`. This enables support for new attachment types that were not supported on previous version. Allure result files are now JSON, replacing v1's XML format. A global `allure` object is available to enable full use of Allure's feature set.

[Allure Framework](https://github.com/allure-framework/allure2) is a flexible lightweight multi-language test report tool that not only
shows a very concise representation of what have been tested in a neat web report form,
but allows everyone participating in the development process to extract maximum of useful
information from everyday execution of tests.

## Requirements

| Resource                                                             | Description                                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Jest](https://jestjs.io/)                                           | A highly customizable Javascript testing framework.                                          |
| [Allure 2 CLI](https://github.com/allure-framework/allure2#download) | "A Java jar command line tool that turns Allure result files into beautiful Allure reports." |

## :rocket: Quick start

1. Add this package

```shell
yarn add -D jest-allure2
```

2. Update `jest.setup.js`

```js
var {registerAllure} = require('jest-allure2')

registerAllure()
```

3. Run tests

```shell
yarn test
```

4. Generate the Allure report

```shell
allure generate
```

## Advanced features

Add descriptions, screenshots, steps, severity and lots of other
fancy details to the report.

The `global` variable will have a new `allure` object available with the following methods:

```js
    allure.description(description: string): this;
    allure.severity(severity: Severity): this;
    allure.epic(epic: string): this;
    allure.feature(feature: string): this;
    allure.story(story: string): this;
    allure.step(name: string, status: string | (args:[any]) => string): this;
    allure.environment(name: string, value: string): this;
    allure.attachment(name: string, buffer: any, type: string): this;
    allure.label(name: string, value: string): this;
    allure.tag(name: string): this;
    allure.parameter(name: string, value: string): this;
    allure.issue(id: string): this;
    allure.tms(id: string): this;
```

## Example

```js
// Test subject
function sum(a: number, b: number): number {
  return a + b
}

// Tests
describe("Number functions", () => {
    beforeEach('Setup', ()=>{
        allure.severity(Severity.Critical)
        allure.feature(Feature.Billing)
        allure.story("BILL-217")
    })

    test("sum performs addition functionality", () => {
        allure.description("Tests should be ran when billing functionality is changed.")

        allure.step("Two integers can be added together.", () => {
            allure.parameter('a', 3)
            allure.parameter('b', 4)
            expect(sum(3,4)).toBe(7)
        })

        allure.step("Two floats can be added together", () => {
            allure.parameter('a', 3.141)
            allure.parameter('b', 2.571)
            expect(sum(3.141, 2.571)).toBe(5.712)
        })

        allure.step("Two objects can be added together", () => {
            const a = {"a": 1}
            const b = {"b": 2}

            allure.parameter('a', a)
            allure.parameter('b', b)
            expect(sum(a, b)).toMatchSnapshot()
        })
    });
});

```

## :gear: Options

The main export `registerAllure()` accepts three optional configuration arguments:

| Parameter       | Description                                                                         | Default            |
| --------------- | ----------------------------------------------------------------------------------- | ------------------ |
| resultsDir      | File path where result files are written.                                           | `"allure-results"` |
| environmentInfo | Key value pairs that will appear under the environment section of the Allure report | `{}`               |
| testMapper      | Decorator that receives Allure test result objects.                                 | `undefined`        |

```js
var resultsDir = 'allure-results'
var environmentInfo = {"Username": "User-1331", "password": "password-1331"}
var testMapper = results => {
    if (result.status == Status.SKIPPED) {
        result.fullName = `(WAS SKIPPED) ${result.fullName}`
    }
    return result
}

registerAllure(resultsDir, environmentInfo, testMapper)
```
