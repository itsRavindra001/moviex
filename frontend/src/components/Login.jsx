import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post("http://localhost:4001/user/login", userInfo);
      const responseData = response.data;
      if (responseData) {
        toast.success("Logged in Successfully");
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(responseData.user));
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        console.error(error);
        toast.error("Error: " + error.response.data.message);
        setTimeout(() => {}, 2000);
      }
    }
  };

  return (
    <div className="login">
      <dialog id="my_modal_3" className="modal">
        <div style={styles.modalBox}>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" style={styles.form}>
            <Link to="/" style={styles.closeBtn} onClick={() => document.getElementById("my_modal_3").close()}>
              ✕
            </Link>
            <h3 style={styles.heading}>Login</h3>
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
              <button style={styles.loginButton}>Login</button>
              <p>
                Not registered?{" "}
                <Link to="/signup" style={styles.signupLink}>
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

const styles = {
  modalBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
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
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    width: "300px",
    margin: "0 auto",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  errorMessage: {
    color: "#f00",
    fontSize: "14px",
  },
  buttonGroup: {
    marginTop: "20px",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  signupLink: {
    textDecoration: "underline",
    color: "#007bff",
    cursor: "pointer",
  },
};

export default Login;
 