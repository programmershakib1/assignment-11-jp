import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollRestoration from "../components/ScrollRestoration";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <ScrollRestoration></ScrollRestoration>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
