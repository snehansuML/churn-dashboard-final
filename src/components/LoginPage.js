import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === "admin" && password === "admin@123") {
      onLogin();
    } else {
      setError("❌ Invalid credentials. Try admin / admin@123");
    }
  };

  return (
    <div style={{
      fontFamily: "sans-serif",
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(to right, #0f62fe, #5c6ac4)",
        padding: "2rem",
        color: "#fff",
        textAlign: "center"
      }}>
        <h2 style={{ margin: 0 }}>Simple MVP App</h2>
      </div>

      {/* Login Form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5"
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "350px"
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontWeight: "bold" }}>Username</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="username"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "0.25rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontWeight: "bold" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#1976d2"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#0f62fe",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              marginBottom: "1rem"
            }}
          >
            Login
          </button>

          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            marginTop: "1rem"
          }}>
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>Create an account</a>
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
