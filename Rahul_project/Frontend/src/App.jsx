
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./service/Home";
import About from "./service/About";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ForgotPassword from "./components/Forgotpassword";


const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
