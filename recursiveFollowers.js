findFollowers = require('./findFollowers');

recursiveFollowers = async function(username) {
    followerList = await findFollowers(username);
    foundUsers = 0;
    shortList = [];
    while(foundUsers < 3 && followerList.length != 0) {
        user = followerList.pop();
        shortList.push(user);
        foundUsers += 1;
    }
    result = {
        login: username,
        followers: shortList
    }
    return result
}

module.exports = recursiveFollowers;