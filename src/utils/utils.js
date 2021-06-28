function getCleanUser(user) {
    if (!user) return null;

    return {
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        age: user.age,
        gender: user.gender
    };
}

module.exports = {getCleanUser}