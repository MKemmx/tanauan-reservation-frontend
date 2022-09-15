import create from "zustand";
import { devtools, persist } from "zustand/middleware";

// Sweet Alert
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// API AND AXIOS
import api from "../utils/api";
import axios from "axios";

const loginStore = (set, get) => ({
  resetPasswordRequest: false,
  loginAs: "",
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  loginAdmin: async (value) => {
    const oldState = get();
    try {
      set({
        ...oldState,
        loading: true,
      });
      const { data } = await axios.post(`${api}/auth/login-admin`, value);
      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loginAs: data.role,
        loading: false,
      });
      return true;
    } catch (error) {
      Swal.fire("Login Failed", `${error.response.data.msg}`, "error");
      set({
        ...oldState,
        loading: false,
      });
      return false;
    }
  },
  loginUser: async (value) => {
    const oldState = get();
    try {
      set({
        ...oldState,
        loading: true,
      });
      const { data } = await axios.post(`${api}/auth/login-user`, value);
      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loginAs: data.role,
        loading: false,
      });
      return true;
    } catch (error) {
      Swal.fire("Login Failed", `${error.response.data.msg}`, "error");
      set({
        ...oldState,
        loading: false,
      });
      return false;
    }
  },
  registerUser: async (value) => {
    const oldState = get();
    const formData = new FormData();
    formData.append("profile", value.profile);
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("email", value.email);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("gender", value.gender);
    formData.append("barangay", value.barangay);
    formData.append("password", value.password);
    formData.append("frontID", value.frontID);
    formData.append("backID", value.backID);
    try {
      set({
        ...oldState,
        loading: true,
      });
      await axios.post(`${api}/user`, formData);
      Swal.fire(
        "Success",
        "Please verify your email, we have sent a verification link to your email.",
        "success"
      );
      set({
        ...oldState,
        loading: false,
      });
      return true;
    } catch (error) {
      Swal.fire("Register failed", `${error.response.data.msg}`, "error");
      set({
        ...oldState,
        loading: false,
      });
      return false;
    }
  },
  logout: () => {
    set({
      loginAs: null,
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  },
  resetPasswordUser: async (value) => {
    let oldState = get();

    try {
      set({
        ...oldState,
        loading: true,
      });

      await axios.post(`${api}/user/reset-password`, value);

      set({
        loading: false,
        resetPasswordRequest: true,
      });

      return Swal.fire(
        "Success",
        `We have sent you a reset password link!`,
        "success"
      );
    } catch (error) {
      set({
        ...oldState,
        resetPasswordRequest: false,
        loading: false,
      });
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  },
  newPasswordUser: async (value) => {
    let oldState = get();

    try {
      set({
        ...oldState,
        loading: true,
      });

      await axios.post(`${api}/user/new-password`, value);
      toast.success("Password has been changed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      set({
        ...oldState,
        resetPasswordRequest: false,
        loading: false,
      });
    } catch (error) {
      set({
        ...oldState,
        loading: false,
      });
      Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  },
  changePasswordUser: async (value) => {
    let oldState = get();

    const token = get().token;
    const config = {
      headers: {
        contentType: "application/json",
        "auth-token": token,
      },
    };

    try {
      set({
        ...oldState,
        loading: true,
      });

      await axios.post(
        `${api}/change-password/user`,
        {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        },
        config
      );
      Swal.fire(
        "Password changed",
        `Password has successfully been updated`,
        "success"
      );

      set({
        ...oldState,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        ...oldState,
        loading: false,
      });
      Swal.fire("Error", `${error.response.data.msg}`, "error");
      return false;
    }
  },
  changePasswordAdmin: async (value) => {
    const token = get().token;
    const config = {
      headers: {
        contentType: "application/json",
        "auth-token": token,
      },
    };

    try {
      await axios.post(`${api}/change-password/admin`, value, config);
      Swal.fire("Success", `Password has successfully been updated`, "success");
      return true;
    } catch (error) {
      Swal.fire("Error", `${error.response.data.msg}`, "error");
      return false;
    }
  },
});

const useLoginState = create(
  persist(
    devtools(loginStore, {
      name: "loginState",
    })
  )
);

export default useLoginState;
