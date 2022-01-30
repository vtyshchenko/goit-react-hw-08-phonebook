const getIsLoggedIn = state => state.isLoggedIn;
const getUserName = state => state.user.name;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
};

export default authSelectors;
