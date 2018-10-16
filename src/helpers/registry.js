import request from 'request-promise'

const BASE_URL = 'https://apps-registry.cozycloud.cc'

export const getConnectors = async () => {
  return (await request.get(`${BASE_URL}/registry?limit=10000`, {
    json: true
  })).data.filter(repo => repo && repo.type === 'konnector')
}

export const getConnector = async (slug, version) => {
  const url = `${BASE_URL}/registry/${slug}${version ? '/' + version : ''}`
  return request.get(url, { json: true })
}
