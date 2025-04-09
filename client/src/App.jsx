import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer"; // ✅ Import footer

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <Router>
        <Navbar currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer /> {/* ✅ This is now correctly inside the JSX block */}
      </Router>
    </>
  );
}

export default App;
