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




















































import "./App.css"; 
import React from 'react'; 
import DocumentUpload from './components/DocumentUpload';
//  import DocumentDetail from "./components/DocumentDisplay";
import DocumentSearch from './DocumentSearch';
import GeolocationLogger from './components/GeolocationLogger';

function App() {
    return (
//        <div className="container-white">  
//   <h1 className="h-tag">Code Snippet Manager</h1>
      
//   <SnippetForm />
//   <SnippetList />
        
        //         </div>
        <div>
      <h1>Employee Document Upload</h1>
        <DocumentUpload /> {/* Use the component here */}
        <div className="box-accent"></div>
        <div>
          <DocumentSearch />
        

        </div>
        <div className="box-accent"></div>
        <div>
          <h1>Employee Clock-In/Out</h1>
          <GeolocationLogger />

        </div>
    </div>
        

    );
}

export default App;
