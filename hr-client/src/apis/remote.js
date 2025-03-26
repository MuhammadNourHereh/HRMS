import axios from "axios";
import { BASE_URL } from "../../env";

const request = (method, route, data, params, headers) =>
    axios.request({ method, url: `${BASE_URL}${route}`, data, params, headers })
        .then((res) => res.status === 204 ? [] : res.data)
        .catch((err) => { console.error("Error:", err); throw err; });

const remote = {
    request,
    // TODO this apis maybe need some edit
    login: (username, password) => request("POST", "login", { username, password }),
    signup: (username, firstname, lastname, password) => request("POST", "signup", { username, firstname, lastname, password }),
    logout: (token) => request("POST", 'logout', null, null, { Authorization: `Bearer ${token}` }),
    getUserProfile: () => request("GET", "/user"),
};

export default remote;