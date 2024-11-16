import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Panel from "./Panel";

 function App() {

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/:Id" element={<Panel />} />
        {/* <Route path="/page" element={<Page />} /> */}
 
      </Routes>
    </Router>
  );
}




export default App