import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./components/store/index.ts";
// Supports weights 200-900
import "@fontsource-variable/nunito";
// Supports weights 100-900
import "@fontsource-variable/inter";
import "@fontsource-variable/open-sans";
import "@fontsource/roboto";
import "@fontsource/lato";
import "@fontsource/poppins";
import { ContextProvider } from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);
