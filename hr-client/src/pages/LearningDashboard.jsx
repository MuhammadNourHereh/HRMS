import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa"; 
import "../styles/LearningDashboard.css"
import { request } from "../utils/remote/axios"; 

const LearningDashboard = () => {
  const [certifications, setCertifications] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);

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
              <button className="assign-btn">Assign</button>
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
              <button className="assign-btn">Assign</button>
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
              <button className="assign-btn">Assign</button>
            </div> </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningDashboard;
