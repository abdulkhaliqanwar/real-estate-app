const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5555"
    : "https://real-estate-app-gvks.onrender.com";

console.log("API_BASE_URL = ", API_BASE_URL);
export default API_BASE_URL;
