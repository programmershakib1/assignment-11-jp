const Footer = () => {
  return (
    <div className="mx-5 md:mx-0 mt-20 dark:text-p">
      <h2 className="text-center text-4xl font-black">TASKS MANAGEMENT</h2>
      <p className="text-center mt-5 lg:mx-52">
        Stay organized and boost your productivity with our Task Management
        Application. Effortlessly categorize tasks into To-Do, In Progress, and
        Done, track real-time updates, and streamline your workflow with an
        intuitive drag-and-drop interface. Built with React, Firebase, and
        MongoDB, our platform ensures a seamless experience with secure
        authentication and responsive design. Stay on top of your tasks—anytime,
        anywhere!
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 font-semibold mt-7">
        <p className="hover:underline">Privacy Policy</p>
        <p className="hover:underline">Terms of Service</p>
        <p className="hover:underline">User Guide</p>
        <p className="hover:underline">Contact Support</p>
        <p className="hover:underline">Accessibility</p>
      </div>
      <div className="flex justify-center items-center gap-8 mt-7">
        <a href="#" target="_blank">
          <i className="fa-brands fa-facebook text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-instagram text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-twitter text-3xl"></i>
        </a>
      </div>
      <div className="border border-black dark:border-white mt-5"></div>
      <p className="text-center font-medium my-8">
        © 2025 TASKS. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
