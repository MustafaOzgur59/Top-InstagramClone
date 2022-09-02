import "./wdyrender";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import ReactDOM from "react-dom/client";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";

import App from "./App";
import "./styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);
