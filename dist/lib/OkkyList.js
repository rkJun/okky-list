"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.okkyList = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const got_1 = __importDefault(require("got"));
const pad_1 = __importDefault(require("pad"));
const BASE_HOST = 'https://okky.kr';
const BASE_URL = `${BASE_HOST}/articles/`;
let uri;
class OkkyList {
    constructor() {
        this.getList = (optionValues) => {
            let { list, number, sort } = optionValues;
            uri = BASE_URL + list;
            if (number < 1 || number > 20) {
                console.log('Warning : Minimum count is 1, maximum count is 20, defauilt is 20');
                number = 20;
            }
            if (sort) {
                uri += `?query=&sort=${sort}&order=desc`;
            }
            return (async () => {
                try {
                    const response = await got_1.default(uri);
                    const result = this.parseHtml(number, response.body);
                    return result;
                }
                catch (error) {
                    console.log(error);
                }
            })();
        };
    }
    parseHtml(number, body) {
        let $ = cheerio_1.default.load(body);
        let output = '';
        $('.list-group-item').each(function (i, elem) {
            if (i >= number) {
                return false;
            }
            let title = $(elem).find('.list-group-item-heading').text().trim();
            let author = $(elem).find('.avatar-info .nickname').text().trim();
            let date = $(elem).find('span.timeago').text().trim();
            let commentCount = pad_1.default(3, $(elem).find('.list-group-item-summary li:nth-child(1)').text().trim());
            let likeCount = pad_1.default(3, $(elem).find('.list-group-item-summary li:nth-child(2)').text().trim());
            let readCount = pad_1.default(3, $(elem).find('.list-group-item-summary li:nth-child(3)').text().trim());
            output += [
                date,
                ` [댓글: ${commentCount},좋아요:${likeCount},조회:${readCount}] ${title} [${author}]\n`,
            ].join('');
            if (i === $('.list-group-item').length - 1) {
                return false;
            }
        });
        return output;
    }
}
exports.default = OkkyList;
exports.okkyList = new OkkyList();
//# sourceMappingURL=OkkyList.js.map