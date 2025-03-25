import { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    personal_email: "",
    company_email: "",
    email_password_plain: "",
    phone_number: "",
    home_address: "",
    job_location: "",
    working_hours: "",
    family_member_count: "",
    age: "",
    sex: "",
    marital_status: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:8000/api/employee", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Employee data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="h-tag">Employee Signup</h2>
      <form className="box" onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          className="input-btn"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          className="input-btn"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <label htmlFor="personal_email">Personal Email:</label>
        <input
          className="input-btn"
          type="email"
          name="personal_email"
          value={formData.personal_email}
          onChange={handleChange}
          placeholder="Personal Email"
          required
        />

        <label htmlFor="company_email">Company Email:</label>
        <input
          className="input-btn"
          type="email"
          name="company_email"
          value={formData.company_email}
          onChange={handleChange}
          placeholder="Company Email"
          required
        />

        <label htmlFor="email_password_plain">Password:</label>
        <input
          className="input-btn"
          type="password"
          name="email_password_plain"
          value={formData.email_password_plain}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <label htmlFor="phone_number">Phone Number:</label>
        <input
          className="input-btn"
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <label htmlFor="home_address">Home Address:</label>
        <input
          className="input-btn"
          type="text"
          name="home_address"
          value={formData.home_address}
          onChange={handleChange}
          placeholder="Home Address"
          required
        />

        <label htmlFor="job_location">Job Location:</label>
        <input
          className="input-btn"
          type="text"
          name="job_location"
          value={formData.job_location}
          onChange={handleChange}
          placeholder="Job Location"
          required
        />

        <label htmlFor="working_hours">Working Hours:</label>
        <input
          className="input-btn"
          type="text"
          name="working_hours"
          value={formData.working_hours}
          onChange={handleChange}
          placeholder="Working Hours"
          required
        />

        <label htmlFor="family_member_count">Family Member Count:</label>
        <input
          className="input-btn"
          type="number"
          name="family_member_count"
          value={formData.family_member_count}
          onChange={handleChange}
          placeholder="Family Member Count"
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          className="input-btn"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />

        <label htmlFor="sex">Sex:</label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="marital_status">Marital Status:</label>
        <select
          name="marital_status"
          value={formData.marital_status}
          onChange={handleChange}
          required
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>

        <label htmlFor="allergies">Allergies:</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Allergies (if any)"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
