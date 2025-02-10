import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Historic from "./pages/Historic";
import Medeival from "./pages/Medeival";
import Future from "./pages/Future";
import { AuthProvider } from "./AuthContext";
import EventPage from "./pages/EventPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historic" element={<Historic />} />
          <Route path="/medieval" element={<Medeival />} />
          <Route path="/future" element={<Future />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
