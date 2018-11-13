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
