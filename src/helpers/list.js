import { includes } from 'lodash'
import request from 'request-promise'
import gitParser from 'git-url-parse'

const PROVIDER_GITHUB = 'github.com'
const PROVIDER_GITLAB = 'gitlab.cozycloud.cc'

export const parsingRepository = url => {
  const parsed = gitParser(url)
  return {
    provider: parsed.resource === PROVIDER_GITHUB ? 'Github' : 'Gitlab',
    owner: parsed.owner,
    repoName: parsed.name,
    url
  }
}

export const getRepositories = async (provider = '') => {
  const repos = (await request.get(
    'https://apps-registry.cozycloud.cc/registry?limit=10000',
    { json: true }
  )).data
    .filter(repo => repo.latest_version && repo.type === 'konnector')
    .map(repo => repo.latest_version.manifest.source.split('#').shift())
  const list = []

  for (const repo of repos) {
    if (includes(repo, provider)) {
      list.push(parsingRepository(repo))
    }
  }

  return list
}

export const getGithubRepositories = () => {
  return getRepositories(PROVIDER_GITHUB)
}

export const getGitlabRepositories = () => {
  return getRepositories(PROVIDER_GITLAB)
}
