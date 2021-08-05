// in authProvider.js
import tokenManager from "./tokenManager";
import { API_URL } from "../App";
const authProvider = {
  login: ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/admin/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => tokenManager.setToken(token));
  },
  logout: () => {
    tokenManager.ereaseToken();
    return Promise.resolve();
  },

  checkAuth: () => {
    return tokenManager.getToken() ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      tokenManager.ereaseToken();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    return tokenManager.getToken() ? Promise.resolve() : Promise.reject();
  },
};

export default authProvider;
