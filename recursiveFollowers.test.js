jest.mock('./findFollowers');

findFollowers = require('./findFollowers');
recursiveFollowers = require('./recursiveFollowers');

beforeAll(() => {
    loginSort = function(a, b) {
        alogin = a.login.toUpperCase();
        blogin = b.login.toUpperCase();
        if(alogin < blogin) {
            return -1;
        } else if(alogin > blogin) {
            return 1;
        } else {
            return 0;
        }
    }

    findFollowers.mockImplementation((username) => {
        if(username === "abe") {
            return [{"login": "bob"}, {"login": "chris"}, {"login": "dave"}];
        } else if(username === "bob") {
            return [{"login": "ed"}, {"login": "frank"}, {"login": "graham"}, {"login": "harry"}];
        } else {
            return [];
        }
    });
});

test('works one level deep', async () => {
    const data = await recursiveFollowers('abe');
    expect(data.login).toEqual("abe");
    expect(data.followers.sort(loginSort)).toEqual([{"login": "bob"}, {"login": "chris"}, {"login": "dave"}].sort(loginSort))
});

test('returns only 3 followers', async () => {
    const data = await recursiveFollowers('bob');
    expect(data.login).toEqual("bob");
    expect(data.followers.length).toBe(3);
})