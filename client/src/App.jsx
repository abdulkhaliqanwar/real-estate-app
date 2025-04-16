import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProperty from "./pages/AddProperty";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";
import UserDashboard from "./pages/UserDashboard"; 

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

        {/* ✅ Admin-protected route */}
        <Route
          path="/add-property"
          element={
            <PrivateRoute>
              {JSON.parse(localStorage.getItem("currentUser") || "{}").role === "admin"
                ? <AddProperty />
                : <p>🚫 You are not authorized to add properties.</p>}
            </PrivateRoute>
          }
        />
        <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <UserDashboard />
    </PrivateRoute>
  }
/>

        {/* ✅ Booking route for authenticated users */}
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
