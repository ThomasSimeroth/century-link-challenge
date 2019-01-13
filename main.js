let request = require('request')
let req = request.defaults({
    headers: {
        'User-Agent': 'Thomas-Simeroth'
    }
});

req('https://api.github.com/users/octocat/followers', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    json = JSON.parse(body)
    console.log('body:', json);
}, )