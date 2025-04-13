import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;