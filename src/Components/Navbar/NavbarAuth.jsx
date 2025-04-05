"use client"

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  LogOut,
  LogIn,
  User,
  Settings,
  HelpCircle,
  Bookmark,
  Heart,
  MessageSquare,
  Calendar,
  Shield,
  ChevronDown,
  Briefcase, // Added for Gigs Dashboard icon
} from "lucide-react";

const NavbarAuth = ({ user, handleLogout, handleLinkClick }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "John Doe sent you a message",
      time: "2 minutes ago",
      read: false,
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
      id: 2,
      title: "Event reminder",
      description: "Team meeting in 30 minutes",
      time: "30 minutes ago",
      read: false,
      icon: <Calendar className="w-5 h-5 text-green-500" />,
    },
    {
      id: 3,
      title: "Account security",
      description: "Your password was changed successfully",
      time: "2 hours ago",
      read: true,
      icon: <Shield className="w-5 h-5 text-purple-500" />,
    },
  ];

  // Define base menu sections
  const baseMenuSections = [
    {
      title: "Account",
      items: [
        {
          name: "Dashboard",
          icon: <User className="w-4 h-4" />,
          link: user?.role === "FREELANCER" ? "/editor-dashboard" : user?.role === "CLIENT" ? "/client-dashboard" : "/dashboard",
        },
        {
          name: "Profile",
          icon: <User className="w-4 h-4" />,
          link: user?.role === "FREELANCER" ? "/freelancerProfile" : user?.role === "CLIENT" ? "/clientProfile" : "/dashboard",
        },
        { name: "Settings", icon: <Settings className="w-4 h-4" />, link: "/settings" },
      ],
    },
    {
      title: "Content",
      items: [
        { name: "Saved Items", icon: <Bookmark className="w-4 h-4" />, link: "/saved" },
        { name: "Favorites", icon: <Heart className="w-4 h-4" />, link: "/favorites" },
        { name: "Messages", icon: <MessageSquare className="w-4 h-4" />, link: "/messages" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Help Center", icon: <HelpCircle className="w-4 h-4" />, link: "/help" },
        { name: "Logout", icon: <LogOut className="w-4 h-4" />, action: handleLogout },
      ],
    },
  ];

  // Conditionally add "Gigs Dashboard" for freelancers
  const menuSections = user?.role === "FREELANCER"
    ? [
        {
          ...baseMenuSections[0], // Account section
          items: [
            ...baseMenuSections[0].items,
            {
              name: "Gigs Dashboard",
              icon: <Briefcase className="w-4 h-4" />,
              link: "/gigs-dashboard",
            },
          ],
        },
        ...baseMenuSections.slice(1), // Rest of the sections unchanged
      ]
    : baseMenuSections;

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user?.token ? (
        <>
          <div className="relative" ref={notificationsRef}>
            <button
              className="relative text-gray-700 hover:text-purple-600 transition-colors duration-300 p-2 rounded-full hover:bg-purple-50"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full transform transition-transform duration-300 hover:scale-110">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
            <div
              className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 z-50 overflow-hidden ${
                isNotificationsOpen
                  ? "opacity-100 translate-y-0 transform scale-100"
                  : "opacity-0 -translate-y-4 pointer-events-none transform scale-95"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  <span className="text-xs font-medium text-purple-600 hover:text-purple-800 cursor-pointer transition-colors">
                    Mark all as read
                  </span>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-purple-50 transition-colors duration-200 border-l-4 ${
                        notification.read ? "border-transparent" : "border-purple-500"
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1 bg-gray-100 rounded-full p-2">{notification.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <p>No notifications yet</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-gray-50 text-center">
                <Link
                  to="/all-notifications"
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    handleLinkClick && handleLinkClick("notifications");
                  }}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group" ref={profileDropdownRef}>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              aria-label="User menu"
            >
              {user.profilePicture ? (
                <div className="relative">
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-purple-500 transition-all duration-300"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  {user.role === "FREELANCER" && !user.isProfileComplete && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
              ) : (
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold border-2 border-transparent group-hover:border-purple-300 transition-all duration-300 shadow-md">
                  {user.firstname ? user.firstname.charAt(0).toUpperCase() : "U"}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  {user.role === "FREELANCER" && !user.isProfileComplete && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
              )}
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isProfileDropdownOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            <div
              className={`absolute right-0 mt-3 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 z-50 ${
                isProfileDropdownOpen
                  ? "opacity-100 translate-y-0 transform scale-100"
                  : "opacity-0 -translate-y-4 pointer-events-none transform scale-95"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                      {user.firstname ? user.firstname.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.firstname || "User"}</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {menuSections.map((section, sectionIndex) => (
                  <div key={section.title} className={sectionIndex > 0 ? "border-t border-gray-100 pt-2 mt-2" : ""}>
                    <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </p>
                    {section.items.map((item) =>
                      item.action ? (
                        <button
                          key={item.name}
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            item.action();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                        >
                          <span className="mr-3 text-gray-500">{item.icon}</span>
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.link}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLinkClick && handleLinkClick(item.link.replace("/", ""));
                          }}
                        >
                          <span className="mr-3 text-gray-500">{item.icon}</span>
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="relative overflow-hidden group px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </span>
            <span className="absolute inset-0 bg-purple-100 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/join"
            className="relative overflow-hidden group px-4 py-2 rounded-md text-sm font-medium text-white transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Sign Up</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarAuth;