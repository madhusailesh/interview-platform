import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Room from "./pages/Room";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewerDashboard from "./pages/InterviewerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
        <Route
          path="/interviewer-dashboard"
          element={
            <ProtectedRoute allowedRole="interviewer">
              <InterviewerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
       

        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
