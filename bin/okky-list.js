#!/usr/bin/env node

const cheerio = require('cheerio');
const request = require('request');
const pad     = require('pad');
const program = require('commander');

const BASE_HOST = 'https://okky.kr';
const BASE_URL = `${BASE_HOST}/articles/`;

program
  .version('okky-list 1.1.0', '-v, --version')
  .usage('[options]')
  .option('-l, --list [item]', 'add list filter by questions, tech, community, columns, jobs', /^(questions|tech|community|columns|jobs)$/i, 'community')
  .option('-n, --number <number>', 'the last [number] lines allowed 1...20', 20)
  .option('-s, --sort [item]', 'order by id, voteCount, noteCount, scrapCount, viewCount')
  .parse(process.argv);

let uri = BASE_URL;
if( program.list ) {
  uri += program.list;
}

if ( program.number < 0 || program.number > 20) {
  console.log ('Warning : Minimum count is 0, maximum count is 20, defauilt is 20');
}

if ( program.sort ) {
  uri += `?query=&sort=${program.sort}&order=desc`;
}

request(uri, function(error, response, html){
  if (error) {throw error; };

  let $ = cheerio.load(html);

  $('.list-group-item').each(function(i, elem) {

    if ( i >= program.number ) {
        return false;
    }
    let title = $(elem).find('.list-group-item-heading').text().trim();
    let author = $(elem).find('.avatar-info .nickname').text().trim();
    let date = $(elem).find('span.timeago').text().trim();

    let commentCount = pad(3, $(elem).find('.list-group-item-summary li:nth-child(1)').text().trim() );
    let likeCount    = pad(3, $(elem).find('.list-group-item-summary li:nth-child(2)').text().trim() );
    let readCount    = pad(3, $(elem).find('.list-group-item-summary li:nth-child(3)').text().trim() );

    let output = [date, ` [댓글: ${commentCount},좋아요:${likeCount},조회:${readCount}] ${title} [${author}]`].join('');
    console.log ( output );

  });

});
