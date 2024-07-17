import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import Routes from "./routes/Routes";
import { TokenProvider } from "./utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <TokenProvider>
        <Routes />
      </TokenProvider>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
