import { okkyList } from '../lib/OkkyList';
import { OptionValues } from 'commander';

describe('okkyList test', () => {

  // jest.setTimeout(10000);
  const optionValues: OptionValues = {};

  test('getList no option', async () => {

    const list = await okkyList.getList(optionValues);

    expect(typeof list).toBe('string');
  });

  test('getList -l community', async () => {

    optionValues.list = 'community';
    const list = await okkyList.getList(optionValues);

    expect(typeof list).toBe('string');
  });

  test('getList -n 10', async () => {

    optionValues.number = 10;
    const list = await okkyList.getList(optionValues);

    expect(typeof list).toBe('string');
  });

  test('getList -s viewCount', async () => {

    optionValues.sort = 'viewCount';
    const list = await okkyList.getList(optionValues);

    expect(typeof list).toBe('string');
  });
});
