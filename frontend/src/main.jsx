import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";
import store from "./redux/store";
import ScrollToTop from "./utils/scrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
          theme="system"
        />
        <ScrollToTop />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
