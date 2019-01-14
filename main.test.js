const findFollowers = require('./main');

test('example test', async () => {
    const data = await findFollowers();
    expect(data).toBe(true);
})