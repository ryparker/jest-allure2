# Jest-Allure2

An up to date Jest reporter that produces Allure 2 reports.

[![npm version](https://badge.fury.io/js/jest-allure2.svg)](https://badge.fury.io/js/jest-allure2)
![Continuous Integration](https://github.com/ryparker/jest-allure2/workflows/Continuous%20Integration/badge.svg)
![Continuous Deployment](https://github.com/ryparker/jest-allure2/workflows/Continuous%20Deployment/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/ryparker/jest-allure2/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ryparker/jest-allure2?targetFile=package.json)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Allure Report](https://user-images.githubusercontent.com/2823336/40350093-59cad576-5db1-11e8-8210-c4db3bf825a1.png)

Originally forked from [jest-allure](https://github.com/zaqqaz/jest-allure), this project uses the latest allure configuration `^2.0.0-beta.6`.

[Allure Framework](https://github.com/allure-framework/allure2) is a flexible lightweight multi-language test report tool that not only
shows a very concise representation of what have been tested in a neat web report form,
but allows everyone participating in the development process to extract maximum of useful
information from everyday execution of tests.

**Features:**

- Most robust Allure API currently available to Jest.

- Support for new attachment types that were not supported on previous versions.

- Allure result files are now JSON, replacing the legacy XML format.

## Requirements

| Resource                                                             | Description                                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Jest](https://jestjs.io/)                                           | A delightful JavaScript testing framework.                                                   |
| [Allure 2 CLI](https://github.com/allure-framework/allure2#download) | "A Java jar command line tool that turns Allure result files into beautiful Allure reports." |

## :rocket: Quick start

1. Add this package

```shell
yarn add --dev jest-allure2
```

2. Update `jest.setup.js`

```js
var { registerAllure } = require('jest-allure2')

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
describe('Number functions', () => {
	beforeEach('Setup', () => {
		allure.severity(Severity.Critical)
		allure.feature(Feature.Billing)
		allure.story('BILL-217')
	})

	test('sum performs addition functionality', () => {
		allure.description('Tests should be ran when billing functionality is changed.')

		allure.step('Two integers can be added together.', () => {
			allure.parameter('a', 3)
			allure.parameter('b', 4)
			expect(sum(3, 4)).toBe(7)
		})

		allure.step('Two floats can be added together', () => {
			allure.parameter('a', 3.141)
			allure.parameter('b', 2.571)
			expect(sum(3.141, 2.571)).toBe(5.712)
		})

		allure.step('Two objects can be added together', () => {
			const a = { a: 1 }
			const b = { b: 2 }

			allure.parameter('a', a)
			allure.parameter('b', b)
			expect(sum(a, b)).toMatchSnapshot()
		})
	})
})
```

## :gear: Options

The main export `registerAllure()` accepts three optional configuration arguments:

| Parameter       | Description                                                                         | Default            |
| --------------- | ----------------------------------------------------------------------------------- | ------------------ |
| resultsDir      | File path where result files are written.                                           | `"allure-results"` |
| environmentInfo | Key value pairs that will appear under the environment section of the Allure report | `{}`               |
| testMapper      | Decorator that receives Allure test result objects.                                 | `undefined`        |

```js
// jest.setup.js
var resultsDir = 'allure-results'
var environmentInfo = { Username: 'User-1331', password: 'password-1331' }
var testMapper = (results) => {
	if (result.status == Status.SKIPPED) {
		result.fullName = `(WAS SKIPPED) ${result.fullName}`
	}
	return result
}

registerAllure(resultsDir, environmentInfo, testMapper)
```
