import axios from "axios";
import { BASE_URL } from "../../env";

const request = (method, route, data, params, headers) =>
    axios
        .request({
            method,
            url: `${BASE_URL}${route}`,
            data,
            params,
            headers,
            withCredentials: false,
        })
        .then((res) => (res.status === 204 ? [] : res.data))
        .catch((err) => {
            console.error("Error:", err);
            throw err;
        });

const remote = {
    // Auth related
    login: (email, password) => request("POST", "login", { email, password }),

    logout: () => request("POST", "users/logout"),

    getProfile: () => request("GET", "users/me"),

    // Departments
    getDepartments: () => request("GET", `departments`),

    // Positions 
    getPositions: () => request("GET", `positions`),

    // Employees
    getEmployees: (page = 1) =>
        request("GET", `employees/get-employees?page=${page}`),

    getEmployeeById: (id) => request("GET", `employees/get-employee-by-id/${id}`),

    addOrUpdateEmployee: (id, data) =>
        request("POST", `employees/add-update-employee/${id}`, data),

    deleteEmployee: (id) => request("POST", `employees/delete-employee/${id}`),

    // Review Cycles
    getReviewCycles: (page = 1) =>
        request("GET", `review-cycles/get-review-cycles?page=${page}`),

    getReviewCycleById: (id) =>
        request("GET", `review-cycles/get-review-cycle-by-id/${id}`),

    addOrUpdateReviewCycle: (id, data) =>
        request("POST", `review-cycles/add-update-review-cycle/${id}`, data),

    deleteReviewCycle: (id) =>
        request("POST", `review-cycles/delete-review-cycle/${id}`),

    
    getPayrolls: (page = 1, perPage = 10) =>
        request("GET", `payrolls?page=${page}&per_page=${perPage}`),

    markAsPaid: (payrollId) =>
        request("PUT", `payrolls/${payrollId}/pay`),

    createPayroll: (data) =>
        request("POST", "payrolls", data),

    updatePayroll: (id, data) =>
        request("PUT", `payrolls/${id}`, data),

    deletePayroll: (id) =>
        request("DELETE", `payrolls/${id}`),
   
 // Performance Reviews
 getPerformanceReviews: (page = 1) =>
    request("GET", `performance-reviews/get-performance-reviews?page=${page}`),
    
  getPerformanceReviewById: (id) =>
    request("GET", `performance-reviews/get-performance-review-by-id/${id}`),
    
  addOrUpdatePerformanceReview: (id, data) =>
    request("POST", `performance-reviews/add-update-performance-review/${id}`, data),
    
  deletePerformanceReview: (id) =>
    request("POST", `performance-reviews/delete-performance-review/${id}`),
    
  getEmployeePerformanceReviews: (employeeId) =>
    request("GET", `performance-reviews/get-employee-performance-reviews/${employeeId}`),


   // Candidates
   getCandidates: (page = 1) =>
    request("GET", `candidates?page=${page}`),

   getAcceptedCandidates: (page = 1) => 
    request("GET", `candidates/accepted-candidates?page=${page}`),

  getCandidateById: (id) => 
    request("GET", `candidates/${id}`),

  addOrUpdateCandidate: (id, data) => 
    request("POST", `candidates/${id}`, data),

  deleteCandidate: (id) => 
    request("DELETE", `candidates/${id}`),

  updateCandidateStatus: (id, statusData) => 
    request("PUT", `candidates/${id}/status`, statusData),

  getCandidatesByStatus: (status, page = 1) => 
    request("GET", `candidates/status/${status}?page=${page}`),

  // Onboarding Tasks
  getOnboardingTasks: (page = 1) => 
    request("GET", `onboarding-tasks?page=${page}`),

  getOnboardingTaskById: (id) => 
    request("GET", `onboarding-tasks/${id}`),

  addOrUpdateOnboardingTask: (id, data) => 
    request("POST", `onboarding-tasks/${id}`, data),

  deleteOnboardingTask: (id) => 
    request("DELETE", `onboarding-tasks/${id}`),

  assignTaskToEmployee: (data) => 
    request("POST", `onboarding-tasks/assign`, data),

  updateTaskStatus: (id, statusData) => 
    request("PUT", `onboarding-tasks/status/${id}`, statusData),

  getEmployeeOnboardingTasks: (employeeId) => 
    request("GET", `onboarding-tasks/employee/${employeeId}`),
    
  createOnboardingTemplate: (data) => 
    request("POST", `onboarding-tasks/template`, data),

  applyTemplateToEmployee: (data) => 
    request("POST", `onboarding-tasks/template/apply`, data),

  getEmployeeOnboardingProgress: (employeeId) => 
    request("GET", `onboarding-tasks/progress/${employeeId}`),

  // projects
  
getProjects: (page = 1) =>
  request("GET", `projects?page=${page}`),

addOrUpdateProject: (id, data) =>
  request("POST", `projects/${id}`, data),

// Tasks
getTasks: (page = 1) =>
    request("GET", `tasks?page=${page}`),
    
  getTaskById: (id) =>
    request("GET", `tasks/${id}`),
    
  addOrUpdateTask: (id, data) =>
    request("POST", `tasks/${id}`, data),
    
    

  
};

export default remote;