import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postdata = async()=>{
    try{
        const response = await axios.post('/api/user/singin', {
          email: email,
          password: password
        });
       const data = response.data;
       console.log(data);

    }catch(error) {
      console.error("Error during signup:", error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    postdata();
  };



  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full max-w-sm   ">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 ">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
