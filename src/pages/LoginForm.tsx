import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { Home } from "lucide-react";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex gap-40 items-center justify-center
     bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative">
      <div className=" flex justify-between gap-40">
        {/* Left Side Content */}
        <div className=" ">
          <div className="mt-5 grid gap-4">
            <span className="text-blue-500 font-bold text-2xl">Stay Organized, Stay Ahead</span>
            <p className="text-green-600">
              Sign in to submit new requests or follow up on <br /> approvals — all in one place.
            </p>
          </div>
          <div className="h-90 w-90 mt-20">
            <img src="pana.png" alt="frame" />
          </div>
        </div>

        {/* Right Side Login Card */}
        <div className=" bg-white backdrop-blur-md shadow-2xl
         rounded-3xl pr-7 pl-7 pb-8 pt-2 w-full max-w-md border border-white/30
         transition-all duration-300">
         
<div className="flex gap-3 mt-3 justify-center items-center">
  <div className="h-10 w-10 mt-1">
    <img src="logo.svg" alt="logo" />
  </div>
  
  <h2 className="font-bold mt-3 "><span className="text-blue-700">Mission</span><span className="text-green-700">Track.</span></h2>
</div>

          {/* Main Login Card */}
          <div className="mb-10 ">
            <div className="text-center  mb-8 mt-10 relative z-10">
              <h1 className="font-bold text-2xl">Welcome</h1>
              <p className="text-gray-600 text-lg">
                Sign in to manage your mission requests
              </p>
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm animate-shake">
                {error}
              </div>
            )}
          </div>



          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className=" space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50/70 border border-gray-200 rounded-xl 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                focus:bg-white outline-none transition-all duration-200 
                text-gray-900 placeholder-gray-500 hover:bg-gray-50"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-4 bg-gray-50/70 border border-gray-200 rounded-xl 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  focus:bg-white outline-none transition-all duration-200 
                  text-gray-900 placeholder-gray-500 hover:bg-gray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500"
                >
                  {showPassword ?  <BiSolidShow />: <BiSolidShow />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg transform ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r bg-primaryColor-800 hover:to-indigo-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-blue-300"
                }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form> 

          {/* Forgot Password */}
          <div className="mt-6 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
              Forgot your password?
            </button>
          </div>

          <div className="justify-center items-center">
            <button
      onClick={() => navigate("/")}
      className="flex gap-2 mt-5 ml-18 px-4 py-2 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
    >
      <Home className="w-5 h-5 " /> {/* home icon */}
      <span>Back to Home</span>
    </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Need help? Contact your system administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
