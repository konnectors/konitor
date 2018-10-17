import { includes } from 'lodash'
import gitParser from 'git-url-parse'
import { getConnectors } from './registry'

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
  const repos = (await getConnectors())
    .filter(repo => repo.latest_version)
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
