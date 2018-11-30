import axios from "axios";

export const loginWithUsernameAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/login`, {
        username,
        password
      })
      .then(response => resolve(response.data.data))
      .catch(err => reject(err));
  });
};

export const getSubscriptions = (userId, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/subscriptions.get`, {
        headers: {
          "X-Auth-Token": authToken,
          "X-User-Id": userId,
          "Content-type": "application/json"
        }
      })
      .then(response => resolve(response.data.update))
      .catch(err => reject(err));
  });
};

// TODO: build system for managing multiple rocket-chat servers
const API_URL = "https://chat.opensocial.me/api/v1";

export const getUserCredentials = async () => {
  try {
    const userId = await getCookieValue("rc_uid", "chat.opensocial.me");
    const authToken = await getCookieValue("rc_token", "chat.opensocial.me");
    return { userId, authToken };
  } catch (e) {
    return null;
  }
};

const getCookieValue = (cookieName, domain) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ name: cookieName }, cookies => {
      let c = cookies && cookies.find(c => c.domain === domain);
      c && c.value ? resolve(c.value) : reject("cookie not found");
    });
  });
};
