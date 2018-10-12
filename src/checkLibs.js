import request from 'request-promise'
import gitParser from 'git-url-parse'
import _ from 'lodash'
import { execSync } from 'child_process'
import chalk from 'chalk'
import { getConnectors, getConnector } from './helpers/registry'

const checkLibs = async channel => {
  let result = 0

  const lastLibsVersion = getLastLibsVersion()
  const connectors = await getLibsVersions(channel)

  for (const connector of connectors) {
    const ok = lastLibsVersion === connector.libVersion
    if (!ok) result = 1
    let color = ok ? chalk.green : chalk.red

    const version = connector.libVersion
      ? connector.libVersion.split('.').map(Number)
      : 0
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

async function getLibsVersions(channel) {
  const connectorsRegistry = await getConnectors()

  const versions = []
  for (const connector of connectorsRegistry) {
    if (!connector.versions[channel]) {
      console.error(connector.slug, 'not found')
      continue
    }
    const longVersion = connector.versions[channel].pop()
    const registryDetails = await getConnector(connector.slug, longVersion)
    const source = registryDetails.manifest
      ? registryDetails.manifest.source
      : false
    const gitHash = registryDetails.url
      ? registryDetails.url
          .split('/')
          .pop()
          .split('.')
          .shift()
      : false
    if (!source) {
      console.error(connector.slug, 'not found')
      continue
    }
    const { owner, name } = gitParser(source)
    const config = await fetchPackageJson(owner, name, gitHash)
    const libVersion = config
      ? config &&
        config.dependencies &&
        config.dependencies['cozy-konnector-libs']
      : 'not found'

    versions.push({ slug: connector.slug, libVersion })
  }

  return _.sortBy(versions, semVerSort)
}

function semVerSort(connector) {
  if (!connector.libVersion) return 0
  const v = connector.libVersion.split('.').map(Number)
  return v[0] * 10000 + v[1] * 100 + v[2]
}

async function fetchPackageJson(organization, project, gitHash) {
  let config = {}
  try {
    config = await request(
      `https://raw.githubusercontent.com/${organization}/${project}/${gitHash}/package.json`,
      { json: true }
    )
  } catch (err) {
    // not found
  }
  return config
}

export default function(options) {
  return checkLibs(options.channel)
}
