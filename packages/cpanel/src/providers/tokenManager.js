// inMemoryJwt.js
const tokenManager = () => {
  const getToken = () => sessionStorage.getItem("token");

  const setToken = (t) => {
    sessionStorage.setItem("token", t);
    return true;
  };

  const ereaseToken = () => {
    sessionStorage.removeItem("token");
    return true;
  };

  return {
    ereaseToken,
    getToken,
    setToken,
  };
};

export default tokenManager();
