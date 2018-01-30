# konitor

[![license](https://img.shields.io/github/license/konnectors/konitor.svg?style=flat-square)](https://github.com/konnectors/konitor/blob/master/LICENSE)

> Tools to check health of konnectors

## Help

```
$ yarn start --help

Usage: index.js <command> [options]

Commands:
index.js pulls        Pull all konnectors
index.js test <name>  Test a konnector
index.js interactive  Launch interactive mode                        [default]

Options:
--help     Show help                                                 [boolean]
--version  Show version number                                       [boolean]
```

## Pulls all konnectors

```
$ yarn start pulls

Pull all konnectors:

- ✅  cozy-konnector-ameli: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-bouyguesbox: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-bouyguestelecom: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-digiposte: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-free: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-free-mobile: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-harmonie: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-maif: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-malakoffmederic: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-materielnet: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-mgen: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-numericable: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-orange: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-orangevod: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-sosh: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-sfrbox: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-sfrmobile: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-redbox: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-redmobile: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-trainline: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-uber: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-sncf: {"changes":0,"insertions":0,"deletions":0}
- ✅  cozy-konnector-virgin-mobile: {"changes":0,"insertions":0,"deletions":0}
```

## Test a konnector

```
$ yarn start test ameli

Test konnector ameli:

 - ✅  repository is up to date.
 - ✅  dependencies is installed.
 - ✅  repository is clean.
? What's 'login' for konnector 'ameli'? 18**********
? What's 'password' for konnector 'ameli'? [hidden]
 - ✅  Correctly logged in.
 - ✅  PDF is imported.
 - ✅  repository is clean.
```

## Interactive mode

```
$ yarn start

? What do you want to do? (Use arrow keys)
❯ Test a konnector
  Pull all konnectors
  Quit
```

## Inspiration

- https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
