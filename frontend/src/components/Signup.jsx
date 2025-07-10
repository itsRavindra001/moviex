import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box" style={styles.signupBox}>
        <form onSubmit={handleSubmit(onSubmit)} method="dialog" style={styles.form}>
          <Link to="/" style={styles.closeBtn}>
            ✕
          </Link>
          <h3 style={styles.heading}>Signup</h3>
          <div style={styles.inputGroup}>
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your fullname"
              style={styles.inputField}
              {...register("fullname", { required: true })}
            />
            <br />
            {errors.fullname && (
              <span style={styles.errorMessage}>
                This field is required
              </span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.inputField}
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && (
              <span style={styles.errorMessage}>
                This field is required
              </span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              style={styles.inputField}
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && (
              <span style={styles.errorMessage}>
                This field is required
              </span>
            )}
          </div>
          <div style={styles.buttonGroup}>
            <button style={styles.signupButton}>Signup</button>
            <p className="text-xl">
              Have an account?{" "}
              <button
                style={styles.loginButton}
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>{" "}
              <Login />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  signupBox: {
    width: "500px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  form: {
    width: "100%",
    margin: "10 auto",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    color: "#999",
    textDecoration: "none",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  inputGroup: {
    marginTop: "10px",
  },
  inputField: {
    width: "100%",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  errorMessage: {
    fontSize: "14px",
    color: "red",
  },
  buttonGroup: {
    marginTop: "20px",
  },
  signupButton: {
    backgroundColor: "pink",
    color: "white",
    borderRadius: "5px",
    padding: "5px 15px",
    cursor: "pointer",
  },
  loginButton: {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer",
  },
};

export default Signup;
