import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Historic from "./pages/Historic";
import Medeival from "./pages/Medeival";
import Future from "./pages/Future";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historic" element={<Historic />} />
        <Route path="/medieval" element={<Medeival />} />
        <Route path="/future" element={<Future />} />
      </Routes>
    </Router>
  );
};

export default App;
