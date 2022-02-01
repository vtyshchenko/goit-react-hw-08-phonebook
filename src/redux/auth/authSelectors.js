const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserName = state => state.auth.user.name;
const getIsFatchingCurrentUser = state => state.auth.isFatchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFatchingCurrentUser,
};

export default authSelectors;
