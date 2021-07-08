#!/usr/bin/env node

import { program, OptionValues } from 'commander';
import * as pjson from './package.json';
import { okkyList } from './lib/OkkyList';

program
  .version(`okky-list ${pjson.version}`, '-v, --version')
  .usage('[options]')
  .option('-l, --list [item]', 'add list filter by questions, tech, community, columns, jobs', 'community')
  .option('-n, --number <number>', 'the last [number] lines allowed 1...20', '20')
  .option('-s, --sort [item]', 'order by id, voteCount, noteCount, scrapCount, viewCount', 'id')
  .parse(process.argv);

const optionValues: OptionValues = {
  list: program.getOptionValue('list'),
  number: program.getOptionValue('number'),
  sort: program.getOptionValue('sort')
}

okkyList.getList(optionValues).then(result => {
  console.log(result);
  process.exit(0);
});