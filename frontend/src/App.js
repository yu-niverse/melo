import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import Audio from "./components/Audio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/play" element={<Audio />} />
      </Routes>
    </Router>
  );
}

export default App;