import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarAuth from "./NavbarAuth";
import NavbarMobileMenu from "./NavbarMobileMenu";
import useAuth from "../../Hooks/useAuth";

const NAVBAR_HEIGHT = "80px";

const Navbar = () => {
  const user = useAuth();
  console.log("Navbar user state:", user);
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    console.log("Navbar re-rendered with user:", user);
  }, [user]);

  const handleLinkClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("hasSkippedFreelancerModal"); // Reset skip flag
    handleLinkClick("home");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" style={{ height: NAVBAR_HEIGHT }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <NavbarLogo />
        <NavbarLinks activeSection={activeSection} handleLinkClick={handleLinkClick} role={user?.role} />
        <NavbarAuth
          user={user} // Pass full user object
          handleLogout={handleLogout}
          handleLinkClick={handleLinkClick}
        />
        <button
          className="md:hidden relative w-10 h-10 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-5 bg-gray-600 transform transition duration-500 ease-in-out ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-gray-600 transform transition duration-500 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-gray-600 transform transition duration-500 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </div>
      <NavbarMobileMenu
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        handleLinkClick={handleLinkClick}
        role={user?.role}
        token={user?.token}
        firstname={user?.firstname}
        profilePicture={user?.profilePicture}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
export { NAVBAR_HEIGHT };