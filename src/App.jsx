import React, { useState, useEffect } from "react";
import "./App.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");

  return (
    <div className="glass-card">
      <h2>Вход</h2>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(username, password); }}>
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
        <button type="submit">Продолжить</button>
      </form>
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  return (
    <div className="glass-card" style={{ width: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h3 style={{ margin: 0 }}>Панель управления</h3>
        <button className="secondary" onClick={onLogout}>Выйти</button>
      </div>
      
      <div style={{ textAlign: "left", background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "20px" }}>
        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Статус: Авторизован</p>
        <h1 style={{ margin: "5px 0", fontSize: "24px" }}>Добро пожаловать, Admin</h1>
      </div>

      <input placeholder="Найти пользователя..." style={{ marginTop: "20px" }} />
    </div>
  );
};

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (u, p) => {
    if (u === "admin" && p === "123") {
      const fakeToken = "token_id_999";
      localStorage.setItem("token", fakeToken);
      setToken(fakeToken);
    } else {
      alert("Неверные данные!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="container">
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}