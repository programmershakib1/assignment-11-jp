import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { imageUpload } from "../../utils/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    handleSignUp,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    locations,
    setLocations,
  } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!uploadImage || !uploadImage.image) {
      setLoading(false);
      toast.error("Please upload a profile photo.");
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    )
      return (
        setLoading(false),
        toast.error(
          password.length < 6
            ? "Password must be 6 characters long"
            : !/[A-Z]/.test(password)
            ? "Password must contain at least one uppercase letter"
            : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : "Password must contain at least one special character"
        )
      );

    const imageUrl = await imageUpload(uploadImage.image);

    const userInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      photo: imageUrl,
      signUp: new Date().toISOString(),
      lastSignIn: new Date().toISOString(),
    };
    axiosPublic.patch("/signUp-user", userInfo);

    handleSignUp(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result?.user);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageUrl,
        });

        setUser({ displayName: name, photoURL: imageUrl });

        setLoading(false);
        toast.success("User sign up successful");
        navigate(locations ? locations : "/");
      })
      .catch((error) => {
        e.target.reset();
        setUploadImage(null);
        setLoading(false);
        toast.error(error?.code);
      });
  };

  const handleLocations = () => {
    setLocations(locations);
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="relative w-36 h-36 border-2 border-black dark:border-white rounded-full flex justify-center items-center">
          <label
            htmlFor="profilePhoto"
            className="w-full h-full flex items-center justify-center rounded-full cursor-pointer"
          >
            {uploadImage ? (
              <img
                className="w-full h-full rounded-full object-cover"
                src={uploadImage?.url}
                alt="Uploaded profile"
              />
            ) : (
              <h4 className="text-xl font-semibold">Profile</h4>
            )}
          </label>
          <input
            id="profilePhoto"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setUploadImage({
                image: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-2">
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
        <button className="bg-black py-0.5 px-6 text-white dark:bg-c  rounded-full font-bold mt-5">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-white"></span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <div>
        <p className="pt-2 text-center text-sm font-semibold">
          Already have an Account?
          <Link to="/signIn" onClick={handleLocations} className="underline">
            {" "}
            Sign In
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result?.user);
                  toast.success("User sign up successful");
                  navigate(locations ? locations : "/");
                })
                .catch((error) => {
                  setLoading(false);
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
                  setUser(result?.user);
                  toast.success("User sign up successful");
                  navigate(locations ? locations : "/");
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

export default SignUp;
