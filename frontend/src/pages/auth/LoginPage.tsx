import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    try {
      setIsLoading(true);
      setError("");

      const res = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successfully");
=======
    const result = await login(username, password);
    if (result) {
      toast.success("Admin login successfully");
>>>>>>> portfolio-v2
      navigate("/admin");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-bgDark">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-secondary/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <LogIn className="w-8 h-8 text-blue-300" />
            </motion.div>
            <h1 className="text-2xl font-bold dark:text-white">
              Welcome <span className="text-blue-500">Ravi Karmakar</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Login to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium dark:text-gray-300"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                           focus:ring-2 focus:ring-accent focus:border-transparent
                           placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                {/* Lock Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>

                {/* Password Input */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-accent focus:border-transparent
                     placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Enter your password"
                />

                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-800" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-800" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-4">
            <p className="text-sm text-white">
              Note :{" "}
              <span>
                You're not safe here,{" "}
                <Link
                  to="/profile"
                  className="italic hover:underline hover:text-blue-400"
                >
                  Back to Profile
                </Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
