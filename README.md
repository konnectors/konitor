# konitor

[![license](https://img.shields.io/github/license/konnectors/konitor.svg?style=flat-square)](https://github.com/konnectors/konitor/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/konnectors/konitor/status.svg?style=flat-square)](https://david-dm.org/konnectors/konitor)
[![GitHub tag](https://img.shields.io/github/tag/konnectors/konitor.svg?style=flat-square)](https://github.com/konnectors/konitor/releases)
[![npm](https://img.shields.io/npm/v/konitor.svg?style=flat-square)](https://www.npmjs.com/package/konitor)
[![Build Status](https://travis-ci.org/konnectors/konitor.svg?branch=master&style=flat-square)](https://travis-ci.org/konnectors/konitor)

> konitor, the command-line tool for monitoring konnectors

## Install

Install `konitor` using yarn.

```
$ yarn global add konitor
```

If you cannot execute `konitor` after this command, it may be because you do not
have the directory where `yarn` stores its symbolic links in your `PATH`. Edit
it to append the result of `yarn global bin`.

In case it still doesn't work (e.g. because for whatever reason the installed
package doesn't have a `dist/` directory), you can build and install it locally:

```
$ git clone https://github.com/konnectors/konitor.git
$ yarn
$ yarn build
$ yarn global add file:$PWD
```

You can also install the latest stable version with `yarn global add konitor`, but
you may miss some recent changes.

## CLI

- [Manpages of the command-line tool](./docs/cli.md)

## Inspiration

- https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkonnectors%2Fkonitor.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkonnectors%2Fkonitor?ref=badge_large)
