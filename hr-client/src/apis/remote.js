import axios from "axios";
import { BASE_URL } from "../../env";

const request = (method, route, data, params, headers) =>
    axios.request({
        method, url: `${BASE_URL}${route}`, data, params, headers, withCredentials: false
    })
        .then((res) => res.status === 204 ? [] : res.data)
        .catch((err) => { console.error("Error:", err); throw err; });

const remote = {
    // Auth related
    login: (email, password) =>
        request("POST", "login", { email, password }),

    logout: () =>
        request("POST", "users/logout"),

    getProfile: () =>
        request("GET", "users/me"),

    // Employees only
    getEmployees: (page = 1) =>
        request("GET", `employees/get-employees?page=${page}`),

    getEmployeeById: (id) =>
        request("GET", `employees/get-employee-by-id/${id}`),

    addOrUpdateEmployee: (id, data) =>
        request("POST", `employees/add-update-employee/${id}`, data),

    deleteEmployee: (id) =>
        request("POST", `employees/delete-employee/${id}`),
    getPayrolls: (page = 1, perPage = 10) =>
        request("GET", `payrolls?page=${page}&per_page=${perPage}`),

    markAsPaid: (payrollId) =>
        request("PUT", `payrolls/${payrollId}/pay`),

    createPayroll: (data) =>
        request("POST", "payrolls", data),

    updatePayroll: (id, data) =>
        request("PUT", `payrolls/${id}`, data),

    deletePayroll: (id) =>
        request("DELETE", `payrolls/${id}`)
};

export default remote;