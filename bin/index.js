#!/usr/bin/env node

const program  = require('commander');
const pjson    = require('../package.json');
const okkyList = require('../lib/okky-list');

program
  .version(`okky-list ${pjson.version}`, '-v, --version')
  .usage('[options]')
  .option('-l, --list [item]', 'add list filter by questions, tech, community, columns, jobs', /^(questions|tech|community|columns|jobs)$/i, 'community')
  .option('-n, --number <number>', 'the last [number] lines allowed 1...20', 20)
  .option('-s, --sort [item]', 'order by id, voteCount, noteCount, scrapCount, viewCount', 'id')
  .parse(process.argv);

okkyList.getList(program, (result) => {
  console.log( result );
});