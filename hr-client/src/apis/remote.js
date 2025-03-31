import axios from "axios";
import { BASE_URL } from "../../env";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

const request = (method, route, data = null, params = null) => {
  const token = getAuthToken();
  
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return axios
    .request({
      method,
      url: `${BASE_URL}${route}`,
      data,
      params,
      headers    })
    .then((res) => {
      if (route === "login" && res.data && res.data.token) {
        setAuthToken(res.data.token);
      }
      
      return res.status === 204 ? [] : res.data;
    })
    .catch((err) => {
      console.error("Error:", err);
      
      if (err.response && err.response.status === 401) {
        setAuthToken(null);
      }
      
      throw err;
    });
};

const remote = {
  login: (email, password) => request("POST", "login", { email, password }),

  logout: () => {
    const result = request("POST", "hr/users/logout");
    setAuthToken(null); 
    return result;
  },

  getProfile: () => request("GET", "hr/users/me"),

  // Departments
  getDepartments: () => request("GET", `hr/dep-pos/get-departments`),

  // Positions 
  getPositions: () => request("GET", `hr/dep-pos/get-positions`),

  // Employees
  getEmployees: (page = 1) =>
    request("GET", `hr/employees/get-employees?page=${page}`),

  getEmployeeById: (id) => request("GET", `hr/employees/get-employee-by-id/${id}`),

  addOrUpdateEmployee: (id, data) =>
    request("POST", `hr/employees/add-update-employee/${id}`, data),

  deleteEmployee: (id) => request("POST", `hr/employees/delete-employee/${id}`),

  // Review Cycles
  getReviewCycles: (page = 1) =>
    request("GET", `hr/review-cycles/get-review-cycles?page=${page}`),

  getReviewCycleById: (id) =>
    request("GET", `hr/review-cycles/get-review-cycle-by-id/${id}`),

  addOrUpdateReviewCycle: (id, data) =>
    request("POST", `hr/review-cycles/add-update-review-cycle/${id}`, data),

  deleteReviewCycle: (id) =>
    request("POST", `hr/review-cycles/delete-review-cycle/${id}`),

  // Payrolls
  getPayrolls: (page = 1, perPage = 10) =>
    request("GET", `hr/payrolls?page=${page}&per_page=${perPage}`),

  markAsPaid: (payrollId) =>
    request("PUT", `hr/payrolls/${payrollId}/pay`),

  createPayroll: (data) =>
    request("POST", "hr/payrolls", data),

  updatePayroll: (id, data) =>
    request("PUT", `hr/payrolls/${id}`, data),

  deletePayroll: (id) =>
    request("DELETE", `hr/payrolls/${id}`),
    
  // Performance Reviews
  getPerformanceReviews: (page = 1) =>
    request("GET", `hr/performance-reviews/get-performance-reviews?page=${page}`),
      
  getPerformanceReviewById: (id) =>
    request("GET", `hr/performance-reviews/get-performance-review-by-id/${id}`),
      
  addOrUpdatePerformanceReview: (id, data) =>
    request("POST", `hr/performance-reviews/add-update-performance-review/${id}`, data),
      
  deletePerformanceReview: (id) =>
    request("POST", `hr/performance-reviews/delete-performance-review/${id}`),
      
  getEmployeePerformanceReviews: (employeeId) =>
    request("GET", `hr/performance-reviews/get-employee-performance-reviews/${employeeId}`),

  // Candidates
  getCandidates: (page = 1) =>
    request("GET", `hr/candidates?page=${page}`),

  getAcceptedCandidates: (page = 1) => 
    request("GET", `hr/candidates/accepted-candidates?page=${page}`),

  getCandidateById: (id) => 
    request("GET", `hr/candidates/${id}`),

  addOrUpdateCandidate: (id, data) => 
    request("POST", `hr/candidates/${id}`, data),

  deleteCandidate: (id) => 
    request("DELETE", `hr/candidates/${id}`),

  updateCandidateStatus: (id, statusData) => 
    request("PUT", `hr/candidates/${id}/status`, statusData),

  getCandidatesByStatus: (status, page = 1) => 
    request("GET", `hr/candidates/status/${status}?page=${page}`),

  // Onboarding Tasks
  getOnboardingTasks: (page = 1) => 
    request("GET", `hr/onboarding-tasks?page=${page}`),

  getOnboardingTaskById: (id) => 
    request("GET", `hr/onboarding-tasks/${id}`),

  addOrUpdateOnboardingTask: (id, data) => 
    request("POST", `hr/onboarding-tasks/${id}`, data),

  deleteOnboardingTask: (id) => 
    request("DELETE", `hr/onboarding-tasks/${id}`),

  assignTaskToEmployee: (data) => 
    request("POST", `hr/onboarding-tasks/assign`, data),

  updateTaskStatus: (id, statusData) => 
    request("PUT", `hr/onboarding-tasks/status/${id}`, statusData),

  getEmployeeOnboardingTasks: (employeeId) => 
    request("GET", `hr/onboarding-tasks/employee/${employeeId}`),
    
  createOnboardingTemplate: (data) => 
    request("POST", `hr/onboarding-tasks/template`, data),

  applyTemplateToEmployee: (data) => 
    request("POST", `hr/onboarding-tasks/template/apply`, data),

  getEmployeeOnboardingProgress: (employeeId) => 
    request("GET", `hr/onboarding-tasks/progress/${employeeId}`),

  // Projects
  getProjects: (page = 1) =>
    request("GET", `hr/projects?page=${page}`),

  addOrUpdateProject: (id, data) =>
    request("POST", `hr/projects/${id}`, data),

  // Tasks
  getTasks: (page = 1) =>
    request("GET", `hr/tasks?page=${page}`),
    
  getTaskById: (id) =>
    request("GET", `hr/tasks/${id}`),
    
  addOrUpdateTask: (id, data) =>
    request("POST", `hr/tasks/${id}`, data),
    
  // Auth utils
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  
 
};

export default remote;