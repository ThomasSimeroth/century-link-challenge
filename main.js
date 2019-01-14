let request = require('request-promise')
var options = {
    uri: 'https://api.github.com/users/octocat/followers',
    headers: {
        'User-Agent': 'Thomas-Simeroth'
    },
    json: true
};

findFollowers = async function() {
    response = await request(options);
    return response;
}
module.exports = findFollowers;