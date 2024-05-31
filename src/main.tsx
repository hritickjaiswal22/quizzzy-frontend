import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/features/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
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
