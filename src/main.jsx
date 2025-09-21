import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// استيراد CSS بشكل مباشر
import './styles/tailwind.css';
import './styles/unified-design.css';
import './index.css';
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
    <App />
  </React.StrictMode>);