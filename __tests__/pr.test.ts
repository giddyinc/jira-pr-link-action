import {PullRequestEvent, PushEvent} from '@octokit/webhooks-definitions/schema'
import {validate} from '../src/pr'
import {pr} from '../src/mock/pull_request_mock'
import {Options} from '../src/options'

let options: Options
let mock: PullRequestEvent

beforeEach(() => {
  mock = JSON.parse(JSON.stringify(pr))

  options = {project: 'SRENEW', ignoreAuthor: []}
})

test('invalid PR', async () => {
  expect(validate(pr, options)).toEqual(false)
})

test('valid PR title', async () => {
  mock.pull_request.title =
    'Update the README with new information | SRENEW-1234'

  expect(validate(mock, options)).toEqual(true)
})

test('valid PR description', async () => {
  mock.pull_request.title =
    'Update the README with new information'
  mock.pull_request.body =
    'Update the README with new information | SRENEW-1234'

  expect(validate(mock, options)).toEqual(true)
})

test('valid PR with multiple projects', async () => {
  options.project = 'SRENEW,DEVOPS,CR';
  mock.pull_request.title =
    'Update the README with new information'
  mock.pull_request.body =
    'Update the README with new information | DEVOPS-1234'

  expect(validate(mock, options)).toEqual(true)
})

test('valid PR branch', async () => {
  mock.pull_request.head.ref = 'foo-SRENEW-1234'

  expect(validate(mock, options)).toEqual(true)
})

test('works with regex options', async () => {
  mock.pull_request.head.ref = 'foo-FOO-1234'
  options.project = '[SRENEW|FOO]'

  expect(validate(mock, options)).toEqual(true)
})

test('valid if ignoreAuthor matches', async () => {
  options.ignoreAuthor = ['dependabot[bot]']
  mock.pull_request.user.login = 'dependabot[bot]'

  expect(validate(mock, options)).toEqual(true)
})
