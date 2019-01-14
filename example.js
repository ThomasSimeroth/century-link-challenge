recursiveFollowers = require('./recursiveFollowers');

recursiveFollowers("octocat").then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})