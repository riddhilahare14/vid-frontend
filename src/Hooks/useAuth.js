// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice"; // Adjust path
import axiosInstance from "../utils/axios";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || {});

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (token && !user.token) { // Only restore if no user is already in state
        try {
          const response = await axiosInstance.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = { ...response.data.data, token, profilePicture: null };
          console.log("Restored user from token:", userData);
          dispatch(setUser(userData));
        } catch (err) {
          console.error("Failed to restore user:", err);
          localStorage.removeItem("token"); // Clear invalid token
        }
      }
    };

    restoreUser();
  }, [dispatch, user.token]);

  return user;
};

export default useAuth;