import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-600">
      <nav className="container mx-auto px-4 py-3">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-300 font-semibold transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-blue-300 font-semibold transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-white hover:text-blue-300 font-semibold transition"
            >
              Signup
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
