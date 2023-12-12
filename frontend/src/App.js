import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Room from "./components/Room";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/room/:id" element={<Room />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;