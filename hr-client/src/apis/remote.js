import axios from "axios";
import { BASE_URL } from "../../env";

const request = (method, route, data, params, headers) =>
    axios.request({ method, url: `${BASE_URL}${route}`, data, params, headers,withCredentials: false
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
            getEmployees: (page = 1 ) => 
                request("GET", `employees/get-employees?page=${page}`),
            
            getEmployeeById: (id) => 
                request("GET", `employees/get-employee-by-id/${id}`),
            
            addOrUpdateEmployee: (id, data) => 
                request("POST", `employees/add-update-employee/${id}`, data),
            
            deleteEmployee: (id) => 
                request("POST", `employees/delete-employee/${id}`)
        };

export default remote;