import { JasmineAllureInterface, JasmineAllureReporter } from './reporter'

import { TestResult } from 'allure-js-commons'

export interface Global extends NodeJS.Global {
	allure: JasmineAllureInterface
}

declare const global: Global
declare global {
	const allure: JasmineAllureInterface
}

const registerAllure = (
	resultsDir = 'allure-results',
	projectDir = process.cwd(),
	environmentInfo = {},
	testMapper?: ((test: TestResult) => TestResult | null) | undefined,
) => {
	const reporter = new JasmineAllureReporter({
		resultsDir,
		testMapper,
		projectDir,
	})

	jasmine.getEnv().addReporter(reporter)

	const allure = reporter.getInterface()
	global.allure = allure

	if (environmentInfo) {
		allure.writeEnvironmentInfo(environmentInfo)
	}

	return reporter
}

export { registerAllure }
