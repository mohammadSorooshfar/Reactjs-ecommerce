import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import DashboardRoutes from "./routes/DashboardRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";
import PayRoutes from "./routes/PayRoutes";
import MainRoutes from "./routes/MainRoutes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tehranshoes/*" element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
