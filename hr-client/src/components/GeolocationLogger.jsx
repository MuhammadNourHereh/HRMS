import { useState } from "react";
import axios from "axios";

const GeolocationLogger = () => {
  const [location, setLocation] = useState(null);
  const [employeeId, setEmployeeId] = useState(""); // User input for employee ID
  const [clockedIn, setClockedIn] = useState(false); // Track if user is clocked in
  const [action, setAction] = useState(null); // Track if the user wants to clock in or clock out
  const [clockInDate, setClockInDate] = useState(null); // Track clock-in date
  const [statusMessage, setStatusMessage] = useState(""); // Track success message for clock-in/out

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          console.log("Latitude:", coords.latitude);
          console.log("Longitude:", coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const clockIn = async () => {
    if (location && employeeId) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/clock-in", {
          employee_id: employeeId,
          longitude: location.longitude,
          latitude: location.latitude,
        });
        console.log(response.data);
        setClockedIn(true); // Mark user as clocked in
        setClockInDate(new Date().toLocaleString()); // Set the current date and time for clock-in
        setStatusMessage("Successfully clocked in!"); // Set success message
      } catch (error) {
        console.error("Error during clock-in:", error);
      }
    } else {
      console.error("Location or Employee ID is missing.");
    }
  };

  const clockOut = async () => {
    if (employeeId) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/clock-out", {
          employee_id: employeeId,
        });
        console.log(response.data);
        setClockedIn(false); // Mark user as clocked out
        setClockInDate(null); // Clear clock-in date
        setStatusMessage("Successfully clocked out!"); // Set success message
      } catch (error) {
        console.error("Error during clock-out:", error);
      }
    } else {
      console.error("Employee ID is missing.");
    }
  };

  return (
    <div className="container-white">
      {/* Action selection */}
      {action === null && (
        <div className="action-buttons box-accent">
          <button className="btn" onClick={() => setAction("clockIn")}>Clock In</button>
          <button className="btn" onClick={() => setAction("clockOut")}>Clock Out</button>
        </div>
      )}

      {/* Employee ID input */}
      {action && (
        <div>
          <input
            className="input-btn"
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
      )}

      {/* Location Input for Clock In */}
      {action === "clockIn" && (
        <div>
          <button className="btn" onClick={getLocation}>Get Location</button>
          {/* Display location */}
          {location && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
            </div>
          )}
        </div>
      )}

      {/* Clock In Button */}
      {action === "clockIn" && (
        <button className="back-btn" onClick={clockIn} disabled={clockedIn}>
          Clock In
        </button>
      )}

      {/* Clock Out Button */}
      {action === "clockOut" && !clockedIn && (
        <button className="back-btn" onClick={clockOut} disabled={!employeeId}>
          Clock Out
        </button>
      )}

      {/* Clock-In / Clock-Out Status */}
      {statusMessage && (
        <div>
          <p>{statusMessage}</p>
          {clockInDate && <p>Clocked In at: {clockInDate}</p>}
        </div>
      )}

      {/* Back Button */}
      {action && (
        <button className="btn back-btn" onClick={() => setAction(null)}>Back</button>
      )}
    </div>
  );
};

export default GeolocationLogger;
