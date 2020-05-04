import { JasmineAllureReporter } from 'allure-jasmine'
import { Allure, TestResult } from 'allure-js-commons'

declare global {
  const allure: Allure
}

const registerAllure = (
  resultsDir = 'allure-results',
  environmentInfo = {},
  testMapper?: ((test: TestResult) => TestResult | null) | undefined
) => {
  const reporter = new JasmineAllureReporter({
    resultsDir: resultsDir,
    testMapper: testMapper,
  })

  jasmine.getEnv().addReporter(reporter)

  const allure = reporter.getInterface()
  global['allure'] = allure

  if (environmentInfo) {
    allure.writeEnvironmentInfo(environmentInfo)
  }

  return reporter
}

export { registerAllure }
