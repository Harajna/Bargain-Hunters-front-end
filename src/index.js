import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createRoot } from "react-dom/client";


const root = createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  // </React.StrictMode>,
);
