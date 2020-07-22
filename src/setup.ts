import {JasmineAllureInterface, JasmineAllureReporter} from './reporter';

import {TestResult} from 'allure-js-commons';

export interface Global extends NodeJS.Global {
	allure: JasmineAllureInterface;
}

declare global {
	namespace NodeJS {
		interface Global {
			allure: JasmineAllureInterface;
		}
	}
}

const registerAllure = (
	resultsDir = 'allure-results',
	projectDir = process.cwd(),
	environmentInfo = {},
	testMapper?: ((test: TestResult) => TestResult | null) | undefined
) => {
	const reporter = new JasmineAllureReporter({
		resultsDir,
		testMapper,
		projectDir
	});
	(jasmine as any).getEnv().addReporter(reporter);

	global.allure = reporter.getInterface();

	if (environmentInfo) {
		global.allure.writeEnvironmentInfo(environmentInfo);
	}

	return reporter;
};

export {registerAllure};
export {};
