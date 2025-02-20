# Task Management (Client Side)

## Short Description

This is the client-side of the Task Management application. It provides an interactive user interface for managing tasks, including functionalities such as task categorization (To-Do, In Progress, Done), task creation, editing, deletion, drag-and-drop reordering, and task filtering. The frontend is built using React.js, React Query, and integrates with the backend API for real-time data fetching. The UI is responsive and styled with Tailwind CSS and DaisyUI.

## Live Link

You can check out the live demo of the application here:  
[Live Application](https://tasks-management-org.netlify.app)

## Dependencies

The following dependencies are used in this project:

- **@dnd-kit/accessibility**: ^3.1.1 - Provides accessibility features for drag-and-drop interactions.
- **@dnd-kit/core**: ^6.3.1 - The core library for drag-and-drop functionality.
- **@dnd-kit/sortable**: ^10.0.0 - Provides sortable functionality for drag-and-drop lists.
- **@tailwindcss/vite**: ^4.0.7 - Tailwind CSS integration for Vite.js.
- **@tanstack/react-query**: ^5.66.7 - Data fetching and caching for React.
- **axios**: ^1.7.9 - Promise-based HTTP client for making requests to the backend API.
- **date-fns**: ^4.1.0 - A library for date manipulation.
- **firebase**: ^11.3.1 - Firebase for authentication and secure user management.
- **localforage**: ^1.10.0 - A library for client-side storage (used for storing tasks locally).
- **lottie-react**: ^2.4.1 - React wrapper for Lottie animations.
- **match-sorter**: ^8.0.0 - A utility for sorting arrays.
- **prop-types**: ^15.8.1 - For runtime type checking of props in React components.
- **react**: ^19.0.0 - React.js library for building user interfaces.
- **react-dom**: ^19.0.0 - Provides DOM-specific methods for React.
- **react-hook-form**: ^7.54.2 - A library for managing forms in React.
- **react-hot-toast**: ^2.5.2 - A library for showing toast notifications.
- **react-router-dom**: ^7.2.0 - React Router for handling navigation and routing.
- **react-simple-typewriter**: ^5.0.1 - A simple typewriter effect for React.
- **react-tooltip**: ^5.28.0 - Tooltip library for React.
- **sort-by**: ^1.2.0 - Utility for sorting arrays.
- **swiper**: ^11.2.4 - A mobile-friendly slider library for React.
- **tailwindcss**: ^4.0.7 - Utility-first CSS framework.
- **daisyui**: ^4.12.23 - A Tailwind CSS plugin for components.

## Installation Steps

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/programmershakib1/assignment-11-jp.git
   cd assignment-11-jp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the necessary variables for Firebase, ImgBB, VITE Server URL.
   - 🚨 **Important:** Never expose your `.env.local` file in public repositories. Use `.gitignore` to keep it secure.

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🔗 Live Project & Resources

🌍 **Live Site:** [Live Application](https://tasks-management-org.netlify.app)

📂 **GitHub Repository:** [GitHub Link](https://github.com/programmershakib1/assignment-11-server-jp)

---

Thank you for Exploring the Tasks Management! 🚀
