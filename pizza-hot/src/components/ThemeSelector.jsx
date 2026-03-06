import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const themes = ["primary", "secondary", "success", "danger", "warning", "info"];

export default function ThemeSelector() {
  const { theme, mode, setTheme, setMode } = useContext(ThemeContext);

  return (
    <div className="container d-flex justify-content-end align-items-center my-2">
      <div className="btn-group">
        {themes.map((t) => (
          <button
            key={t}
            className={`btn btn-${t} ${
              theme === t ? "active" : ""
            } rounded-5 me-2`}
            onClick={() => setTheme(t)}
          ></button>
        ))}
      </div>
      <div className="mode-toggle p-1">
        <i
          className={`bi bi-${mode === "light" ? "moon" : "sun"} text-${
            mode === "light" ? "dark" : "light"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        />
      </div>
    </div>
  );
}
