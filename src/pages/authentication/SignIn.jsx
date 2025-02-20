import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const SignIn = () => {
  const {
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    locations,
    setLocations,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result?.user);
        setLoading(false);
        toast.success("User sign in successful");
        if (locations) {
          navigate(locations);
        } else {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
      });
  };

  const handleLocations = () => {
    setLocations(location.state);
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-2">
          <label>
            <span className="font-semibold">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <button className="mt-3 bg-black py-0.5 px-6 text-white dark:bg-c rounded-full font-bold">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-white"></span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <div>
        <p className="pt-2 text-center text-sm font-semibold">
          Don&apos;t have an Account?
          <Link to="/signUp" onClick={handleLocations} className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result.user);
                  toast.success("User sign in successful");
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold mt-5"
          >
            <i className="fa-brands fa-google text-white pr-2"></i>
            Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result.user);
                  toast.success("User sign in successful");
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold md:mt-5"
          >
            <i className="fa-brands fa-github text-white pr-2"></i>
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
