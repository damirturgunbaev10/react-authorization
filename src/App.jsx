import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");

  return (
    <div className="glass-card">
      <h2>Вход</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(username, password);
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логин"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="glass-card" style={{ width: "450px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Панель управления</h3>
        <button className="secondary" onClick={onLogout}>
          Выйти
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          background: "rgba(255,255,255,0.2)",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Имя:</strong> {user.name.firstname} {user.name.lastname}
        </p>
        <p>
          <strong>Город:</strong> {user.address.city}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loginRes = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginRes.ok) {
        throw new Error("Ошибка авторизации");
      }

      const loginData = await loginRes.json();

      const usersRes = await fetch("https://fakestoreapi.com/users");
      const users = await usersRes.json();

      const foundUser = users.find((u) => u.username === username);

      if (!foundUser) {
        throw new Error("Пользователь не найден");
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(foundUser));

      setToken(loginData.token);
      setUser(foundUser);

      toast.success("Успешный вход!");
    } catch (error) {
      toast.error("Неверные данные или ошибка сервера");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.info("Вы вышли");
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
