import React from 'react';
import "../styles/profile.css";  // Adjust the relative path


const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-img-container">
          <img
            src="https://via.placeholder.com/150" // Replace with actual profile image URL
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* User Info */}
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-email">john.doe@example.com</p>

        {/* Bio */}
        <p className="profile-bio">Full-stack developer | Passionate about coding and AI</p>

        {/* Edit Button */}
        <button className="btn-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
