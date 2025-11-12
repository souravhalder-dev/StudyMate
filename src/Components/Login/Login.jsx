import React from "react";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { gLogin, Signedin } = useAuth();
  const navigate = useNavigate();
  // simg in
  const handalLogin = (e) => {
    const password = e.target.password.value;
    const email = e.target.email.value;
    e.preventDefault();
    Signedin(email, password)
      .then((res) => {
        console.log(res);
        toast.success(`Welcome there! 👏`);
        navigate("/");
      })
      .then((data) => {
        e.target.reset();
        console.log(data);
      })
      .catch((err) => {
        toast.error(` ${err.message}! `);
        console.log(err);
      });
  };
  // google login
  const googleLogin = () => {
    gLogin()
      .then((result) => {
        console.log(result);
        navigate("/");
        toast.success(`Welcome ${result.user.displayName}! 👏`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-indigo-200">
        <div className="card-body">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login to continue your journey with us
          </p>

          <form onSubmit={handalLogin}>
            <fieldset className="fieldset space-y-3">
              <div>
                <label className="label text-gray-600 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="label text-gray-600 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  Remember me
                </label>
                <Link
                  to="/forget-password"
                  className="link text-indigo-600 font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
                {/* <a className="link text-indigo-600 font-semibold hover:underline">
                  Forgot password?
                </a> */}
              </div>

              <button className="btn w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 rounded-xl">
                Login
              </button>
            </fieldset>
          </form>
          <div>
            {/* Google */}
            <button
              onClick={googleLogin}
              className="btn bg-white w-full text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          <div className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to={"/register"}>
              <p className="link text-indigo-600 font-semibold hover:underline">
                Register now
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
