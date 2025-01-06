import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./layout/ThemeProvider";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster richColors />
    </AuthProvider>
  </ThemeProvider>
);
