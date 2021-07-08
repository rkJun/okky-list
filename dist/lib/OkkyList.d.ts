import { OptionValues } from 'commander';
export default class OkkyList {
    constructor();
    getList: (optionValues: OptionValues) => Promise<string | undefined>;
    private parseHtml;
}
export declare const okkyList: OkkyList;
