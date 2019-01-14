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
            return [{"login": "bill"}, {"login": "chris"}, {"login": "dave"}];
        } else if(username === "bob") {
            return [{"login": "ed"}, {"login": "frank"}, {"login": "graham"}, {"login": "harry"}];
        } else if(username === "carl") {
            return [{"login": "ed"}];
        } else if(username === "dan"){
            return [{"login": "carl"}, {"login": "ben"}];
        } else if(username === "user1") {
            return [{"login": "user2"}];
        } else if(username === "user2") {
            return [{"login": "user1"}];
        } else if(username === "user3") {
            return [{"login": "user1"}];
        } else {
            return [];
        }
    });
});

test('works one level deep', async () => {
    const data = await recursiveFollowers('abe');
    expect(data.login).toEqual("abe");
    expect(data.followers.sort(loginSort)).toEqual([
        {"login": "bill", "followers": []}, 
        {"login": "chris", "followers": []}, 
        {"login": "dave", "followers": []}
    ].sort(loginSort))
});

test('returns only 3 followers', async () => {
    const data = await recursiveFollowers('bob');
    expect(data.login).toEqual("bob");
    expect(data.followers.length).toBe(3);
});

test('works for less than 3 followers', async () => {
    const data = await recursiveFollowers('carl');
    expect(data.login).toEqual("carl");
    expect(data.followers).toEqual([{"login": "ed", "followers": []}]);
})

test('works recursively', async () => {
    const data = await recursiveFollowers('dan');
    expect(data.login).toEqual("dan");
    expect(data.followers.sort(loginSort)).toEqual([
        {"login": "carl", "followers": [{"login": "ed", "followers": []}]},
        {"login": "ben", "followers": []}
    ].sort(loginSort));
})

test('Eliminate follower loop', async () => {
    const data = await recursiveFollowers('user3');
    expect(data.followers).toEqual([
        {"followers": [{"followers": [], "login": "user2"}], "login": "user1"}
    ]);
})