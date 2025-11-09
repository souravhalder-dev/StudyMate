import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const { RegisterUser, gLogin } = useAuth();

  const [pass, setPass] = useState(false);
  const navigate = useNavigate();
  const handalRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain uppercase, lowercase & be at least 6 chars"
      );
      return;
    }

    // Validate confirm password before attempting registration
    if (password !== repassword) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "warning",
      //     title: "Passwords do not match. Please confirm your password.",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      toast.error(`Passwords do not match. Please confirm your password. `);

      return;
    }

    // Optional: basic password length check
    if (password.length < 6) {
      toast.error(`Password must be at least 6 characters long. `);

      return;
    }

    RegisterUser(email, password)
      .then((res) => {
        navigate("/");
        toast.success(`Registration successful ! `);
        console.log(res);
      })
      .then((data) => {
        console.log(data);

        e.target.reset();
      })
      .catch((err) => {
        console.error(err);

        toast.error(`${err?.message}`);
      });
    console.log(name, image, email, repassword, password);
  };
  const passTogle = (e) => {
    setPass(!pass);
    e.preventDefault();
  };
  // google login
  const googleLogin = () => {
    gLogin()
      .then((result) => {
        navigate("/");
        toast.success(`Registration successful ${result.user.displayName}! `);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-indigo-200">
        <div className="card-body">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Join us and start your journey today
          </p>

          <form onSubmit={handalRegister}>
            {/* {error && (
              <div className="mb-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-3 text-sm text-green-600 font-medium">
                {success}
              </div>
            )} */}
            <fieldset className="fieldset space-y-3">
              <div>
                <label className="label text-gray-600 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="label text-gray-600 font-semibold">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Photo URL"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>

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

              <div className="relative">
                <label className="label text-gray-600 font-semibold">
                  Password
                </label>
                <input
                  type={pass ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 "
                />
                <button
                  className=" btn btn-xs absolute top-6 right-1"
                  onClick={passTogle}
                >
                  {pass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <label className="label text-gray-600 font-semibold">
                  Confirm Password
                </label>
                <input
                  type={pass ? "text" : "password"}
                  name="repassword"
                  placeholder="Re-enter password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  className=" btn btn-xs absolute top-6 right-1"
                  onClick={passTogle}
                >
                  {pass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="btn w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 rounded-xl">
                Register
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
              Register with Google
            </button>
          </div>
          <div className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"}>
              <p className="link text-indigo-600 font-semibold hover:underline">
                Login here
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
