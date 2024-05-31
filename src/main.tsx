import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";
import grapgqlClient from "./grapgqlClient.ts";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/features/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={grapgqlClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </ApolloProvider>
  </BrowserRouter>
);
