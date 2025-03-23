import "./App.css";


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







import DocumentUpload from './components/DocumentUpload';

import DocumentSearch from './DocumentSearch';
import GeolocationLogger from './components/GeolocationLogger';

function App() {
    return (
//        
        
        //         </div>
        <div>
      <h1>Employee Document Upload</h1>
        <DocumentUpload /> 
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
