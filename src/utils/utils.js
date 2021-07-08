function getCleanUser(user) {
  if (!user) return null;

  return {
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName,
    age: user.age,
    gender: user.gender,
    country: user.country,
    state: user.state,
    organization: user.organization,
    phone: user.phone,
    userType: user.userType,
  };
}

module.exports = { getCleanUser };
