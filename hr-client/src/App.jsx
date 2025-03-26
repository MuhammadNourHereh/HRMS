// import "./App.css";
// import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import EmployeeForm from "./assets/pages/signupLaravel";
// import SnippetList from './components/SnippetList';
// import SnippetForm from './components/SnippetForm';
// function App() {
//   return (
//      <div className="App">
//       <h1>Employee </h1>
//       <SnippetForm />
//        <SnippetList />
//      </div>
//   );
// }

// export default App;
// import ReactDOM from "react-dom";
// import React from "react";



// <Router>
//       <Routes>
//         <Route path="/signupLaravel" element={<EmployeeForm />} />
//       </Routes>
//     </Router>







// import React from "react";
// import GeolocationLogger from "./components/GeolocationLogger"; // Import your component

// const App = () => {
//   return (
//     <div className="App">
//       <h1>Employee Clock-In/Out</h1>
//       <GeolocationLogger /> {/* Render the GeolocationLogger component */}
//     </div>
//   );
// };

// export default App;


















// import "./App.css";
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Content from './components/Content';
// import GeolocationLogger from './components/GeolocationLogger';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="wrapper">
//         <Sidebar />
//         <Switch>
//           <Route exact path="/" component={Content} />
//           <Route path="/geolocation" component={GeolocationLogger} /> {/* Correct path here */}
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import "./App.css";  
// import React from 'react';
// import FlowchartClockedWorker from './pages/FlowchartClockedWorker';

// function App() {
//   return (
//     <div className="App">
//       <FlowchartClockedWorker />
//     </div>
//   );
// }

// export default App;







import "./App.css"; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import GeolocationLogger from './components/GeolocationLogger';
import DocumentManagement from './components/DocumentManagement'; // Import DocumentManagement component

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be at the top */}
      <div className="wrapper">
        <Sidebar /> {/* Sidebar on the left */}
        <Routes>
          <Route path="/" element={<Content />} /> {/* Default route for Content */}
          <Route path="/geolocation" element={<GeolocationLogger />} /> {/* Geolocation page route */}
          <Route path="/document-management" element={<DocumentManagement />} /> {/* Document Management route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




















