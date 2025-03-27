import React, { useEffect, useState } from "react";
import "../styles/LearningDashboard.css";
import { request } from "../utils/remote/axios"; 
import AssignEmployee from "../components/AssignEmployee"; 

const LearningDashboard = () => {
  const [certifications, setCertifications] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [employees, setEmployees] = useState([]); 
  const [selectedProgram, setSelectedProgram] = useState(null); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  useEffect(() => {
    getPrograms(meta.current_page);
  }, [meta.current_page]);
    
  const getPrograms = async (page = 1) => {
    const token =localStorage.getItem('token');
    if (!token) {
      console.error("User ID not found. User might not be logged in.");
      return;
    }
    const response = await request({
      method: "GET", 
      route: "/programs",
      params: { per_page: 10, page },
      token,
    });
          
    if (!response.error) {

    const programs = response.data;
    setCertifications(programs.filter((p) => p.type === "Certification"));
    setCourses(programs.filter((p) => p.type === "Course"));
    setSkills(programs.filter((p) => p.type === "Assessment"));
    } else {
        console.error(response.message);
      }
  };

  const getEmployees = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User ID not found.");
      return;
    }
    const response = await request({
      method: "GET",
      route: "/employees/get-employees", 
      token,
    });
    console.log("Employees API Response:", response);
    if (response.status === 'success' && Array.isArray(response.data?.data)) {
      setEmployees(response.data.data); // Access the nested array
      console.log("Employees data set:", response.data.data);    
    } else {
      console.error(response.message);
    }
  };

  const openPopup = async (program) => {
    setSelectedProgram(program);
    try {
      await getEmployees(); 
      setIsPopupOpen(true); 
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleEnroll = async (selectedEmployees) => {
    if (!selectedProgram || !selectedEmployees.length) {
      alert("Please select at least one employee");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        method: "POST",
        route: "/enrollments",
        body: {
          program_id: selectedProgram.id,
          employee_ids: selectedEmployees.map(e => e.id)
        },
        token,
      });
  
      if (!response.error) {
        alert("Enrollment successful!");
        setIsPopupOpen(false);
      } else {
        throw new Error(response.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(error.message);
    }
  };

  
  return (
    <div className="dashboard-container">
      {/* Certification Programs */}
      <section>
        <h2>Certification Programs</h2>
        <div className="course-list">
          {certifications.map((program) => (
            <div className="course-card" key={program.id}>
              <img
                src={
                  program.picture_url
                    ? `${import.meta.env.VITE_API_BASE_URL}/storage/${program.picture_url.replace('/storage/', '')}`
                    : '/default-course.png'
                }
                alt={program.name}
                onError={(e) => (e.target.src = '/default-course.png')}
                loading="lazy"
              />            
            <div className="course-data">                       
              <div className="course-info">
                <h3>{program.name}</h3>
                <p>{program.duration} hours</p>
              </div> 
              <button className="assign-btn" onClick={() => openPopup(program)}>Assign</button>
            </div> 
            </div>
          ))}
        </div>
      </section>

      {/* Courses Available */}
      <section>
        <h2>Courses Available</h2>
        <div className="course-list">
          {courses.map((program) => (
            <div className="course-card" key={program.id}>
              <img
                src={
                  program.picture_url
                    ? `${import.meta.env.VITE_API_BASE_URL}/storage/${program.picture_url.replace('/storage/', '')}`
                    : '/default-course.png'
                }
                alt={program.name}
                onError={(e) => (e.target.src = '/default-course.png')}
                loading="lazy"
              />                         
             <div className="course-data">                       
              <div className="course-info">
                <h3>{program.name}</h3>
                <p>{program.duration} hours</p>
              </div> 
              <button className="assign-btn" onClick={() => openPopup(program)}>Assign</button>
            </div> 
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Skills */}
      <section>
        <h2>Assessment Skills</h2>
        <div className="course-list">
          {skills.map((program) => (
            <div className="course-card" key={program.id}>
              <img
                src={
                  program.picture_url
                    ? `${import.meta.env.VITE_API_BASE_URL}/storage/${program.picture_url.replace('/storage/', '')}`
                    : '/default-course.png'
                }
                alt={program.name}
                onError={(e) => (e.target.src = '/default-course.png')}
                loading="lazy"
              /> 
              <div className="course-data">                       
              <div className="course-info">
                <h3>{program.name}</h3>
                <p>{program.duration} hours</p>
              </div> 
              <button className="assign-btn" onClick={() => openPopup(program)}>Assign</button>
            </div> </div>
          ))}
        </div>
      </section>
      {isPopupOpen && selectedProgram && (
        <AssignEmployee 
          isOpen={isPopupOpen} 
          employees={employees} 
          program={selectedProgram}
          onClose={() => setIsPopupOpen(false)}
          onEnroll={handleEnroll}
        />
      )}
    </div>
  );
};

export default LearningDashboard;
