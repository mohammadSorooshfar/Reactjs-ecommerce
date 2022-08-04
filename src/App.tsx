import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainRoutes from "routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tehranshoes/*" element={<MainRoutes />} />
          <Route path="/" element={<Navigate to="/tehranshoes" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
