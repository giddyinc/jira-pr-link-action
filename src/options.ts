import * as core from '@actions/core'

export interface Options {
  project: string
  ignoreAuthor: string[]
  ignoreHead: string[]
  ignoreTitle: string[]
}

export function getInput(): Options {
  const project = core.getInput('project', {required: true})
  const ignoreAuthor = core.getInput('ignore-author').split(',')
  const ignoreHead = core.getInput('ignore-head').split(',')
  const ignoreTitle = core.getInput('ignore-title').split(',')

  return {
    project,
    ignoreAuthor,
    ignoreHead,
    ignoreTitle,
  }
}
