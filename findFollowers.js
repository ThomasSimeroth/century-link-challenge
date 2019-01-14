const request = require('request-promise')

findFollowers = async function(username) {
    uri = 'https://api.github.com/users/' + username + '/followers'
    const options = {
        uri: uri,
        headers: {
            'User-Agent': 'Thomas-Simeroth'
        },
        json: true
    };
    response = await request(options);
    return response[0];
}
module.exports = findFollowers;