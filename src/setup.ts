import { JasmineAllureReporter } from 'allure-jasmine'
import { Allure, TestResult } from 'allure-js-commons'

export interface Global extends NodeJS.Global {
	allure: Allure
}

declare const global: Global
declare global {
	const allure: Allure
}

const registerAllure = (
	resultsDir = 'allure-results',
	environmentInfo = {},
	testMapper?: ((test: TestResult) => TestResult | null) | undefined,
) => {
	const reporter = new JasmineAllureReporter({
		resultsDir,
		testMapper,
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
