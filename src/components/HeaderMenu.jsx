import React from "react";
import { FaSun, FaMoon, FaBook, FaChartBar } from "react-icons/fa";
import logo from "../assets/logo.png";

const HeaderMenu = ({ toggleTheme, theme, onStatsClick, onRulesClick }) => {
  return (
    <header className="header-menu">
      <div className="logo">
        <img src={logo} alt="5 Букв" />
        <span>5 Букв</span>
      </div>
      <nav className="menu">
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Темная тема" : "Светлая тема"}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={onRulesClick} title="Правила">
          <FaBook />
        </button>
        <button onClick={onStatsClick} title="Статистика">
          <FaChartBar />
        </button>
      </nav>
    </header>
  );
};

export default HeaderMenu;
