import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// AI chat assistant (sidick-chatbot project). Loaded only when VITE_CHAT_API_URL is set:
// .env.local points at the local server; on Vercel, set it once the chatbot server is deployed.
const chatApi = import.meta.env.VITE_CHAT_API_URL;
if (chatApi) {
  const widget = document.createElement("script");
  widget.src = "/sidick-widget.js";
  widget.defer = true;
  widget.dataset.api = chatApi;
  widget.dataset.color = "var(--accent)";
  widget.dataset.theme = "page"; // follow the portfolio's own light/dark toggle
  document.body.appendChild(widget); // bottom-right (the theme toggle is in the Navbar)
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);