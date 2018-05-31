import fs from 'fs-extra'

export const getManifest = async path => {
  const manifest = await fs.readJson(`${path}/manifest.konnector`)

  return manifest
}

export const getFields = async path => {
  const manifest = await getManifest(path)

  const oldFormat =
    manifest.fields &&
    manifest.fields.account &&
    manifest.fields.account.accountFormat &&
    manifest.fields.account.accountFormat.split(',')

  if (oldFormat) {
    return oldFormat
  }

  const fields = []
  Object.keys(manifest.fields).forEach(k => {
    if (
      k !== 'advancedFields' &&
      (manifest.fields[k].isRequired === undefined ||
        manifest.fields[k].isRequired === true)
    ) {
      fields.push(k)
    }
  })

  return fields
}

export const getSlug = async path => {
  const manifest = await getManifest(path)

  return manifest.slug
}

/*
 * Get the doctype for each permission
 */
export const getDoctypes = async path => {
  const manifest = await getManifest(path)

  return Object.values(manifest.permissions)
    .map(perm => perm.type)
    .filter(doctype => !['io.cozy.files', 'io.cozy.accounts'].includes(doctype))
}
