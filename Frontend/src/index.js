import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./state/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* AuthContextProviderで定義したvalueが囲ったchildrenで使える。今回は<App />がchildrenに該当 */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
