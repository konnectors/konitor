import CLI from 'clui'
import { spawn } from 'child_process'
import { isInteractive } from './interactive'

const getPackage = path => {
  const pkg = require(`${path}/package.json`)

  return pkg
}

export const getRepository = path => {
  const pkg = getPackage(path)

  return pkg.repository && pkg.repository.url
}

export const getVersion = async path => {
  const pkg = getPackage(path)

  return pkg.version
}

export const getLibVersion = (path, lib) => {
  const pkg = getPackage(path)

  return pkg.dependencies[lib] || pkg.devDependencies[lib]
}

export const hasCmd = (path, cmd) => {
  const pkg = getPackage(path)

  return !!pkg.scripts[cmd]
}

export const launchCmd = async (path, params, spinnerMsg) => {
  const Spinner = CLI.Spinner
  const status = new Spinner(spinnerMsg)

  if (isInteractive()) {
    status.start()
  } else {
    console.log(` ${spinnerMsg}`)
  }

  const result = { stdout: [], stderr: [] }
  const cmd = await spawn('yarn', params, { cwd: path, encoding: 'utf8' })
  cmd.stdout.on('data', data => result.stdout.push(data.toString()))
  cmd.stderr.on('data', data => result.stderr.push(data))
  return new Promise(resolve => {
    cmd.on('close', code => {
      result.code = code
      if (isInteractive()) status.stop()
      resolve(result)
    })
  })
}
