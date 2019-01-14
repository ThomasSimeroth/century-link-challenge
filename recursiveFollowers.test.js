const findFollowers = require('./findFollowers');

jest.mock('findFollowers');

beforeAll(() => {
    findFollowers.mockImplementation((username) => {
        if(username === "abe") {
            return [{"login": "bob"}, {"login": "chris"}, {"login": "dave"}];
        } else {
            return [];
        }
    });
});

test('works one level deep', async () => {
    const data = await findFollowers('abe');
    expect(data).toEqual([{"login": "bob"}, {"login": "chris"}, {"login": "dave"}]);
});