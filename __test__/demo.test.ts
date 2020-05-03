describe('suite with story', () => {
  beforeEach(() => {
    allure.feature('feature-name')
    allure.story('story-name')
  })

  test('a test will be marked as a feature', () => {
    expect(1).toBe(1)
  })

  test('will be marked too', () => {
    expect(2).toBe(2)
  })
})

function sum(a: number, b: number): number {
  return a + b
}

describe('Testing examples', () => {
  test('Allure reporter annotations', () => {
    allure.epic('Unit Tests')
    allure.feature('Initial App Load')
    allure.story('Sagas')
    allure.severity('Critical')
    allure.owner('Blue Squad')
    allure.issue(
      'AWS-60',
      'https://globalvetlink.atlassian.net/browse/AWS-60?atlOrigin=eyJpIjoiNDYxNzM5NGQ3YzE1NDk3YjliZmFiNGZjOGNmZjUwOTEiLCJwIjoiaiJ9'
    )
    allure.tag('myTag')
    allure.description(
      'Pulvinar natoque cras dapibus ultrices sit egestas laoreet molestie fames, amet dictum placerat fringilla feugiat porttitor in dis, potenti at iaculis dignissim etiam a litora tellus. Etiam iaculis sapien magna suscipit, eros pellentesque. Euismod condimentum laoreet elementum venenatis pharetra tellus curabitur amet, class ultrices morbi sodales vestibulum facilisi consectetur volutpat, erat mattis potenti faucibus cum est nam.'
    )
    allure.parameter('a', '1')
    allure.parameter('b', '2')

    allure.step('Expect sum to be 3', () => {
      return expect(sum(1, 2)).toBe(3)
    })
  })

  test('Compares two objects using jest-diff', () => {
    allure.epic('Unit Tests')
    allure.feature('Initial App Load')
    allure.story('Sagas')
    allure.severity('Minor')

    const a = { a: { b: { c: 5 } } }
    const b = { a: { b: { c: 8 } } }

    allure.step('Expect objects to match', () => {
      return expect(a).toMatchObject(b)
    })
  })
})
