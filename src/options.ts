import * as core from '@actions/core'

export interface Options {
  project: string
  ignoreAuthor: string[]
  ignoreHead: string[]
}

export function getInput(): Options {
  const project = core.getInput('project', {required: true})
  const ignoreAuthor = core.getInput('ignore-author').split(',')
  const ignoreHead = core.getInput('ignore-head').split(',')

  return {
    project,
    ignoreAuthor,
    ignoreHead
  }
}
