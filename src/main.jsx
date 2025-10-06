import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import AOS from 'aos';

import "react-toastify/dist/ReactToastify.css";
import 'aos/dist/aos.css';
import "./index.css";
import "./styles/animations.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 100,
});

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </StrictMode>
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
