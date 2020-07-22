// @ts-nocheck
const {Severity} = require('allure-js-commons');

const Feature = {
	BILLING: 'billing'
};

function sum(a, b) {
	return a + b;
}

describe('README Examples', () => {
	beforeEach(() => {
		allure.severity(Severity.CRITICAL);
		allure.feature(Feature.BILLING);
		allure.story('BILL-217');
		allure.owner('Blue Squad');
		allure.tag('Sprint-2/22/2020');
	});

	test('sum performs addition functionality', () => {
		allure.description(
			'Tests should be ran when billing functionality is changed.'
		);

		allure.step('Two integers can be added together.', () => {
			allure.parameter('a', '3');
			allure.parameter('b', '4');
			expect(sum(3, 4)).toBe(7);
		});

		allure.step('Two floats can be added together', () => {
			allure.parameter('a', ' 3.141');
			allure.parameter('b', '2.571');
			expect(sum(3.141, 2.571)).toBe(5.712);
		});
	});
});
