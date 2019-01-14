findFollowers = require('./findFollowers');

recursiveFollowers = async function(username, depth = 3, foundList = []) {
    if(depth <= 0)  {
        return {login: username, followers: []};
    }
    let followerList = await findFollowers(username);
    let foundUsers = 0;
    let shortList = [];
    let userFollowers = [];
    foundList.push(username);
    while(foundUsers < 3 && followerList.length > 0) {
        user = followerList.pop();
        if(!foundList.includes(user.login)) {
            foundList.push(user.login);
            userFollowers = await recursiveFollowers(user.login, depth - 1, foundList);
            shortList = shortList.concat([userFollowers]);
            foundUsers += 1;
        }
    }
    result = {
        login: username,
        followers: shortList
    }
    return result
}
module.exports = recursiveFollowers;