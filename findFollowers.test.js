const findFollowers = require('./findFollowers');
const request = require('request-promise');

jest.mock('request');

beforeAll(() => {
    request.mockImplementation((options) => {
        if(options.uri === 'https://api.github.com/users/octocat/followers') {
            return [{"login": "bob"}]
        } else {
            return [{"login": "chris"}]
        }
    });
});

test('example test', async () => {
    const data = await findFollowers('octocat');
    expect(data).toEqual({"login": "bob"});
});