const cheerio = require('cheerio');
const got = require('got');
const pad     = require('pad');

const BASE_HOST = 'https://okky.kr';
const BASE_URL = `${BASE_HOST}/articles/`;

let uri;

exports.getList = ({list, number, sort}, cb) => {

  uri = BASE_URL + list;

  if ( number < 1 || number > 20) {
    console.log ('Warning : Minimum count is 1, maximum count is 20, defauilt is 20');
    number = 20;
  }

  if ( sort ) {
    uri += `?query=&sort=${sort}&order=desc`;
  }

  return (async () => {
    try {
      const response = await got(uri);
      const result = parseHtml(number, response.body);
      return result;
    } catch (error) {
      console.log(error);
    }
  })();

};

function parseHtml(number, body) {
  let $ = cheerio.load(body);
  let output = '';

  $('.list-group-item').each(function (i, elem) {

    if (i >= number) {
      return false;
    }

    let title = $(elem).find('.list-group-item-heading').text().trim();
    let author = $(elem).find('.avatar-info .nickname').text().trim();
    let date = $(elem).find('span.timeago').text().trim();

    let commentCount = pad(3, $(elem).find('.list-group-item-summary li:nth-child(1)').text().trim());
    let likeCount = pad(3, $(elem).find('.list-group-item-summary li:nth-child(2)').text().trim());
    let readCount = pad(3, $(elem).find('.list-group-item-summary li:nth-child(3)').text().trim());

    output += [date, ` [댓글: ${commentCount},좋아요:${likeCount},조회:${readCount}] ${title} [${author}]\n`].join('');

    if (i === $('.list-group-item').length - 1) {
      return false;
    }
  });

  return output;
}

