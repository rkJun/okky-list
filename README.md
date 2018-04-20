# okky-list

[![npm version](https://badge.fury.io/js/okky-list.svg)](https://badge.fury.io/js/okky-list)
[![npm](https://img.shields.io/npm/dt/okky-list.svg)](https://www.npmjs.com/package/okky-list)


[`okky_trend`](https://github.com/rkJun/okky_trend) nodejs version.

A simple cli module that fetches latest article about developer's life on [OKKY](https://okky.kr)

### Installation

```
# Using npm
npm install --global okky-list

# Using yarn
yarn global add okky-list
```

## Usage of a command line tool

e.g.:

```
$ okky-list -h

  Usage: okky-list [options]

  Options:

    -v, --version          output the version number
    -l, --list [item]      add list filter by questions, tech, community, columns, jobs (default: community)
    -n, --number <number>  the last [number] lines allowed 1...20 (default: 20)
    -s, --sort [item]      order by id, voteCount, noteCount, scrapCount, viewCount
    -h, --help             output usage information

$ okky-list -l tech -n 3 -s viewCount
2004-08-09 02:36:49 [댓글:  35,좋아요:  0,조회:125k] okjsp site source v1.0 [kenu]
2007-08-19 17:55:12 [댓글:  11,좋아요:  0,조회:86k] [jsp] 초보를 위한 강좌 모음 [kenu]
2005-04-21 01:06:36 [댓글:  17,좋아요:  0,조회:79k] API / Spec / RFC 모음 - pistos님 버전 [kenu]

```

## Inspired

[git-trend](https://github.com/rochefort/git-trend).
