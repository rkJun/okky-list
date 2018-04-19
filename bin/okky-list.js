#!/usr/bin/env node

const cheerio = require('cheerio');
const request = require('request');
const pad = require('pad');


const BASE_HOST = 'https://okky.kr';
const BASE_URL = `${BASE_HOST}/articles/community?query=&sort=id&order=desc`;

request(BASE_URL, function(error, response, html){
  if (error) {throw error; };

  let $ = cheerio.load(html);

  $('.list-group-item').each(function(i, elem) {

    let title = $(elem).find('.list-group-item-heading').text().trim();
    let author = $(elem).find('a.nickname').text().trim();
    let date = $(elem).find('span.timeago').text().trim();

    let commentCount = pad(3, $(elem).find('.list-group-item-summary li:nth-child(1)').text().trim() );
    let likeCount    = pad(3, $(elem).find('.list-group-item-summary li:nth-child(2)').text().trim() );
    let readCount    = pad(3, $(elem).find('.list-group-item-summary li:nth-child(3)').text().trim() );

    let output = [date, ` [댓글: ${commentCount},좋아요:${likeCount},조회:${readCount}] ${title} [${author}]`].join('');
    console.log ( output );

  });

});
