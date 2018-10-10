import request from 'request-promise'
import gitParser from 'git-url-parse'
import _ from 'lodash'
import { execSync } from 'child_process'
import chalk from 'chalk'

const checkLibs = async () => {
  let result = 0

  const lastLibsVersion = getLastLibsVersion()
  const connectors = await getLibsVersions()

  for (const connector of connectors) {
    const ok = lastLibsVersion === connector.libVersion
    if (!ok) result = 1
    let color = ok ? chalk.green : chalk.red

    const version = connector.libVersion.split('.').map(Number)
    const libVersion = lastLibsVersion.split('.').map(Number)
    if (!ok && version[0] === libVersion[0] && version[1] === libVersion[1]) {
      color = chalk.yellow
    }
    if (version) console.log(`${connector.slug} ${color(connector.libVersion)}`)
  }

  return result
}

function getLastLibsVersion() {
  const version = JSON.parse(
    execSync('npm info cozy-konnector-libs --json', {
      encoding: 'utf-8'
    })
  ).version
  return version
}

async function getLibsVersions() {
  const connectorsRegistry = (await request.get(
    'https://apps-registry.cozycloud.cc/registry?limit=10000',
    { json: true }
  )).data.filter(repo => repo.latest_version && repo.type === 'konnector')

  const versions = []
  for (const connector of connectorsRegistry) {
    const { version, source } = connector.latest_version.manifest
    if (!source) {
      console.error(connector.slug, 'not found')
      continue
    }
    const { owner, name } = gitParser(source)
    const config = await fetchPackageJson(owner, name, version)
    const libVersion = config
      ? config.dependencies['cozy-konnector-libs']
      : 'not found'

    versions.push({ slug: connector.slug, libVersion })
  }

  return _.sortBy(versions, connector => {
    const v = connector.libVersion.split('.').map(Number)
    return v[0] * 10000 + v[1] * 100 + v[2]
  })
}

async function fetchPackageJson(organization, project, version) {
  let config
  try {
    config = await request(
      `https://raw.githubusercontent.com/${organization}/${project}/${version}/package.json`,
      { json: true }
    )
  } catch (err) {
    try {
      config = await request(
        `https://raw.githubusercontent.com/${organization}/${project}/v${version}/package.json`,
        { json: true }
      )
    } catch (err) {
      return false
    }
  }
  return config
}

export default function(options) {
  return checkLibs(options.repositories)
}
