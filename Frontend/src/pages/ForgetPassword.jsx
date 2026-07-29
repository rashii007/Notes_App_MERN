import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      return setError("Please enter your email.");
    }

    try {
      setLoading(true);

      // API Call Here
      // const data = await forgotPassword(email);

      setMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">

        <div className="flex justify-end mb-4">
          <ThemeButton />
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <Mail
              size={32}
              className="text-blue-600 dark:text-blue-300"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-300 mt-2 mb-8">
          Enter your email to receive a password reset link.
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:bg-blue-400"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 dark:text-slate-300">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;