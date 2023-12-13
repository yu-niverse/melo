import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import MusicProvider from "./provider/MusicProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Room from "./components/Room";
import socket from "./socket";
import "./App.css";

function App() {
  useEffect(() => {
    socket.connect();
    console.log("socket connected");
    return () => {
      socket.disconnect();
      console.log("socket disconnected");
    };
  }, []);

  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/room/:id" element={<Room />} />
            </Route>
          </Routes>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;
