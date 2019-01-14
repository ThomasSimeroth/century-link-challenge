findFollowers = require('./findFollowers');

recursiveFollowers = async function(username, depth = 3) {
    if(depth <= 0)  {
        return {login: username, followers: shortList};
    }
    let followerList = await findFollowers(username);
    let foundUsers = 0;
    let shortList = [];
    let userFollowers = [];
    while(foundUsers < 3 && followerList.length > 0) {
        user = followerList.pop();
        userFollowers = await recursiveFollowers(user.login, depth - 1);
        shortList = shortList.concat([userFollowers]);
        foundUsers += 1;
    }
    result = {
        login: username,
        followers: shortList
    }
    return result
}
module.exports = recursiveFollowers;