import { persistor } from "@/lib/store/index.ts";
import StoreProvider from "@/lib/store/Provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./styles/globals.css";
import { Toaster } from "@/components/ui/shadcn/sonner";
import { ThemeProvider } from "@/components/utils/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <NuqsAdapter>
            <ThemeProvider>
              <Toaster />
              <App />
            </ThemeProvider>
          </NuqsAdapter>
        </PersistGate>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
